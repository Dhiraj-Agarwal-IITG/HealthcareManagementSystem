import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Calendar = () => {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>
                <div className='w-4/5'>
                    <div>Calendar</div>
                </div>
            </div>
        </div>
    )
}

export default Calendar