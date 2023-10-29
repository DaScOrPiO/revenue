/* eslint-disable no-unused-vars */
import React from "react";
import booking from "../../assets/bookings.svg";
import store from "../../assets/store.svg";
import linkInBio from "../../assets/link-in-bio.svg";
import mediaKit from "../../assets/media-kit.svg";

export default function FixedSideNav() {
  const grayscaleStyle = {
    filter: "grayscale(100%)", // Apply a grayscale filter
  };

  return (
    <div className="side-nav fixed left-0 top-64 z-10 bg-white rounded-xl mr-2 py-2 px-2">
      <div className="image-container mt-2">
        <img src={linkInBio} alt="link-in-bio" className="image" />
      </div>
      <div className="image-container mt-2">
        <img src={booking} alt="booking" className="image" />
      </div>
      <div className="image-container mt-2">
        <img src={mediaKit} alt="media-kit" className="image" />
      </div>
      <div className="image-container mt-2">
        <img src={store} alt="store" className="image" />
      </div>
    </div>
  );
}
