import React, { useState, Fragment } from "react";
import "./image-segmentation-page.styles.scss";
import ImageSegmentationContent from "../../components/image-segmentation/image-segmentation.component";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";

const ImageSegmentationPage = () => {
  const [show, setShow] = useState(true);
  const [valueBtn, setValueBtn] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [clusterAmount, setclusterAmount] = useState(2);
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = () => {
    setIsFetching(!isFetching);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleChoiceChange = (event) => {
    setValueBtn(event.target.value);
  };
  const handleClusterAmount = (event) => {
    setclusterAmount(event.target.value);
  }

  const handleImage = (event) => {
    setImageData(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };
  const config = {
    headers: { "Access-Control-Allow-Origin": "*", crossDomain: true },
  };

  useEffect(() => {
    if (imageData !== null) {
      handleChange();
      const data = new FormData();
      data.append("image", imageData);
      data.append("valueBtn",valueBtn);
      if (valueBtn === "Watershed") {
        axios
          .post("http://127.0.0.1:5000/image-segmentation", data, config)
          .then((res) => {
            setResultData(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        data.append("clusters_count", clusterAmount);
        axios
          .post("http://127.0.0.1:5000/image-segmentation", data, config)
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

  useEffect(() => {
    if(resultData !== null) {
      handleChange();
    }
  },[resultData]);

  return (
    <LoadingMask
    loading={isFetching ? true : false}
    loadingText={"ANALYZING THE RESULTS..."}
  >
    <>
      <h1 className="text-center text-white mb-5 mt-5">Image Segmentation</h1>
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
        
        <Fragment>
          <ImageSegmentationContent handleImage={handleImage} />
          {valueBtn === "K-Means"? 
            <div className="icon-upload d-flex text-white text-center h-auto">
              <h5>K-Means Clusters</h5>
              <h1>{clusterAmount}</h1>
              <input type="range" class="custom-range" min="1" max="5" step="1" value={clusterAmount} onChange={handleClusterAmount}/>
            </div>
            :
            ""
          }
        </Fragment>
        
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
              <label>
                <input
                  type="radio"
                  name="algorithm"
                  value="Watershed"
                  onChange={handleChoiceChange}
                />
                {` Watershed`}
              </label>
            </div>
            <div className="button-radio">
              <label>
                <input
                  type="radio"
                  name="algorithm"
                  value="K-Means"
                  onChange={handleChoiceChange}
                />
                {` K-Means`}
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Confirm
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
    </>
    </LoadingMask>
  );
};
export default ImageSegmentationPage;
