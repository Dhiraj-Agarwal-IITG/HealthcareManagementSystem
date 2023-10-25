import React from 'react'
import { useState} from 'react'
import bgimage from "../assets/iitgbg.jpeg"
import iitglogo from "../assets/iitg_logo.jpg"
import { Link } from 'react-router-dom'


const MainHome = (props) => {
const { role,setRole}=props;
    const submitHandler=()=>{
    console.log(role);
    }
    // console.log(role);
  return (
    <div className='flex items-center justify-center h-screen bg-cover bg-opacity-50 bg-center' style={{backgroundImage:`url(${bgimage})` }}>
      <div className='bg-white w-[32rem] shadow-xl'>
        <div className='flex justify-center my-6'>
            <img src={iitglogo}/> 
        </div>
        <div className='flex flex-col p-10'>
            <div className='font-bold text-3xl'>
                Login As
            </div>

            <div className='flex flex-col gap-4 mt-10 ml-6 font-medium text-gray-500 text-xl'>
                <label className='flex gap-4'>
                    <input type="radio" name='role' value="patient" checked={role==="patient"} onClick={()=>setRole("patient")}/>
                    Patient
                </label>
                <label className='flex gap-4'>
                    <input type="radio" name='role' value="doctor" checked={role==="doctor"} onClick={()=>setRole("doctor")} />
                    Doctor
                </label>
                <label className='flex gap-4'>
                    <input type="radio" name='role' value="admin" checked={role==="admin"} onClick={()=>setRole("admin")} />
                    Admin
                </label>
            </div>
            
            <div className='flex justify-end mt-10'>
            <Link to="login" type="button" className='bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium mt-4' onClick={submitHandler}>
                Continue
              </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MainHome
