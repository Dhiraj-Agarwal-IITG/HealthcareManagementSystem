import React from 'react'
import { useState } from 'react'

const NewPatient = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        patientId: "",
        gender: "",
        bloodGroup:"",
        mobile:"",
        age:"",
        address:"",
        state:"",
        city:"",
        pinCode:"",
        password:""
      })

  return (
    <div className='flex flex-col ml-10 w-11/12 '>
      <div className='flex mt-8  font-bold text-2xl'>
        New Patient
      </div>
      <div className='felx flex-row mt-16 h-10'>
        <div className='flex text-opacity-10 font-bold w-1/12 float-left'>
          Personal Data
        </div>
        <div className='flex bg-black w-10/12 h-[0.4px] float-right mt-4'>
        </div>
      </div>
      
    </div>
  )
}

export default NewPatient
