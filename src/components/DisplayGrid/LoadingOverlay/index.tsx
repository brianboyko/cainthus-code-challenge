import * as React from "react";
import spinnerSrc from "../../../static/img/Spinner-1s-200px.svg";
import "./loading-overlay.sass";

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <img src={spinnerSrc} className="loading-overlay__logo" />
    <div className="loading-overlay__text">Loading</div>
  </div>
);

export default LoadingOverlay;
