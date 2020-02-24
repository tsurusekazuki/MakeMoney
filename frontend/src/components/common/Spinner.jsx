import React from "react";
import "./Spinner.css";
import Loader from "react-loader-spinner";

const Spinner = () => (
  <div className="spinner-css">
    <div className="spinner-css2">
      <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
    </div>
  </div>
);

export default Spinner;
