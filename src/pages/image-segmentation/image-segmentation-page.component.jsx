import React, { useState } from "react";
import "./image-segmentation-page.styles.scss";
import ImageSegmentationContent from "../../components/image-segmentation/image-segmentation.component";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";

const ImageSegmentationPage = () => {
  const [show, setShow] = useState(true);
  const [valueBtn, setValueBtn] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleClose = () => {
    setShow(false);
  };
  const handleChoiceChange = (event) => {
    setValueBtn(event.target.value);
  };

  const handleImage = (event) => {
    setImageData(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };
  const config = {
    headers: { "Access-Control-Allow-Origin": "*", crossDomain: true },
  };

  useEffect(() => {
    if (imageData !== null) {
      const data = new FormData();
      data.append("image", imageData);
      if (valueBtn === "Watershed") {
        axios
          .post("http://127.0.0.1:5000/segmentation/watershed", data, config)
          .then((res) => {
            setResultData(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post("http://127.0.0.1:5000/segmentation/kmeans", data, config)
          .then((res) => {
            setResultData(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [imageData]);

  console.log(valueBtn);
  console.log(resultData);

  return (
    <div>
      <h1 className="text-center text-white mb-2 mt-2">Image Segmentation</h1>
      {resultData !== null ? (
        <>
          <h4 className="text-center text-white mb-2 mt-2">Uploaded Image</h4>
          <div className="icon-upload d-flex mb-5">
            <img
              style={{ width: "400px", height: "300px" }}
              src={previewImage}
            />{" "}
          </div>
        </>
      ) : (
        <ImageSegmentationContent handleImage={handleImage} />
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <label className="text-center">
              Select Image Segmentation Algorithm
            </label>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center d-flex justify-content-center">
            <div className="button-radio mr-5">
              <input
                type="radio"
                name="algorithm"
                value="Watershed"
                onChange={handleChoiceChange}
              />
              <label> Watershed</label>
            </div>
            <div className="button-radio">
              <input
                type="radio"
                name="algorithm"
                value="K-Means"
                onChange={handleChoiceChange}
              />
              <label> K-Means</label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {resultData !== null ? (
        <>
          <h4 className="text-center text-white mb-1 mt-2">
            Result Image Segmentation
          </h4>
          <div className="icon-upload d-flex mt-2 mb-5">
            <img
              style={{ width: "400px", height: "300px" }}
              src={"data:image/jpg;base64," + resultData.data.result_image}
            />{" "}
          </div>
        </>
      ) : null}
    </div>
  );
};
export default ImageSegmentationPage;
