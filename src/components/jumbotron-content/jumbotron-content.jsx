import React from "react";
import "./jumbotron.styles.scss";

const JumbotronContent = () => (
  <div className="jumbotron background-transparent text-white">
    <h1 className="display-4 text-center">Medical Image Analysis</h1>
    <hr className="my-4" />
    <p className="lead text-center pt-5">
      <button
        type="button"
        class="btn btn-link purple-color-change text-white width-change-button"
      >
        Get Started
      </button>
    </p>
  </div>
);

export default JumbotronContent;
