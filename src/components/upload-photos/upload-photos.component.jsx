import React, { useState, useEffect } from "react";
import "./upload-photos.styles.scss";
import UploadImageJPG from "../../assets/images/download.png";
import { faUserMd, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";

const marginAuto = {
  margin: "auto",
};

const positionCamera = {
  position: "relative",
  left: "-0.4em",
};

const UploadPhotos = (props) => {
  const [imageData, setImageData] = useState(null);
  const [resultData, setResultData] = useState(null);

  const handleInputChange = (event) => {
    setImageData(event.target.files[0]);
  };

  const config = {
    headers: { "Access-Control-Allow-Origin": "*", crossDomain: true },
  };

  useEffect(() => {
    if (imageData !== null) {
      const data = new FormData();
      data.append("image", imageData);
      props.handleChange();

      axios
        .post("http://127.0.0.1:5000/image-retrieval", data, config)
        .then((res) => {
          setResultData(res);
        })
        .catch((err) => console.log(err));
    }
  }, [imageData]);

  useEffect(() => {
    if (resultData !== null) {
      props.handleChange();
    }
  }, [resultData]);

  console.log(resultData);

  return (
    <div
      className="container modify-padding"
      data-aos="flip-left"
      data-aos-easing="linear"
      data-aos-duration="1000"
    >
      <h1 className="text-center text-white mb-5">IMAGE RETRIEVAL</h1>
      {resultData !== null ? (
        <div className="container text-center">
          <h1 className="text-center text-white mb-5">Image Query</h1>
          <img
            className="mb-5"
            style={{ width: "200px" }}
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
            src={"data:image/jpg;base64," + resultData.data.query_image}
          />
          {/* <h1 className="text-center text-white mb-5">Image Processing</h1>
          <img
            className="mb-5"
            style={{ width: "200px" }}
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
            src={"data:image/jpg;base64," + resultData.data.clahe_image}
          /> */}
          <h1 className="text-center text-white mb-5">Image Result</h1>
          <div className="row justify-content-center">
            {resultData.data.image.map((data, index) => (
              <div>
                <h6 className="text-center text-white mb-2 mr-5">
                  {resultData.data.label[index]}
                </h6>
                <h6 className="text-center text-white mr-5">
                  {ReactHtmlParser(resultData.data.distances_result[index])}
                </h6>
                <img
                  className="mr-5 mb-5"
                  style={{ width: "200px" }}
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration="1000"
                  src={"data:image/jpg;base64," + data}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-white">
          <p>Upload Your Breast Histology Image Here!</p>
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
                name="upload_image"
                onChange={handleInputChange}
              />
              Choose Photo
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPhotos;
