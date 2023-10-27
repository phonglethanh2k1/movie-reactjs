import React from "react";

import "./style.scss";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const ContentWrapper = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
