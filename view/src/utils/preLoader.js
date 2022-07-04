import React from "react";
import "./css/preloader.css";
export default function PreLoader() {
  return (
    <div id="loader-wrapper">
      <div id="loader"></div>

      <div className="loader-section section-left"></div>
      <div className="loader-section section-right"></div>
    </div>
  );
}
