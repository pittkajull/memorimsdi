import React from "react";
import ReactDOM from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./hero";
import Filmstrip from "./filmstrip";
import Filmstrip2 from "./filmstrip2";
import Ending from "./ending";
import "./index.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Hero />
    <Filmstrip />
    <Filmstrip2 />
    <Ending />
  </React.StrictMode>
);
