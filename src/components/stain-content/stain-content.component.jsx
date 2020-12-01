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
const StainContent = (props) => {
  return (
    <div
      className="container"
      data-aos="flip-left"
      data-aos-easing="linear"
      data-aos-duration="1000"
    >
      <div className="row justify-content-center">
        <div className="text-center text-white mr-5">
          <p>Upload Your Source Photos Here!</p>

          {props.previewImage.reference_image !== null ? (
            <div className="icon-upload d-flex">
              {" "}
              <img src={props.previewImage.reference_image} />{" "}
            </div>
          ) : (
            <div className="icon-upload d-flex">
              <FontAwesomeIcon icon={faUserMd} />
              <label
                className="btn btn-link purple-color-change text-white width-change-button"
                style={marginAuto}
              >
                <FontAwesomeIcon icon={faCamera} style={positionCamera} />
                <input
                  type="file"
                  class="display-gone"
                  name="reference_image"
                  onChange={props.handlePreviewImage}
                />
                Choose Photo
              </label>
            </div>
          )}
        </div>
        {/* <img src={"data:image/jpg;base64," + resultRegistrationData.data.image[0]} /> */}
        <div className="text-center text-white ml-5">
          <p>Upload Your Target Photos Here!</p>

          {props.previewImage.target_image !== null ? (
            <div className="icon-upload d-flex">
              {" "}
              <img src={props.previewImage.target_image} />{" "}
            </div>
          ) : (
            <div className="icon-upload d-flex">
              <FontAwesomeIcon icon={faUserMd} />
              <label
                className="btn btn-link purple-color-change text-white width-change-button"
                style={marginAuto}
              >
                <FontAwesomeIcon icon={faCamera} style={positionCamera} />
                <input
                  type="file"
                  class="display-gone"
                  name="target_image"
                  onChange={props.handlePreviewImage}
                />
                Choose Photo
              </label>
            </div>
          )}
        </div>
      </div>
      {props.previewImage.reference_image !== null &&
      props.previewImage.target_image !== null &&
      props.resultData === null ? (
        <div className="container text-center pt-5">
          <button
            type="button"
            class="btn btn-link purple-color-change text-white width-20em"
            onClick={props.submitStain}
          >
            START STAIN NORMALIZATION
          </button>{" "}
        </div>
      ) : null}
      {props.resultData !== null ? (
        <div className="icon-upload d-flex">
          <img
            src={"data:image/jpg;base64," + props.resultData.data.result_image}
          />{" "}
        </div>
      ) : null}
    </div>
  );
};
export default StainContent;
