import React, { useEffect } from "react";
import { https } from "../../utils/config";
import { toast } from "react-toastify";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ScrollReveal from "scrollreveal";
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    https
      .post("/QuanLyNguoiDung/DangKy", values)
      .then((res) => {
        console.log(res);
        toast.success("Đăng ký thành công");
        navigate("/signIn");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    ScrollReveal().reveal(".form-content", {
      duration: 1000,
      delay: 1000,
      distance: "100px",
      easing: "ease-in-out",
      origin: "top",
    });
  }, []);
  return (
    <div className="form-content">
      <div className="container">
        <h1>Hello Sign Up</h1>
        <h1 className="welcome">Welcome Back</h1>
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
          <div className="form-control">
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Email"
            />
            <span></span>
            <small>{errors.email && errors.email.message}</small>
          </div>
          <div className="form-control">
            <input
              type="number"
              {...register("soDt", {
                required: "Phone is required",
              })}
              placeholder="Phone"
            />
            <span></span>
            <small>{errors.soDt && errors.soDt.message}</small>
          </div>
          <div className="form-control">
            <input
              type="text"
              {...register("maNhom", {
                required: "Group Code is required",
              })}
              placeholder="Group Code"
            />
            <span></span>
            <small>{errors.maNhom && errors.maNhom.message}</small>
          </div>
          <div className="form-control">
            <input
              type="text"
              {...register("hoTen", {
                required: "Full name is required",
              })}
              placeholder="Full name"
            />
            <span></span>
            <small>{errors.hoTen && errors.hoTen.message}</small>
          </div>
          <input type="submit" />
          <div className="signup_link">
            Not a member?<Link to="/signIn">SignIn</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
