import React from "react";
import ReactDOM from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "./hero";
import Filmstrip from "./filmstrip";
import Gallery from "./gallery";
import Ending from "./ending";
import "./index.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Hero />
    <Filmstrip />
    <Gallery />
    <Ending />
  </React.StrictMode>
);
