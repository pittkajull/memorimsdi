import React from "react";
import ReactDOM from "react-dom/client";
import Hero from "./hero";
import Timeline from "./timeline";
import Moments from "./moments";
import Footer from "./footer";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Hero />
    <Timeline />
    <Moments />
    <Footer />
  </React.StrictMode>
);
