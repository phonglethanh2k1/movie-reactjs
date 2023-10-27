import axios from "axios";
import { BASE_URL, configHeaders } from "./config";

export let getListMovie = () => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`,
    method: "GET",
    headers: configHeaders(),
  });
};
export let getDetailMovie = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};
export let getMovieByTheater = () => {
  return axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09`,
    method: "GET",
    headers: configHeaders(),
  });
};
export let getListPhim = () => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`,
    method: "GET",
    headers: configHeaders(),
  });
};
// export let userServ = {
//   getList: () => {
//     return https.get("/QuanlyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00");
//   },
//   removeUser: (taiKhoan) => {
//     return https.delete(`/QuanlyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
//   },
// };
