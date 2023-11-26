import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import PreviousAppointments from '../components/Patient/PreviousAppointments';

const AppointmentHistory = () => {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>
                <div className='w-4/5'>
                    <div>
                        <PreviousAppointments />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentHistory