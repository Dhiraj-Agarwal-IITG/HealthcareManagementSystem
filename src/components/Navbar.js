import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaHeartPulse } from 'react-icons/fa6';

const Navbar = () => {
    return (
        <div className='shadow'>
            <div className='w-5/6 mx-auto py-5 items-center flex justify-between'>
                <div className='flex gap-10 items-center'>
                    <div className='text-blue-500 font-bold text-2xl flex gap-2 items-center'>
                        <div className='p-3 rounded-full bg-sky-50 border border-sky-100'>
                            <FaHeartPulse />
                        </div>
                        <h1>MediTrack</h1>
                    </div>
                    <div className='search relative'>
                        <input type="text" className='bg-gray-200 rounded px-4 pl-10 py-2 focus:outline-none border-none text-slate-600' placeholder='Search' />
                        <HiOutlineSearch className='absolute top-3 left-3 text-slate-500' />
                    </div>
                </div>
                <div className='flex gap-3'>
                    <button className='border p-3 rounded-full mx-5'>
                        <GrNotification />
                    </button>
                    <button type="button" className='border border-blue-500 cursor-pointer text-blue-500 px-6 py-3 rounded-lg text-sm font-medium'>
                        New Patient
                    </button>
                    <button type="button" className='bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium'>
                        <AiOutlinePlus />
                        <span>
                            Appointment
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar