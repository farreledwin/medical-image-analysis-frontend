import React, { useEffect, useState } from "react";
import JumbotronContent from "../../components/jumbotron-content/jumbotron.component";
import UploadPhotos from "../../components/upload-photos/upload-photos.component";
import OurTeam from "../../components/our-team/our-team.component";
import ImageRegistrationPhotos from "../../components/image-registration-photos/image-registration-photos-component";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";

const HomePage = () => {
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = () => {
    setIsFetching(!isFetching);
  };
  return (
    <LoadingMask
      loading={isFetching ? true : false}
      loadingText={"LOADING ANALYZE THE RESULTS..."}
    >
      <div>
        <JumbotronContent />
        <UploadPhotos handleChange={handleChange} />
        <ImageRegistrationPhotos handleChange={handleChange} />
        <OurTeam />
      </div>
    </LoadingMask>
  );
};

export default HomePage;
