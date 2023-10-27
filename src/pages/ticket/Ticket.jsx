import React, { useEffect, useState } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import "./style.scss";
import { toast } from "react-toastify";
const Ticket = () => {
  const { user } = useSelector((state) => state.user);
  const { ticket } = useSelector((state) => state.ticket);
  const [price, setPrice] = useState(0);
  const [focusGhe, setFocusGhe] = useState([]);
  const handleListDetailMovei = (price, ghe) => {
    setPrice(price);
    setFocusGhe((prevFocusGhe) => {
      if (prevFocusGhe.includes(ghe)) {
        return prevFocusGhe.filter((selectedGhe) => selectedGhe !== ghe);
      }
      return [...prevFocusGhe, ghe];
    });
  };
  const handleBookTickets = () => {
    if (user && user.taiKhoan) {
      toast.success("Đặt vé thành công");
    } else {
      toast.error("Vui lòng đăng nhập");
    }
  };
  return (
    <div className="ticket">
      <ContentWrapper>
        <div className="content">
          <div className="content-left">
            <h1
              style={{
                color: `var(--orange)`,
                textAlign: "center",
                paddingBottom: "20px",
              }}
            >
              Book movie tickets
            </h1>
            <div className="screen"></div>
            <div className="content-button">
              {ticket?.danhSachGhe?.map((dsGhe) => {
                const isGheThuong = dsGhe.loaiGhe === "Thuong";
                const isDaDat = dsGhe.daDat;
                const disabled = isDaDat;
                const isGheVip = dsGhe.loaiGhe === "Vip";

                const buttonClass = `btn-ghe ${isDaDat ? "ghe-da-dat" : ""} ${
                  isGheVip ? "ghe-vip" : ""
                } ${isGheThuong && !isDaDat ? "ghe-thuong" : ""}`;
                return (
                  <button
                    className={buttonClass}
                    key={dsGhe.maGhe}
                    disabled={disabled}
                    onClick={() =>
                      handleListDetailMovei(dsGhe.giaVe, dsGhe.tenGhe)
                    }
                  >
                    {isGheVip ? (
                      <span>{dsGhe.tenGhe}</span>
                    ) : (
                      <span>{isDaDat ? "X" : dsGhe.tenGhe}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="button-container">
              <div
                style={{
                  textAlign: "center",
                  margin: "0 16px",
                }}
              >
                <button className="btn-ghe ghe-vip"></button>
                <p className="text-des">Vip</p>
              </div>
              <div
                style={{
                  textAlign: "center",
                  margin: "0 16px",
                }}
              >
                <button className="btn-ghe ghe-da-dat">
                  <span>X</span>
                </button>
                <p className="text-des">Đã đặt</p>
              </div>
              <div
                style={{
                  textAlign: "center",
                  margin: "0 16px",
                }}
              >
                <button className="btn-ghe ghe-thuong"></button>
                <p className="text-des">Thường</p>
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="content-right-wrapper">
              <div className="ticket-price">
                <p>{price} vnđ</p>
              </div>
              <hr
                style={{
                  margin: "0 16px",
                  background: `var(--gradient)`,
                }}
                color="orange"
              />
              <div className="detaile-ticket">
                <h3 className="title">Cụm Rạp:</h3>
                <h3>{ticket.thongTinPhim.tenCumRap}</h3>
              </div>
              <hr
                style={{
                  margin: "0 16px",
                  background: `var(--gradient)`,
                }}
                color="orange"
              />
              <div className="detaile-ticket">
                <h3 className="title">Địa chỉ:</h3>
                <h3>{ticket.thongTinPhim.diaChi}</h3>
              </div>
              <hr
                style={{
                  margin: "0 16px",
                  background: `var(--gradient)`,
                }}
                color="orange"
              />
              <div className="detaile-ticket">
                <h3 className="title">Rạp:</h3>
                <h3>{ticket.thongTinPhim.tenRap}</h3>
              </div>
              <hr
                style={{
                  margin: "0 16px",
                  background: `var(--gradient)`,
                }}
                color="orange"
              />
              <div className="detaile-ticket">
                <h3 className="title">Ngày giờ chiếu</h3>
                <h3>
                  {ticket.thongTinPhim.ngayChieu}-{ticket.thongTinPhim.gioChieu}
                </h3>
              </div>
              <hr
                style={{
                  margin: "0 16px",
                  background: `var(--gradient)`,
                }}
                color="orange"
              />
              <div className="detaile-ticket">
                <h3 className="title">Tên phim:</h3>
                <h3>{ticket.thongTinPhim.tenPhim}</h3>
              </div>
              <hr
                style={{
                  margin: "0 16px",
                  background: `var(--gradient)`,
                }}
                color="orange"
              />
              <div className="detaile-ticket">
                <h3 className="title">Chọn:</h3>
                <h3>
                  {focusGhe.map((ghe, index) => (
                    <span key={index} style={{ whiteSpace: "normal" }}>
                      Ghế {ghe},
                    </span>
                  ))}
                </h3>
              </div>
              <hr
                style={{
                  margin: "0 16px",
                  background: `var(--gradient)`,
                }}
                color="orange"
              />
              <button className="btn book-ticket" onClick={handleBookTickets}>
                Book tickets
              </button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Ticket;
