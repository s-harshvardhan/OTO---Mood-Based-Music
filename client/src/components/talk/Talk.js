import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { Button, BreadcrumbsBar, BreadcrumbItem } from "monday-ui-react-core";
import { Form, Quote, Emoji, Placeholder, Workspace } from "monday-ui-react-core/icons";
import { useNavigate } from "react-router-dom";
import { transcribeSpeech } from "../../services/Api.js";
import { motion } from "framer-motion";

const Talk = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const navigate = useNavigate();

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
    setBlobURL(recordedBlob.blobURL);
    const file = new File([recordedBlob.blob], "audio.webm", { type: "audio/webm" }); // Ensure the type matches your server's expectations
    transcribeSpeech(file, navigate);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <BreadcrumbsBar type={BreadcrumbsBar.types.NAVIGATION} style={{ position: "absolute", top: 0, left: 0 }}>
        <BreadcrumbItem icon={Workspace} text="Homepage" onClick={() => navigate("/")} />
        <BreadcrumbItem icon={Quote} text="Talk" />
      </BreadcrumbsBar>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <h1 style={{ textAlign: "center", marginBottom: "100px" }}> Music generative AI - share whats on Your mind</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            width: "500px", // Set the width of the parent container
            height: "100px", // Set the height of the parent container
          }}
        >
          <ReactMic
            record={isRecording}
            className="sound-wave"
            onStop={onStop}
            onData={onData}
            strokeColor="#000000"
            backgroundColor="#FF4081"
            borderRadius="10px"
            style={{ width: "500px !important", height: "200px !important" }} // Add !important to width and height
          />
        </div>
        <div>
          <Button onClick={startRecording} disabled={isRecording} style={{ margin: "20px", width: "200px", height: "80px", backgroundColor: "sky blue" }}>
            Start
          </Button>
          <Button
            onClick={stopRecording}
            disabled={!isRecording}
            style={{ margin: "10px", width: "200px", height: "80px", color: "white", backgroundColor: "red" }}
          >
            Stop
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Talk;
