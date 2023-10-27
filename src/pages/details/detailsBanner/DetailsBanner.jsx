import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import useFetchBanner from "../../../hooks/useFetchBanner";
// import { getDetailMovieShowtimes } from "../../../utils/api";
import Tables from "./TabList";
import { getListDsPhongVe } from "../../../utils/api";

const DetailsBanner = ({ detailData }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [videoId, setVideoId] = useState(null);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const { mediaType, id } = useParams();
  const { data, loading } = useFetchBanner(`/${mediaType}/${id}`);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); //
  const formattedTime = dayjs(detailData.ngayKhoiChieu)
    .set("hour", currentTime.hour())
    .set("minute", currentTime.minute())
    .set("second", currentTime.second())
    .format("hh:mm:ss A");
  const renderState = (boolean) => {
    return boolean ? "Sắp khởi chiếu" : "Đã khởi chiếu";
  };
  const renderStatus = (boolean) => {
    return (
      <div className="infoItem">
        <span className="text bold">Status: {boolean ? "" : ""}</span>
        <span className="text">{renderState(boolean)}</span>
      </div>
    );
  };
  const extractVideoId = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|.*[?&]v=))([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };
  const handleClick = (data) => {
    let id = extractVideoId(data.trailer);
    if (id) {
      setShow(true);
      setVideoId(id);
    }
  };
  // const handleBuyTicket = () => {
  //   getListDsPhongVe()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={detailData.hinhAnh} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {detailData.hinhAnh ? (
                      <Img className="posterImg" src={detailData.hinhAnh} />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${detailData.tenPhim} (${dayjs(
                        detailData.ngayKhoiChieu
                      ).format("MMM D, YYYY")})`}
                    </div>

                    <Genres data={detailData.maNhom} />

                    <div className="row">
                      <CircleRating rating={detailData.danhGia} />
                      <div
                        className="playbtn"
                        onClick={() => handleClick(detailData)}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <motion.button
                        whileHover={{ scale: 0.9 }}
                        className="btn-ticket"
                      >
                        Mua vé
                      </motion.button>
                      <div className="heading">Overview</div>
                      <div className="description">{detailData.moTa}</div>
                    </div>

                    <div className="info">
                      {renderStatus(detailData.sapChieu)}
                      {detailData.ngayKhoiChieu && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(detailData.ngayKhoiChieu).format(
                              "MMM D, YYYY"
                            )}
                          </span>
                        </div>
                      )}
                      {detailData.ngayKhoiChieu && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">{formattedTime}</span>
                        </div>
                      )}
                    </div>

                    <div className="info">
                      <span className="text bold">Movie Code: </span>
                      <span className="text">{detailData.maPhim}</span>
                    </div>

                    <div className="info">
                      <span className="text bold">Aliases: </span>
                      <span className="text">{detailData.biDanh}</span>
                    </div>
                    {/* <Tables /> */}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
