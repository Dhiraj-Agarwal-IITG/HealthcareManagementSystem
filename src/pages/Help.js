import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Faq from '../components/Faq';

const Help = () => {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>
                <div className='w-4/5'>
                    <div><Faq/></div>
                </div>
            </div>
        </div>
    )
}

export default Help