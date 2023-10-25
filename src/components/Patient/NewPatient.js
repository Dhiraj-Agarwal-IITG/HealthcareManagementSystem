import React from 'react'
import { useState } from 'react'
import profilePic from "../../assets/iitg_logo.jpg"

const NewPatient = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    patientId: "",
    gender: "",
    bloodGroup: "",
    mobile: "",
    age: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
    password: ""
  })
  const { firstName, lastName, email, password, patientId, gender, bloodGroup,
    mobile, age, address, state, city, pinCode } = formData;


  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {

  }


  return (
    <div className='flex flex-col m-8'>
      <div className='flex font-bold text-2xl'>
        New Patient
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
              required
              type="text"
              name="patientId"
              value={patientId}
              onChange={handleOnChange}
              className='bg-gray-100 w-full rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-1/4'>
            <div>
              First Name <span className='text-red-400'>*</span>
            </div>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-1/4'>
            <div>
              Last Name <span className='text-red-400'>*</span>
            </div>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
        </div>

        <div className='flex gap-12 mt-8 justify-between'>
          <div className='flex flex-col w-1/4'>
            <div>
              DOB <span className='text-red-400'>*</span>
            </div>
            <input
              required
              type="date"
              name="age"
              value={age}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-1/4'>
            <div>
              Gender <span className='text-red-400'>*</span>
            </div>
            <input
              required
              type="text"
              name="gender"
              value={gender}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
          <div className='flex flex-col w-1/4'>
            <div>
              Blood Group <span className='text-red-400'>*</span>
            </div>
            <input
              required
              type="text"
              name="bloodGroup"
              value={bloodGroup}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
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
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
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
              name="pinCode"
              value={pinCode}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>
        </div>

        <div className='flex flex-row gap-12 w-4/12 mt-8'>
          <div>
            Password (Min 6 digit)<span className='text-red-400'>*</span>
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              className='bg-gray-100 rounded px-4 w-[580px] py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
          </div>

        </div>
        <div>
          <button type="button" className='bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium mt-4'>
            <span>
              Submit
            </span>
          </button>
        </div>
      </form>


    </div>
  )
}

export default NewPatient
