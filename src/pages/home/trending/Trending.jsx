import React, { useEffect, useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import { motion } from "framer-motion";
const Trending = () => {
  const [endpoint, setEndpoint] = useState("GP11");
  const url = `${endpoint}`;
  const { data, loading } = useFetch(url);
  useEffect(() => {
    setEndpoint(endpoint);
  }, []);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day"]} />
      </ContentWrapper>
      <Carousel data={data.content} loading={loading} />
    </div>
  );
};

export default Trending;
