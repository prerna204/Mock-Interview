import React, { useState } from "react";
import Webcam from "react-webcam";
import { WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const WebCam = () => {
  const navigate = useNavigate();
  const [webCamEnable, setWebCamEnable] = useState(false);
  const[question,setQuestion]=useState("Your ques will be displayed here");

  const fetchQues = () =>{
    fetch("src/question.json")
    .then(response=>response.json())
    .then(data=>{
      const randomQues = data[Math.floor(Math.random()* data.length)];
      setQuestion(randomQues.question);
    })
    .catch(err => console.error("Error fetching question:", err));
  }

  return (
    <div className="my-10 flex justify-center gap-60 mt-40 items-center">
      <div className="grid w-124 h-84 flex flex-col border ">
        <div className="w-full h-14 bg-zinc-100 p-3">
          Ques : {question}
        </div>
        
      </div>
      <div>
        {webCamEnable ? (
          <>
          <div className="flex flex-col">
            <Webcam
              style={{
                height: 300,
                width: 300,
              }}
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
            />
            <div>
            </div>
              <Button
                className="bg-red-400"
                onClick={() => {
                  setWebCamEnable(false);
                  navigate("/");
                }}
              >
                Stop
              </Button>
            </div>
          </>
        ) : (
          <>
          <div className="flex flex-col">
            <WebcamIcon className="h-72 w-64 p-20 bg-blue-100 rounded-lg  ">
            </WebcamIcon>
            <Button
              className="bg-zinc-400 mt-4"
              onClick={() => {
                setWebCamEnable(true);
                fetchQues();
              }}
            >
              Start
            </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WebCam;
