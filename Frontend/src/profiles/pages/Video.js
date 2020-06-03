import React from "react";
import ReactPlayer from "react-player";

import "./Video.css";

const Video = () => {
  return (
    <>
      <div className="title">KEEP CALM AND WIN THE WINE!</div>
      <div className="video">
        <ReactPlayer url="https://www.youtube.com/watch?v=_tE8yYHFLpw&amp=&index=3" />
      </div>
    </>
  );
};

export default Video;
