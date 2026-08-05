import React from "react";
import ReactDOM from "react-dom/client";
import AdminPage from "./adminpage";
import "./index.css";

// Halaman terpisah dari situs utama — ga ngeload GSAP, galeri, musik, dll.
// Dibangun jadi file sendiri lewat rollupOptions.input di vite.config.js.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminPage />
  </React.StrictMode>
);
