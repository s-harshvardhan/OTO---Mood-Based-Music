import React from "react";
import { Button, BreadcrumbItem, BreadcrumbsBar } from "monday-ui-react-core";
import { useNavigate } from "react-router-dom";
import { Form, Quote, Emoji, Placeholder, Workspace } from "monday-ui-react-core/icons";
import { motion } from "framer-motion";
import { CSSTransition } from "react-transition-group";
import "./HomePage.css"; // make sure the path to your CSS file is correct

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <div>
          <BreadcrumbsBar
            style={{ position: "absolute", top: 0, left: 0 }}
            items={[
              {
                icon: Workspace,
                text: "Homepage",
              },
            ]}
          >
            <BreadcrumbItem icon={Workspace} text="Homepage" />
          </BreadcrumbsBar>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <h1 style={{ textAlign: "center", marginBottom: "100px" }}>This is Mood generative AI - choose how you want to create your song</h1>
            <div style={{ display: "flex", justifyContent: "space-between", width: "70%" }}>
              <Button rightIcon={Form} onClick={() => navigate("/chat")} style={{ margin: "10px", width: "200px", height: "80px", backgroundColor: "blue" }}>
                Chat
              </Button>
              <Button rightIcon={Quote} onClick={() => navigate("/talk")} style={{ margin: "10px", width: "200px", height: "80px", backgroundColor: "red" }}>
                Talk
              </Button>
              <Button
                rightIcon={Emoji}
                onClick={() => navigate("/express")}
                style={{ margin: "10px", width: "200px", height: "80px", backgroundColor: "orange" }}
              >
                Express
              </Button>
              <Button
                rightIcon={Placeholder}
                onClick={() => navigate("/color")}
                style={{ margin: "10px", width: "200px", height: "80px", backgroundColor: "green" }}
              >
                Colour
              </Button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </motion.div>
  );
};

export default HomePage;
