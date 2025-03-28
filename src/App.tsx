import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WebCam from "./pages/Webcam";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/webcam" element={<WebCam />} />
      </Routes>
    </Router>
  );
}

export default App;
