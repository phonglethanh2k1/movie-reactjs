import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getListDsPhongVe } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { setTicket } from "../../../store/ticketSlice";
import { listDsGheLocalStorage } from "../../../utils/localService";
import Spinner from "../../../components/spinner/Spinner";

const TabList = ({ movieShowtimes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGetTheater = async (maLichChieu) => {
    try {
      setLoading(true);
      const res = await getListDsPhongVe(maLichChieu);
      dispatch(setTicket(res.data.content));
      listDsGheLocalStorage.set(res.data.content);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(`/ticket/${maLichChieu}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: <h3 style={{ color: `var(--white)` }}>Logo</h3>,
      dataIndex: "Logo",
      key: "Logo",
      render: (text) => <a>{text}</a>,
    },
    {
      title: <h3 style={{ color: `var(--white)` }}>NameTheater</h3>,
      dataIndex: "NameTheater",
      key: "NameTheater",
    },
    {
      title: <h3 style={{ color: `var(--white)` }}>ShowtimeDay</h3>,
      dataIndex: "ShowtimeDay",
      key: "ShowtimeDay",
    },
    {
      title: <h3 style={{ color: `var(--white)` }}>Ticket</h3>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn"
            onClick={() => handleGetTheater(record.maLichChieu)}
          >
            Mua vé Ngay
          </button>
        </Space>
      ),
    },
  ];

  const handleHeThongRap = () => {
    let result = [];
    if (movieShowtimes && movieShowtimes.heThongRapChieu) {
      movieShowtimes.heThongRapChieu.forEach((item, index) => {
        item.cumRapChieu.forEach((cumRap) => {
          cumRap.lichChieuPhim.forEach((lichChieu) => {
            result.push({
              key: result.length,
              Logo: <img src={item.logo} width="100" className="logo-img" />,
              NameTheater: (
                <h6 style={{ color: `var(--orange)`, fontSize: "16px" }}>
                  {cumRap.tenCumRap}
                </h6>
              ),
              ShowtimeDay: (
                <h2 style={{ color: `var(--orange)`, fontSize: "17px" }}>
                  {lichChieu.ngayChieuGioChieu}
                </h2>
              ),
              maLichChieu: lichChieu.maLichChieu,
            });
          });
        });
      });
    }

    return result;
  };

  const data = handleHeThongRap();

  return (
    <React.Fragment>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <div className="content">
          <Table
            columns={columns}
            dataSource={data}
            className="ant-table-wrapper ant-table-cell"
            mobileBreakPoint={768}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default TabList;
