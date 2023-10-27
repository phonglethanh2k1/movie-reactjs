import React, { useEffect } from "react";
import { https } from "../../utils/config";
import { toast } from "react-toastify";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ScrollReveal from "scrollreveal";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/userSlice";
import { userLocalStorage } from "../../utils/localService";
import { BsFacebook } from "react-icons/bs";
const SignIn = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    ScrollReveal().reveal(".form-content", {
      duration: 1000,
      delay: 1000,
      distance: "100px",
      easing: "ease-in-out",
      origin: "top",
    });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    https
      .post("/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        dispatch(setLogin(res.data.content));
        userLocalStorage.set(res.data.content);
        toast.success("Đăng nhập thành công");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form-content">
      <div className="container">
        <h1>Hello Sign In</h1>
        <h1 className="welcome">WELCOME BACK</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <input
              type="text"
              {...register("taiKhoan", {
                required: "Username is required",
              })}
              placeholder="Username"
            />
            <span></span>
            <small>{errors.taiKhoan && errors.taiKhoan.message}</small>
          </div>
          <div className="form-control">
            <input
              type="password"
              {...register("matKhau", {
                required: "Password is required",
              })}
              placeholder="Password"
            />
            <span></span>
            <small>{errors.matKhau && errors.matKhau.message}</small>
          </div>
          <input type="submit" />
          <div className="signup_link">
            Not a member? <Link to="/signUp">Signup</Link>
          </div>
          {/* <ul className="social-icons">
            <li className="social-item">
              <Link to="/facebook" className="social-item-link">
                <BsFacebook />
              </Link>
            </li>
          </ul> */}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
