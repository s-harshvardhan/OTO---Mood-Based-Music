import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BreadcrumbsBar, BreadcrumbItem, Button } from "monday-ui-react-core";
import { Workspace, Placeholder } from "monday-ui-react-core/icons";
import { useLocation } from "react-router-dom";

const Song = () => {
  const navigate = useNavigate();

  const location = useLocation();
  let description = location.state.description;
  description = description.replace(/(Title|Tempo|Genre|Melody):/g, "\n$&");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <BreadcrumbsBar type={BreadcrumbsBar.types.NAVIGATION} style={{ position: "absolute", top: 0, left: 0 }}>
        <BreadcrumbItem icon={Workspace} text="Composure" Composure />
      </BreadcrumbsBar>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Mood generative AI - composing song for you</h1>
        <div style={{ display: "flex", justifyContent: "space-between", width: "70%" }}>
          <div style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
            <h2>Song Description</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{description}</p>{" "}
            {/* <p style={{ whiteSpace: "pre-wrap" }}>
              {Array.isArray(description.response)
                ? description.response.map((item, index) => (
                    <React.Fragment key={index}>
                      {JSON.stringify(item)}
                      <br />
                    </React.Fragment>
                  ))
                : JSON.stringify(description.response)}
            </p> */}
          </div>
        </div>
        <Button onClick={() => navigate("/")} style={{ margin: "10px", width: "200px", height: "80px", color: "black", backgroundColor: "pink" }}>
          Start Over
        </Button>
      </div>
    </motion.div>
  );
};

export default Song;
