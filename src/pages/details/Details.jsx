import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import { getDetailMovie, getDetailMovieShowtimes } from "../../utils/api";
import useFetchBanner from "../../hooks/useFetchBanner";
import TabList from "./detailsBanner/TabList";

const Details = () => {
  const [detailData, setDetailData] = useState({});
  const [movieShowtimes, setMovieShowtimes] = useState({});
  const { id } = useParams();
  const [endpoint, setEndpoint] = useState("GP12");
  const url = `${endpoint}`;
  const { data, loading } = useFetch(url);
  useEffect(() => {
    getDetailMovie(id)
      .then((res) => {
        setDetailData(res.data.content);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
    getDetailMovieShowtimes(id)
      .then((res) => {
        setMovieShowtimes(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(movieShowtimes);
  }, []);
  return (
    <div>
      <DetailsBanner detailData={detailData} />
      {/* <Cast data={credits?.cast} loading={creditsLoading} /> */}
      {/* <VideosSection data={data.content} loading={loading} /> */}
      <TabList movieShowtimes={movieShowtimes} />
      {/* <Similar data={data.content} /> */}
      {/* <Recommendation mediaType={mediaType} id={id} /> */}
    </div>
  );
};

export default Details;
