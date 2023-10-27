import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const Genres = ({ data }) => {
  return (
    <div className="genres">
      <div className="genre">{data}</div>
    </div>
  );
};

export default Genres;
