import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import NewAppointment from '../components/Appointment/NewAppointment';

const AddAppointment = () => {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>
                <div className='w-4/5'>
                    <NewAppointment />
                </div>
            </div>
        </div>
    )
}

export default AddAppointment