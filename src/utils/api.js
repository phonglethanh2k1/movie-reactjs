import axios from "axios";
import { configHeaders, URL, https } from "./config";
const BASE_URL_BANNER = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headerBanner = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApiBanner = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL_BANNER + url, {
      headers: headerBanner,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const BASE_URL = "https://movienew.cybersoft.edu.vn/api";
const headersData = configHeaders();

export const fetchDataFromApi = async (endpoint, params) => {
  try {
    const fullURL = `${BASE_URL}${URL}${endpoint}`;
    const { data } = await axios.get(fullURL, {
      headers: headersData,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export let getDetailMovie = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};
export let getDetailMovieShowtimes = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    method: "GET",
    headers: configHeaders(),
  });
};
export let getListDsPhongVe = (maLichChieu) => {
  console.log(maLichChieu);
  return axios({
    url: `${BASE_URL}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
    method: "GET",
    headers: configHeaders(),
  });
};
