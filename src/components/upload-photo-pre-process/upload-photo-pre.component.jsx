import React from "react";
import { faUserMd, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const marginAuto = {
  margin: "auto",
};

const positionCamera = {
  position: "relative",
  left: "-0.4em",
};

const UploadPhotoSection = (props) => {
  return (
    <>
      {" "}
      <p>Upload Your Image Here!</p>
      <div className="icon-upload d-flex text-white">
        <FontAwesomeIcon icon={faUserMd} />
        <label
          className="btn btn-link purple-color-change text-white width-change-button"
          style={marginAuto}
        >
          <FontAwesomeIcon icon={faCamera} style={positionCamera} />
          <input
            type="file"
            class="display-gone"
            name="preprocessing_image"
            onChange={props.handleInputChange}
          />
          Choose Photo
        </label>
      </div>{" "}
    </>
  );
};

export default UploadPhotoSection;
