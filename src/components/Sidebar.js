import React, { useEffect } from 'react'
import { AiOutlinePieChart, AiOutlineUser } from 'react-icons/ai';
import { FaStethoscope, FaAngleDown } from 'react-icons/fa6';
import { TbFileInvoice } from 'react-icons/tb';
import { IoHelpCircleOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsCalendar4Week } from 'react-icons/bs';
import { NavLink } from "react-router-dom";
import { UserState } from '../Context/UserProvider';

const Sidebar = () => {
    const { user, getUserFromToken } = UserState();
    useEffect(() => {
        if (!user) {
            getUserFromToken();
        }
    }, [])

    return (
        <div className='flex flex-col gap-1 px-1 py-5 border-r fixed h-full w-1/5'>
            <NavLink to="/dashboard" className={`text-gray-400 hover:text-slate-800 aria-[current=page]:bg-blue-500 aria-[current=page]:text-white rounded flex gap-3 items-center px-8 py-3 mx-1 cursor-pointer font-medium text-lg`}>
                <AiOutlinePieChart />
                <span className='text-base'>Dashboard</span>
            </NavLink>
            <NavLink to="/doctor" className={`text-gray-400 hover:text-slate-800 aria-[current=page]:bg-blue-500 aria-[current=page]:text-white rounded flex gap-3 items-center px-8 py-3 mx-1 cursor-pointer font-medium text-lg`}>
                <FaStethoscope />
                <span className='text-base'>Doctors</span>
            </NavLink>
            <NavLink to="/calendar" className={`text-gray-400 hover:text-slate-800 aria-[current=page]:bg-blue-500 aria-[current=page]:text-white rounded flex gap-3 items-center px-8 py-3 mx-1 cursor-pointer font-medium text-lg`}>
                <BsCalendar4Week />
                <span className='text-base'>Calendar</span>
            </NavLink>

            <div className='h-[1px] my-5 bg-gray-200' />
            <NavLink to="/appointmentHistory" className={`text-gray-400 hover:text-slate-800 aria-[current=page]:bg-blue-500 aria-[current=page]:text-white rounded flex gap-3 items-center px-8 py-3 mx-1 cursor-pointer font-medium text-lg`}>
                <TbFileInvoice />
                <span className='text-base'>Appointment History</span>
            </NavLink>
            <NavLink to="/help" className={`text-gray-400 hover:text-slate-800 aria-[current=page]:bg-blue-500 aria-[current=page]:text-white rounded flex gap-3 items-center px-8 py-3 mx-1 cursor-pointer font-medium text-lg`}>
                <IoHelpCircleOutline />
                <span className='text-base'>Help</span>
            </NavLink>
            <NavLink to="/settings" className={`text-gray-400 hover:text-slate-800 aria-[current=page]:bg-blue-500 aria-[current=page]:text-white rounded flex gap-3 items-center px-8 py-3 mx-1 cursor-pointer font-medium text-lg`}>
                <IoSettingsOutline />
                <span className='text-base'>Settings</span>
            </NavLink>
            {user?.firstname &&
                <NavLink to="/profile" className={`bg-sky-100 flex justify-between rounded gap-3 items-center px-8 py-4 mx-1 mt-4 cursor-pointer text-blue-500 font-medium text-lg`}>
                    <AiOutlineUser />
                    <span className='text-base text-slate-800'>{user.firstname}</span>
                    <FaAngleDown className='text-slate-800 text-base' />
                </NavLink>}
        </div>
    )
}

export default Sidebar