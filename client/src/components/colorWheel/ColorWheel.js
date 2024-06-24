// src/components/ColorWheel.js

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Form, Quote, Emoji, Placeholder, Workspace } from "monday-ui-react-core/icons";
import { useNavigate } from "react-router-dom";
import { BreadcrumbsBar, BreadcrumbItem } from "monday-ui-react-core";

const DetailsContainer = styled.div`
  margin-top: 20px;
`;

const colours = {
  Yellow: "Joy, Optimism, Warmth",
  Red: "Anger, Passion, Love",
  Orange: "Energy, Enthusiasm, Happiness",
  Green: "Calm, Balance, Peace",
  Purple: "Creativity, Mystery, Spirituality",
  Brown: "Energy, Enthusiasm, Happiness",
  Blue: "Sadness, Tranquility, Trust",
  Black: "Grief, Power, Elegance",
  White: "Purity, Innocence, Cleanliness",
};

const generateShades = (color) => {
  const shades = [];
  for (let i = 0; i < 5; i++) {
    shades.push(
      d3
        .rgb(color)
        .darker(i * 0.2)
        .toString()
    );
  }
  return shades;
};

const ColorWheel = () => {
  const wheelRef = useRef(null);
  const tooltipRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [shades, setShades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const colors = Object.keys(colours);
    const numColors = colors.length;

    const arc = d3.arc().innerRadius(50).outerRadius(200);

    const pie = d3.pie().value(1).sort(null);

    const svg = d3.select(wheelRef.current).attr("width", 800).attr("height", 600).append("g").attr("transform", "translate(400,300)"); // Increase the width, height and translate values

    const arcs = svg.selectAll(".arc").data(pie(colors)).enter().append("g").attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.toLowerCase())
      .on("mouseover", function (event, d) {
        const [x, y] = d3.pointer(event);
        d3.select(tooltipRef.current)
          .style("left", `${x + 150}px`)
          .style("top", `${y + 150}px`)
          .style("opacity", 1)
          .html(`${d.data}: ${colours[d.data]}`);
      })
      .on("mouseout", () => {
        d3.select(tooltipRef.current).style("opacity", 0);
      })
      .on("click", (event, d) => {
        setSelectedColor(d.data);
        setShades(generateShades(d.data));
        if (d.data.toLowerCase() === "blue") {
          navigate("/shades/blue");
        }
        if (d.data.toLowerCase() === "red") {
          navigate("/shades/red");
        }
        if (d.data.toLowerCase() === "yellow") {
          navigate("/shades/yellow");
        }
        if (d.data.toLowerCase() === "green") {
          navigate("/shades/green");
        }
        if (d.data.toLowerCase() === "orange") {
          navigate("/shades/orange");
        }
        if (d.data.toLowerCase() === "purple") {
          navigate("/shades/purple");
        }
        if (d.data.toLowerCase() === "brown") {
          navigate("/shades/brown");
        }
        if (d.data.toLowerCase() === "black") {
          navigate("/shades/black");
        }
        if (d.data.toLowerCase() === "white") {
          navigate("/shades/white");
        }
      });
  }, []);

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
        <BreadcrumbItem icon={Placeholder} text="Colour" />
      </BreadcrumbsBar>
      <h1 style={{ marginTop: "50px" }}>Color Wheel - pick Your base colour</h1>
      <svg ref={wheelRef}></svg>
      {selectedColor && (
        <DetailsContainer>
          <h2>{selectedColor}</h2>
          <p>{colours[selectedColor]}</p>
          <h3>Shades</h3>
          <ul>
            {shades.map((shade, index) => (
              <li key={index} style={{ backgroundColor: shade, padding: "10px", margin: "10px" }}>
                {shade}
              </li>
            ))}
          </ul>
        </DetailsContainer>
      )}
    </motion.div>
  );
};

export default ColorWheel;
