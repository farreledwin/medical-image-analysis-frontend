import React from "react";
import "./our-team.styles.scss";
import PakDiaz from "../../assets/images/DIAZ001.jpg";

const HrStyling = {
  backgroundColor: "white",
  width: "17%",
};

const positionName = {
  position: "relative",
  left: "-3em",
  fontFamily: "PoppinsThin",
  marginBottom: '0'
};

const jobPosition = {
    position: "relative",
    left: "1em",
    fontFamily: "PoppinsItalic"
}
const OurTeam = () => (
  <div className="our-team text-white pt-5">
    <div className="text-ourteam text-center">
      <h1>Our Team</h1>
      <div className="image-leader pt-5">
        <div className="col-sm-12">
          <img src={PakDiaz} className="img-thumbnail" />
          <hr style={HrStyling}></hr>
          <p style={positionName}>Diaz D. Santika</p>
          <p style={jobPosition}>Senior Lecture In Binus University</p>
        </div>
      </div>
    </div>
  </div>
);

export default OurTeam;
