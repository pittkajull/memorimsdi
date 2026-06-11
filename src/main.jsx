import React from "react";
import ReactDOM from "react-dom/client";
import Hero from "./hero";
import Filmstrip from "./filmstrip";
import Filmstrip2 from "./filmstrip2";
import Footer from "./footer";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Hero />
    <Filmstrip />
    <Filmstrip2 />
    <Footer />
  </React.StrictMode>
);
