import React, { useState, useEffect } from "react";
import "./image-registration-photos.styles.scss";
import { faUserMd, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const marginAuto = {
  margin: "auto",
};

const positionCamera = {
  position: "relative",
  left: "-0.4em",
};

const ImageRegistrationPhotos = (props) => {
  const [imageData, setImageData] = useState({
    reference_image: null,
    target_image: null,
  });
  const [resultRegistrationData, setResultRegistrationData] = useState(null);
  const [previewImage, setPreviewImage] = useState({
    reference_image: null,
    target_image: null,
  });

  const handlePreviewImage = (event) => {
    if (event.target.name === "reference_image") {
      setImageData({ ...imageData, reference_image: event.target.files[0] });
      setPreviewImage({
        ...previewImage,
        reference_image: URL.createObjectURL(event.target.files[0]),
      });
    } else if (event.target.name === "target_image") {
      setImageData({ ...imageData, target_image: event.target.files[0] });
      setPreviewImage({
        ...previewImage,
        target_image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const config = {
    headers: { "Access-Control-Allow-Origin": "*", crossDomain: true },
  };

  const handleImageRegistration = () => {
    const data = new FormData();
    data.append("image_reference", imageData.reference_image);
    data.append("image_target", imageData.target_image);

    props.handleChange();
    axios
      .post("http://127.0.0.1:5000/image-registration", data, config)
      .then((res) => {
        setResultRegistrationData(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (resultRegistrationData !== null) {
      props.handleChange();
    }
  }, [resultRegistrationData]);

  return (
    <div
      className="container modify-padding"
      data-aos="flip-left"
      data-aos-easing="linear"
      data-aos-duration="1000"
    >
      <h1 class="text-center text-white mb-5">IMAGE REGISTRATION</h1>
      <div className="row justify-content-center">
        <div className="text-center text-white mr-5">
          <p>Upload Your Reference Image Here!</p>

          {previewImage.reference_image !== null ? (
            <div className="icon-upload d-flex">
              {" "}
              <img src={previewImage.reference_image} />{" "}
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
                  onChange={handlePreviewImage}
                />
                Choose Photo
              </label>
            </div>
          )}
        </div>
        {/* <img src={"data:image/jpg;base64," + resultRegistrationData.data.image[0]} /> */}
        <div className="text-center text-white ml-5">
          <p>Upload Your Target Image Here!</p>

          {previewImage.target_image !== null ? (
            <div className="icon-upload d-flex">
              {" "}
              <img src={previewImage.target_image} />{" "}
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
                  onChange={handlePreviewImage}
                />
                Choose Photo
              </label>
            </div>
          )}
        </div>
      </div>
      {previewImage.reference_image !== null &&
      previewImage.target_image !== null &&
      resultRegistrationData === null ? (
        <div className="container text-center pt-5">
          <button
            type="button"
            class="btn btn-link purple-color-change text-white width-20em"
            onClick={handleImageRegistration}
          >
            START IMAGE REGISTRATION
          </button>{" "}
        </div>
      ) : null}
      {resultRegistrationData !== null ? (
        <div>
          <div className="text-center text-white mt-5">
            <p>Image Result</p>
          </div>
          {/* <h6 className="text-white text-center">
            RMSE :{resultRegistrationData.data.calculate.rmse}
          </h6> */}
          <h6 className="text-white text-center">
            TX : {resultRegistrationData.data.calculate.tx}
          </h6>
          <h6 className="text-white text-center">
            TY : {resultRegistrationData.data.calculate.ty}
          </h6>
          <h6 className="text-white text-center">
            Theta : {resultRegistrationData.data.calculate.theta}
          </h6>{" "}
          <div className="icon-upload d-flex">
            <img
              src={
                "data:image/jpg;base64," +
                resultRegistrationData.data.result_image
              }
            />{" "}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageRegistrationPhotos;
