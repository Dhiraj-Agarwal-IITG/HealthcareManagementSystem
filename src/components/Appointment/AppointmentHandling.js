import React, { useEffect } from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '16px',
};

const AppointmentHandling = () => {
    const [reason, setReason] = useState("");
    const [openAcceptModal, setOpenAcceptModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/appointment/getAllAppointments`);
        console.log(response.data.data);
    };

    const handleOpenAcceptModal = () => setOpenAcceptModal(true);
    const handleCloseAcceptModal = () => setOpenAcceptModal(false);
    const handleOpenRejectModal = () => setOpenRejectModal(true);
    const handleCloseRejectModal = () => setOpenRejectModal(false);

    const handleAcceptClick = () => {
        handleOpenAcceptModal();
    }

    const handleRejectClick = () => {
        handleOpenRejectModal();
    }

    const handleClickConfirmAppointment = () => {
        // TODO: approve appointment and send mail to patient and doctor
    }

    const handleClickRejectAppointment = () => {
        // TODO: cancel appointment and send mail to patient
        console.log("Reason: ", reason);
    }

    return (
        <>
            <Modal
                open={openAcceptModal}
                onClose={handleCloseAcceptModal}
            >
                <Box sx={style}>
                    <div className='py-10 px-12 w-[32rem] rounded-xl'>
                        <div className='flex justify-end text-gray-500 font-bold text-xl cursor-pointer' onClick={handleCloseAcceptModal}>
                            <AiOutlineClose />
                        </div>
                        <div className='m-5 text-2xl font-medium flex items-center justify-center'>
                            Accept Appointment
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Assign a doctor</h3>
                        <div>
                            <select id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" defaultValue={"Choose a doctor"}>
                                {/* <option selected>Choose a doctor</option> */}
                                <option value="Cardiology">Cardiology</option>
                                <option value="ENT">ENT</option>
                                <option value="General">General surgery</option>
                                <option value="Gynaecology">Gynaecology</option>
                                <option value="Haematology">Haematology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Oncology">Oncology</option>
                                <option value="Opthalmology">Opthalmology</option>
                                <option value="Orthopaedic">Orthopaedic</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Psychiatry">Psychiatry</option>
                                <option value="Urology">Urology</option>
                            </select>
                        </div>
                        <div>
                            <h3 className="mt-5 text-lg font-medium text-gray-900">Assign a slot</h3>
                            <ul className="grid w-full gap-2 grid-cols-2">
                                <li>
                                    <input type="radio" id="slot8to10" name="slot" value="slot8to10" className="hidden peer" required />
                                    <label htmlFor="slot8to10" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div className="w-full">8:00 AM - 10:00 AM</div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="slot10to12" name="slot" value="slot10to12" className="hidden peer" />
                                    <label htmlFor="slot10to12" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div className="w-full">10:00 AM - 12:00 PM</div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="slot12to2" name="slot" value="slot12to2" className="hidden peer" required />
                                    <label htmlFor="slot12to2" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div className="w-full">12:00 PM - 2:00 PM</div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="slot2to4" name="slot" value="slot2to4" className="hidden peer" />
                                    <label htmlFor="slot2to4" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div className="w-full">2:00 PM - 4:00 PM</div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="slot4to6" name="slot" value="slot4to6" className="hidden peer" required />
                                    <label htmlFor="slot4to6" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div className="w-full">4:00 PM - 6:00 PM</div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="slot6to8" name="slot" value="slot6to8" className="hidden peer" />
                                    <label htmlFor="slot6to8" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div className="w-full">6:00 PM - 8:00 PM</div>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <button type="button" className='bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium mt-4' onClick={handleClickRejectAppointment}>
                            <span>
                                Confirm Appointment
                            </span>
                        </button>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={openRejectModal}
                onClose={handleCloseRejectModal}
            >
                <Box sx={style}>
                    <div className='py-10 px-12 w-[32rem] rounded-xl'>
                        <div className='flex justify-end text-gray-500 font-bold text-xl cursor-pointer' onClick={handleCloseRejectModal}>
                            <AiOutlineClose />
                        </div>
                        <div className='m-5 text-xl font-medium text-center flex items-center justify-center'>
                            Are you sure want to reject this appointment ?
                        </div>
                        <div className='flex mt-8'>
                            <div className='flex flex-col w-full'>
                                <div>
                                    Reason for cancellation <span className='text-red-400'>*</span>
                                </div>
                                <input
                                    required
                                    type="text"
                                    name="reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className='bg-gray-100 rounded px-4 py-2 w-full focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
                            </div>
                        </div>
                        <button type="button" className='bg-red-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium mt-4' onClick={handleClickRejectAppointment}>
                            <span>
                                Reject Appointment
                            </span>
                        </button>
                    </div>
                </Box>
            </Modal>
            <div className='p-5'>
                <h2 className='text-xl font-bold'>New appointments</h2>
                <div className='w-full shadow-xl p-5 rounded-lg'>
                    <div><span className='text-lg font-medium'>Name: </span>Rahul Kumar</div>
                    <div><span className='text-lg font-medium'>Patient Id: </span>122819</div>
                    <div><span className='text-lg font-medium'>Preferred slot: </span>12 PM to 2PM</div>
                    <div><span className='text-lg font-medium'>Department: </span>ENT</div>
                    <div>
                        <span className='text-lg font-medium'>Reason: </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sodales vel orci sit amet viverra. In ac nulla at tellus eleifend tincidunt ultrices id augue. Sed dignissim aliquam sem, ut vestibulum ante. Proin ultricies eros est, et cursus erat efficitur ac. Integer euismod dignissim massa. Praesent maximus laoreet metus vel sagittis. Nullam ut luctus mi, in malesuada turpis. Sed nec turpis quis enim pharetra varius eget non magna. Nullam eget nulla nunc. Duis condimentum, orci posuere mollis pellentesque, massa nunc varius nisl, et elementum tellus felis eget nisl. Nulla vitae est semper, blandit velit sit amet, varius nisi. Ma
                    </div>
                    <div className='flex gap-2'>
                        <button type="button" className='bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-12 py-3 rounded-lg text-sm font-medium mt-4' onClick={handleAcceptClick}>
                            Accept
                        </button>
                        <button type="button" className='bg-red-500 flex items-center justify-between gap-2 cursor-pointer text-white px-12 py-3 rounded-lg text-sm font-medium mt-4' onClick={handleRejectClick}>
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppointmentHandling


// patientId: {
//   firstname: {
//   lastname: {
//   time: {
//   doctor: {
//     type: mongoose.Schema.Types.ObjectId,
//   patient: {
//   Reason: {
//   token_no: {
//   status: {