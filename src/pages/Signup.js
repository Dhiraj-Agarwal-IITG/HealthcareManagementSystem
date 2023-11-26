import React, { useState } from 'react'
import bgimage from "../assets/iitgbg.jpeg";
import iitglogo from "../assets/iitg_logo.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';


const Signup = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [realOtp, setRealOtp] = useState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    rollno: "",
    gender: "",
    bloodGroup: "",
    mobile: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: ""
  })

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
    // console.log(formData)
  }
  const [otp, setOtp] = useState();
  const handleOnChangeOTP = (e) => {
    setOtp(e.target.value);
  }

  const { firstName, lastName, email, rollno, gender, bloodGroup,
    mobile, dateOfBirth, password, confirmPassword } = formData;
  const OTPHandler = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile ||
      !rollno ||
      !gender ||
      !dateOfBirth ||
      !bloodGroup
    ) {
      toast.error("All fields required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match. Please try again");
      return;
    }

    const toastId = toast.loading('Loading...');

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1 / auth / patient / sendOtp`,
      { email }
    );

    if (response.data.success === true) {
      toast.success("OTP sent Successfully")
      console.log(response.data.otp);
    }
    toast.dismiss(toastId);
    // const myOtp=response.data.otp;
    setRealOtp(response.data.otp);
    //to do : disable input fiels after otp generation
  }

  const submitHandler = async () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !mobile ||
      !bloodGroup ||
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !rollno
    ) {
      toast.error("All fields required");
      return;
    }

    if (confirmPassword !== password) {
      toast.error("Passwords don't match");
      return;
    }

    // // console.log(email, password);

    try {
      const data = {
        email,
        password,
        confirmPassword,
        mobile,
        bloodGroup,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        rollno,
      };

      if (!otp) {
        toast.error("OTP is required");
        return;
      }
      if (realOtp !== otp) {
        toast.error("OTP does not Match");
        return;
      }

      console.log(response.data);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL} /api/v1 / auth / patient / signup`,
        data
      );

      {
        response.data.success === true
          ? toast.success("Account Created Successfully")
          : toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Server error");
    }

    navigate("/login");
  };



  return (
    <div
      className="flex items-center justify-center h-screen overflow-y-scroll bg-cover bg-opacity-0 bg-center p-10 "
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="bg-white p-10 w-[30rem] shadow-xl">
        <div className="flex mb-4 w-10">
          <img src={iitglogo} />
        </div>
        <div className="capitalize object-scale-down text-gray-950 text-2xl font-semibold">
          Sign Up
        </div>

        <div className="mt-4 flex gap-5">
          <div>
            <p className="select-none	">
              First Name <span className="text-red-600">*</span>
            </p>
            <input
              className=" mt-2 select-none border border-gray-600 p-2 rounded w-full"
              required
              placeholder="Enter First Name"
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
            ></input>
          </div>

          <div>
            <p className="select-none	">
              Last Name <span className="text-red-600">*</span>
            </p>
            <input
              className=" mt-2 select-none border border-gray-600 p-2 rounded w-full"
              required
              placeholder="Enter Last Name"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
            ></input>
          </div>
        </div>

        <div className="mt-4">
          <p className="select-none">
            Email <span className="text-red-600">*</span>
          </p>
          <input
            className=" mt-2 select-none border border-gray-600 p-2 rounded w-full"
            required
            type="email"
            name="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={handleOnChange}
          ></input>
        </div>

        <div className="mt-4 flex gap-5">
          <div>
            <p className="select-none">
              Roll No <span className="text-red-600">*</span>
            </p>
            <input
              className=" mt-2 select-none border border-gray-600 p-2 rounded w-full"
              required
              type="text"
              name="rollno"
              placeholder="Enter Roll No"
              value={rollno}
              onChange={handleOnChange}
            ></input>
          </div>

          <div>
            <p className="select-none">
              {" "}
              Blood Group <span className="text-red-600">*</span>
            </p>
            <select
              className=" mt-2 select-none border border-gray-600 p-2 rounded w-full"
              required
              type="text"
              name="bloodGroup"
              value={bloodGroup}
              placeholder="Enter Blood Group"
              onChange={handleOnChange}
            >
              <option value="none">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <p className="select-none">
            Mobile No.<span className="text-red-600">*</span>
          </p>
          <input
            className=" mt-2 select-none border border-gray-600 p-2 rounded w-full"
            required
            type="text"
            name="mobile"
            value={mobile}
            placeholder="Enter Mobile No."
            onChange={handleOnChange}
          ></input>
        </div>

        <div className="mt-4 flex gap-5">
          <div>
            <p className="select-none">
              Date Of Birth <span className="text-red-600">*</span>
            </p>
            <input
              className=" mt-2 select-none border border-gray-600 p-2 px-7 rounded w-full"
              required
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              placeholder="Enter Blood Group"
              onChange={handleOnChange}
            ></input>
          </div>

          <div>
            <p className="select-none">
              Gender <span className="text-red-600">*</span>
            </p>
            <select
              className=" mt-2 select-none border border-gray-600 p-2 px-14  rounded w-full"
              required
              type="text"
              name="gender"
              value={gender}
              placeholder="Male/Female/Others"
              onChange={handleOnChange}
            >
              <option value="none">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>

        <div className="mt-4  flex gap-5">
          <div className="relative">
            <p className="select-none">
              Password<span className="text-red-600">*</span>
            </p>
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
              required
              type={showPassword === false ? "password" : "text"}
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={handleOnChange}
            ></input>
          </div>

          <div className="relative">
            <p className="select-none">
              Confirm Password<span className="text-red-600">*</span>
            </p>
            <div
              onClick={() => setshowConfirmPassword(!showConfirmPassword)}
              className="absolute cursor-pointer top-10 right-2  text-2xl"
            >
              {showConfirmPassword === false ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </div>
            <input
              className=" mt-2 select-none border border-gray-600 p-2 rounded w-full"
              required
              type={showConfirmPassword === false ? "password" : "text"}
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleOnChange}
<<<<<<< HEAD
          ></input>
        </div>

        </div>
      
        <div className='flex justify-center'>
            <Link
              type="button" to='/otp'
              className="bg-blue-500 mt-5 cursor-pointer text-white px-10 py-3 rounded-lg text-sm font-medium" onClick={submitHandler}
            >
              Send OTP
            </Link>
=======
            ></input>
>>>>>>> a67b1f87525e503df08099f52f104cfc2525437b
          </div>
        </div>

        <p className="select-none mt-4">
          Enter OTP<span className="text-red-600">*</span>
        </p>
        <input
          className=" mt-2 select-none border border-gray-600 rounded p-2 w-full"
          required
          type="text"
          name="otp"
          value={otp}
          placeholder="Enter OTP"
          onChange={handleOnChangeOTP}
        ></input>
        <div className="flex justify-end">
          <button
            type="button"
            className=" mt-2 mr-1 cursor-pointer text-grayblack-600 p-1 rounded-lg text font-medium "
            onClick={OTPHandler}
          >
            Send OTP
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="bg-blue-500 mt-5 cursor-pointer text-white px-10 py-3 rounded-lg text-sm font-medium"
            onClick={submitHandler}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup