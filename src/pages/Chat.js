import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Chat = () => {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="w-1/5">
                    <Sidebar />
                </div>
                <div className='w-4/5'>
                    <div>Remarks</div>
                    <ul>
                        <li>In calendar, show appointments by date. Handle for both doctor and patient using the role. Only show future appointments</li>
                        <li>Change invocies page to show appointment history. Only show past appointments</li>
                        <li>Help can contain some FAQs and send emails to admins regarding technical difficulty (optional)</li>
                        <li>Chat page will be closed</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Chat