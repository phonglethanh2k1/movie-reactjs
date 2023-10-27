import React, { useEffect, useRef, useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import { motion } from "framer-motion";
const Popular = () => {
  const [endpoint, setEndpoint] = useState("GP09");
  const url = `${endpoint}`;
  const { data, loading } = useFetch(url);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "GP09" : "GP0");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data.content} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
