import React from "react";
import Loader from "./Loader.svg";

export default () => (
  <div className="overlay d-flex align-items-center justify-content-center">
    <img src={Loader} alt="loading..." />
  </div>
);
