import React from "react";
import ReactDOM from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "./hero";
import Filmstrip from "./filmstrip";
import Gallery from "./gallery";
import Timeline from "./timeline";
import Moments from "./moments";
import Ending from "./ending";
import Footer from "./footer";
import Particles from "./particles";
import "./index.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Particles />
    <Hero />
    <Filmstrip />
    <Gallery />
    <Timeline />
    <Moments />
    <Ending />
    <Footer />
  </React.StrictMode>
);
