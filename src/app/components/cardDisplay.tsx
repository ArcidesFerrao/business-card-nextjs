import React from "react";
import "./display.css";

export default function CardDisplay() {
  return (
    <div className="data display">
      <div className="title">
        <span className="companyIcon"></span>
        <div className="subtitle">
          <h1>{}</h1>
          <h2>{}</h2>
        </div>
      </div>

      <div className="contact">
        <span className="solar--phone-broken"></span>
        {/* <h3 onClick={} >{}</h3> */}
      </div>

      <div className="emailTo">
        <span className="gridicons--mail"></span>
        <h3>
          <a href="mailto:{}">{}</a>
        </h3>
      </div>
    </div>
  );
}
