import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BreadcrumbsBar, BreadcrumbItem, Button } from "monday-ui-react-core";
import { Workspace, Placeholder } from "monday-ui-react-core/icons";
import ReactSlider from "react-slider";
import styled from "styled-components";
import { handleClick } from "../../../services/Api"; // replace './api' with the actual path to your api.js file

const Green = () => {
  const navigate = useNavigate();
  const [emotionPercentage, setEmotionPercentage] = useState(50);
  const PositiveEmotions = ["Abundance, renewal, growth, calmness, practicality, generosity, sympathy, and compassion"];
  const NegativeEmotions = ["Envy, jealousy, selfishness, greed, deviousness and lack of experience"];

  const emotionSentence = `This person feels like ${emotionPercentage}% of ${PositiveEmotions} and ${100 - emotionPercentage}% of ${NegativeEmotions}.`;

  const getColorShade = (percentage) => {
    const green = 350 - percentage * 2.55; // Convert percentage to a scale of 0-255 for green
    return `rgb(0, ${green}, 0)`; // Use the green value for the green channel, and 0 for red and blue
  };

  const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 100px;
    border: 1px solid;
    background-color: black;
    border-radius: 50px;
  `;

  const StyledThumb = styled.div`
    height: 100px;
    width: 100px;
    background-color: ${(props) => getColorShade(props.value)};
    border: 3px solid white; // Add a 2px wide white border

    border-radius: 50%;
    cursor: grab;
  `;

  const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${(props) => `linear-gradient(to right, red ${props.value}%, yellow 50%, green 100%)`};
    border-radius: 999px;
  `;

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
        ]}
      >
        <BreadcrumbItem icon={Workspace} text="Homepage" onClick={() => navigate("/")} />
        <BreadcrumbItem icon={Placeholder} text="Colour" onClick={() => navigate("/color")} />
      </BreadcrumbsBar>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Colour generative AI - click on right side or left side to change shade of Your colour</h1>
        <div style={{ display: "flex", justifyContent: "space-between", width: "70%" }}>
          <StyledSlider
            value={emotionPercentage}
            onChange={setEmotionPercentage}
            min={0}
            max={100}
            renderThumb={(props, state) => <StyledThumb {...props} value={state.valueNow} />}
            renderTrack={(props, state) => <StyledTrack {...props} value={state.valueNow} />}
          />
        </div>
        <Button onClick={() => handleClick(emotionSentence, navigate)} style={{ margin: "10px", width: "200px", height: "80px", backgroundColor: "green" }}>
          Generate Your Mood
        </Button>
      </div>
    </motion.div>
  );
};

export default Green;
