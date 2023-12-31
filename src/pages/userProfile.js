import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Profile from '../components/profile'

const UserProfile = (props) => {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>
                <div className='w-4/5'>
                    <Profile />
                </div>
            </div>
        </div>
    )
}

export default UserProfile