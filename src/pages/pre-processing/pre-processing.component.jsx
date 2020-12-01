import React, { useState, useEffect } from "react";
import { faUserMd, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import "./pre-processing.styles.scss";
import axios from "axios";
import ClaheContent from "../../components/clahe-content/clahe-component";
import StainContent from "../../components/stain-content/stain-content.component";
const marginAuto = {
  margin: "auto",
};

const positionCamera = {
  position: "relative",
  left: "-0.4em",
};

const PreProcessingPage = () => {
  const [imageData, setImageData] = useState(null);
  const [valueBtn, setValueBtn] = useState(null);
  const [resultData, setResultData] = useState(null);
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

  const submitStain = () => {
    const data = new FormData();
    data.append("reference_image", imageData.reference_image);
    data.append("target_image", imageData.target_image);
    data.append("valueBtn", valueBtn);
    axios
      .post("http://127.0.0.1:5000/image-processing", data, config)
      .then((res) => {
        setResultData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [show, setShow] = useState(true);

  const config = {
    headers: { "Access-Control-Allow-Origin": "*", crossDomain: true },
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    if (valueBtn == "CLAHE") {
      setImageData(event.target.files[0]);
    }
    handleShow();
  };

  const handleChoiceChange = (event) => {
    setValueBtn(event.target.value);
  };

  useEffect(() => {
    if (imageData !== null && valueBtn == "CLAHE") {
      const data = new FormData();
      data.append("image", imageData);
      data.append("valueBtn", valueBtn);
      axios
        .post("http://127.0.0.1:5000/image-processing", data, config)
        .then((res) => {
          setResultData(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [imageData]);

  console.log(resultData);

  return (
    <>
      <h1 className="text-center text-white mb-5 mt-5">Pre Processing Image</h1>
      <div className="row justify-content-center">
        {resultData !== null && valueBtn == "CLAHE" ? (
          <div className="container text-center">
            <h1 className="text-center text-white mb-5">Uploaded Image</h1>
            <img
              className="mb-5"
              style={{ width: "200px" }}
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="1000"
              src={"data:image/jpg;base64," + resultData.data.upload_image}
            />
            <h1 className="text-center text-white mb-5">
              Result Pre Processing Image
            </h1>
            <img
              className="mb-5"
              style={{ width: "200px" }}
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="1000"
              src={"data:image/jpg;base64," + resultData.data.result_image}
            />{" "}
          </div>
        ) : (
          <div className="text-center text-white mr-5">
            {valueBtn === null || imageData === null ? (
              <>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>
                      <label className="text-center">
                        Select Pre Processing Type
                      </label>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="text-center d-flex justify-content-center">
                      <div className="button-radio mr-5">
                        <input
                          type="radio"
                          name="normalization"
                          value="CLAHE"
                          onChange={handleChoiceChange}
                        />
                        <label> CLAHE</label>
                      </div>
                      <div className="button-radio">
                        <input
                          type="radio"
                          name="normalization"
                          value="Stain Normalization"
                          onChange={handleChoiceChange}
                        />
                        <label> Stain Normalization</label>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ) : null}

            {valueBtn === "CLAHE" ? (
              <ClaheContent handleInputChange={handleInputChange} />
            ) : (
              <StainContent
                previewImage={previewImage}
                handlePreviewImage={handlePreviewImage}
                handleInputChange={handleInputChange}
                submitStain={submitStain}
                resultData={resultData}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PreProcessingPage;
