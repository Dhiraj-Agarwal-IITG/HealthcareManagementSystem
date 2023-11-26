import React, { useEffect } from "react";
import { useState } from "react";
import profilePic from "../assets/iitg_logo.jpg"
import axios from 'axios'
import toast from "react-hot-toast";
import { UserState } from "../Context/UserProvider";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const { user, setUser, getUserFromToken } = UserState();
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (!user) {
      getUserFromToken();
    }
  }, [])

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    rollno: "",
    gender: "",
    bloodGroup: "",
    mobile: "",
    dateOfBirth: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  })
  const { firstName, lastName, email, rollno, gender, bloodGroup,
    mobile, dateOfBirth, address, state, city, pincode } = formData;

  const fetchData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/${user.role}/getById`, { params: { id: user.id } });
    console.log(response.data.data);
    setFormData((prevData) => ({
      ...prevData,
      firstName: response.data.data.firstName ?? response.data.data.firstname,
      lastName: response.data.data.lastName ?? response.data.data.lastname,
      rollno: response.data.data.rollno,
      dateOfBirth: response.data.data.dateOfBirth?.substr(0, 10),
      gender: response.data.data.gender,
      bloodGroup: response.data.data.bloodGroup,
      mobile: response.data.data.mobile,
      email: response.data.data.email,
      state: response.data.data.state,
      city: response.data.data.city,
      pincode: response.data.data.pincode,
      address: response.data.data.address,
    }));
  };


  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/patient/updatePatient`,
        { id: user.id, formData },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("Updated Successfully");
      toast.success("Profile Updated Successfully");
      console.log(response);
    } catch (error) {
      console.error("Error updating patient data:", error);
      toast.error("Unknown Error Occured");
    }

  };

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
  }

  return (
    <div className='flex flex-col m-8'>
      <div className='font-bold text-2xl'>
        Update Profile
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className='flex flex-row mt-6 font-bold text-xs items-center justify-between'>
          Personal Details
          <div className='bg-gray-400 h-[1px] w-10/12'>
          </div>
        </div>

        <div className='flex rounded-full p-5 h-32'>
          <img src={profilePic} />
        </div>

        <div className='flex gap-12 justify-between'>
          <div className='flex flex-col w-1/4'>
            <div>
              Patient ID <span className='text-red-400'>*</span>
            </div>
            <input
              disabled="true"
              required
              type="text"
              name="rollno"
              value={rollno}
              onChange={handleOnChange}
              className='cursor-not-allowed bg-gray-100 w-full rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-1/4'>
            <div>
              First Name <span className='text-red-400'>*</span>
            </div>
            <input
              required
              disabled="true"
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              className='cursor-not-allowed bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-1/4'>
            <div>
              Last Name <span className='text-red-400'>*</span>
            </div>
            <input
              disabled="true"
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              className='cursor-not-allowed bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
        </div>

        <div className='flex gap-12 mt-8 justify-between'>
          <div className='flex flex-col w-1/4'>
            <div>
              DOB <span className='text-red-400'>*</span>
            </div>
            <input
              // disabled="true"
              required
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={handleOnChange}
              className=' bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-1/4'>
            <div>
              Gender <span className='text-red-400'>*</span>
            </div>
            <input
              disabled="true"
              required
              type="text"
              name="gender"
              value={gender}
              onChange={handleOnChange}
              className='cursor-not-allowed bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-1/4'>
            <div>
              Blood Group <span className='text-red-400'>*</span>
            </div>
            <input
              required
              disabled="true"
              type="text"
              name="bloodGroup"
              value={bloodGroup}
              onChange={handleOnChange}
              className='cursor-not-allowed bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
        </div>

        <div className='flex gap-8 justify-between mt-8'>
          <div className='flex flex-col w-5/12'>
            <div>
              Mobile Number <span className='text-red-400'>*</span>
            </div>
            <input
              required
              type="number"
              name="mobile"
              value={mobile}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-6/12'>
            <div>
              Email Id <span className='text-red-400'>*</span>
            </div>
            <input
              disabled="true"
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className='cursor-not-allowed bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
        </div>

        <div className='flex flex-row mt-12 font-bold text-xs items-center justify-between'>
          Communication
          <div className='bg-gray-400 h-[1px] w-10/12'>
          </div>
        </div>

        <div className='flex mt-8'>
          <div className='flex flex-col w-full'>
            <div>
              Address <span className='text-red-400'>*</span>
            </div>
            <input
              required
              type="text"
              name="address"
              value={address}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 py-2 w-full focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
        </div>

        <div className='flex gap-12 justify-between mt-8'>
          <div className='flex flex-col w-1/4'>
            <div>
              State <span className='text-red-400'>*</span>
            </div>
            <input
              required
              type="text"
              name="state"
              value={state}
              onChange={handleOnChange}
              className='bg-gray-100 w-full rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-1/4'>
            <div>
              City <span className='text-red-400'>*</span>
            </div>
            <input
              required
              type="text"
              name="city"
              value={city}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-1/4'>
            <div>
              Pin Code <span className='text-red-400'>*</span>
            </div>
            <input
              required
              type="text"
              name="pincode"
              value={pincode}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button type="submit" className='bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium mt-4'>
            <span>
              Update Details
            </span>
          </button>
          <button type="button" className='bg-red-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium mt-4' onClick={handleLogOut}>
            <span>
              Logout
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Setting
