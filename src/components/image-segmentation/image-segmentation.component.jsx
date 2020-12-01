import React from "react";
import "./image-segmentation.styles.scss";
import UploadPhotoSection from "../upload-photo-pre-process/upload-photo-pre.component";

const ImageSegmentationContent = (props) => {
  return (
    <div>
      <UploadPhotoSection handleInputChange={props.handleImage} />
    </div>
  );
};
export default ImageSegmentationContent;
