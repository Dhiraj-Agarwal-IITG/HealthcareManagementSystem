import React, { useState } from "react";
import bgimage from "../assets/iitgbg.jpeg";
import iitglogo from "../assets/iitg_logo.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = (props) => {
  const navigate = useNavigate();
  const { role } = props;
  const [showPassword, setshowPassword] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async () => {
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    try {
      const data = { email, password };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${role}/login`,
        data
      );
      console.log(response.data);
      if (response.data.success === true) {
        navigate("/dashboard");
      }

      response.data.success === true
        ? toast.success("Logged in successfully") && localStorage.setItem("userInfo", JSON.stringify(response.data.token))
        : toast.error(response.data.message);
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-opacity-0 bg-center p-10 "
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="bg-white p-10 w-[30rem] shadow-xl">
        <div className="flex mb-4">
          <img src={iitglogo} alt={"IIT Guwahati logo"} />
        </div>

        <div className="capitalize text-gray-950 text-2xl font-semibold">
          {role} Log In
        </div>

        <div className="mt-4">
          <p className="select-none	">Email ID</p>
          <input
            className=" mt-2 select-none border border-gray-600 p-2 rounded w-full"
            type="email"
            placeholder=" Enter Email Id"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>

        <div className="mt-4 relative ">
          <p className="select-none	">Password</p>
          <div
            onClick={() => setshowPassword(!showPassword)}
            className="absolute cursor-pointer top-10 right-2  text-2xl"
          >
            {showPassword === false ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </div>
          <input
            className=" mt-2 select-none border border-gray-600 p-2 rounded w-full"
            type={showPassword === false ? "password" : "text"}
            placeholder=" Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        <div className="flex mt-8 justify-between items-center">
          {role === "patient" && (
            <div>
              Don't have an account?{" "}
              <Link className="text-blue-400" to="/signup">
                Sign Up
              </Link>
            </div>
          )}
          <div>
            <Link
              type="button"
              className="bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium"
              onClick={submitHandler}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
