import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WebCam = () => {
  const navigate = useNavigate();
  const [webCamEnable, setWebCamEnable] = useState(true);
  const [question, setQuestion] = useState("Your ques will be displayed here");

  const webcamRef = useRef<Webcam | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [video, setVideo] = useState<Blob | null>(null);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }, [audioUrl]);

  const fetchQues = () => {
    fetch("src/temp.json")
      .then((response) => response.json())
      .then((data) => {
        const randomQues = data[Math.floor(Math.random() * data.length)];
        setQuestion(randomQues.modelanswers);
        setAudioUrl(randomQues.audioUrl);
      })
      .catch((err) => console.error("Error", err));
  };

  const startRec = () => {
    setRecording(true);
    setVideo(null);
    const stream = webcamRef.current?.video?.srcObject as MediaStream;
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    let chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setVideo(blob);
      uploadVideo();
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
  };

  const stopRec = () => {
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  const uploadVideo = async () => {
    try {
      const response = await fetch("/test", {
        method: "POST",
      });

      if (response) {
        console.log("Video uploaded");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="my-10 flex justify-center gap-60 mt-40 items-center">
      <div className="grid w-124 h-84 flex flex-col border">
        <div className="w-full h-14 bg-zinc-100 p-3">Ques: {question}</div>
      </div>
      <div>
        {webCamEnable ? (
          <div className="flex flex-col">
            <Webcam
              ref={webcamRef}
              style={{
                height: 300,
                width: 300,
              }}
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
            />
            <div>
              {!recording ? (
                <Button
                  className="bg-zinc-400 mt-4 w-64"
                  onClick={() => {
                    startRec();
                    fetchQues();
                  }}
                >
                  Start Recording
                </Button>
              ) : (
                <Button
                  className="bg-zinc-400 mt-4 w-64"
                  onClick={() => {
                    setWebCamEnable(false);
                    stopRec();
                    navigate("/");
                  }}
                >
                  Stop Webcam
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <WebcamIcon className="h-72 w-64 p-20 bg-blue-100 rounded-lg" />
            <Button
              className="bg-zinc-400 mt-4"
              onClick={() => {
                setWebCamEnable(true);
              }}
            >
              Start
            </Button>
          </div>
        )}
        {/* {video && (
          <video controls className="mt-4 w-80">
            <source src={URL.createObjectURL(video)} type="video/webm" />
          </video>
        )} */}
      </div>
    </div>
  );
};

export default WebCam;
