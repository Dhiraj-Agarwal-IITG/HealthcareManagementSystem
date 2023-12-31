import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Setting from '../components/Setting';

const Settings = () => {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>
                <div className='w-4/5'>
                    <Setting />
                </div>
            </div>
        </div>
    )
}

export default Settings