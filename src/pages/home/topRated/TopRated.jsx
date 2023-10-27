import React, { useRef, useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import { motion } from "framer-motion";
const TopRated = () => {
  const [endpoint, setEndpoint] = useState("GP08");
  const url = `${endpoint}`;
  const { data, loading } = useFetch(url);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "GP08" : "GP13");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data.content} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
