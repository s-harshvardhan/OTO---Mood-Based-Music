import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button, BreadcrumbsBar, BreadcrumbItem } from "monday-ui-react-core";
import { analyzeFace } from "../../services/Api.js";
import { motion } from "framer-motion";
import { Form, Quote, Emoji, Placeholder, Workspace } from "monday-ui-react-core/icons";
import { useNavigate } from "react-router-dom";

const Express = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    analyzeFace(imageSrc, navigate);
    // Send imageSrc to your backend service for processing
    // Update songDescription state with the response from your backend service
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <BreadcrumbsBar
        type={BreadcrumbsBar.types.NAVIGATION}
        style={{ position: "absolute", top: 0, left: 0 }}
        items={[
          {
            icon: Workspace,
            text: "Homepage",
          },
          {
            icon: Emoji,
            text: "Express",
          },
        ]}
      >
        <BreadcrumbItem icon={Workspace} text="Homepage" onClick={() => navigate("/")} />
        <BreadcrumbItem icon={Emoji} text="Express" />
      </BreadcrumbsBar>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
          border: "2px solid #000", // 2px wide solid black border
          borderRadius: "10px", // 10px border radius
        }}
      />{" "}
      <div>
        <Button onClick={capture} style={{ margin: "10px", width: "120px", height: "60px", backgroundColor: "orange" }}>
          Capture
        </Button>
      </div>
    </motion.div>
  );
};

export default Express;
