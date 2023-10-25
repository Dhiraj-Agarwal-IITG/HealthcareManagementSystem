import dayjs from 'dayjs';
import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { BsCalendarWeek } from 'react-icons/bs';
import { FiCheckCircle } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '16px',
};

const NewAppointment = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        patientId: "",
        gender: "",
        bloodGroup: "",
        mobile: "",
        age: "",
        symptoms: "",
        department: "",
    })
    const { firstName, lastName, email, patientId, gender, bloodGroup,
        mobile, age, symptoms, department } = formData;

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const handleOpenSuccessModal = () => setOpenSuccessModal(true);
    const handleCloseSuccessModal = () => setOpenSuccessModal(false);


    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleClickBookAppointment = () => {
        //TODO: integrate create Appointment

        handleOpenSuccessModal();
    }

    const handleOnSubmit = (e) => {

    }


    return (
        <>
            <Modal
                open={openSuccessModal}
                onClose={handleCloseSuccessModal}
            >
                <Box sx={style}>
                    <div className='py-10 px-12 w-[32rem] rounded-xl'>
                        <div className='flex justify-end text-gray-500 font-bold text-xl cursor-pointer' onClick={handleCloseSuccessModal}>
                            <AiOutlineClose />
                        </div>
                        <div className='text-green-500 flex items-center text-[3.6rem] justify-center'>
                            <FiCheckCircle />
                        </div>
                        <div className='m-5 text-2xl font-medium flex items-center justify-center'>
                            Appointment Booked
                        </div>
                        <div className='m-5 text-center text-gray-500 text-lg flex items-center justify-center'>
                            ID:11421: Appointment booked successfully. Reminders will be sent to patient!
                        </div>
                    </div>
                </Box>
            </Modal>

            <div className='flex flex-col m-8'>
                <div className='flex font-bold text-2xl'>
                    New Appointment
                </div>

                <form onSubmit={handleOnSubmit}>
                    <div className='flex flex-row my-6 font-bold text-xs items-center justify-between'>
                        Patient Details
                        <div className='bg-gray-400 h-[1px] w-10/12'>
                        </div>
                    </div>

                    <div className='flex gap-12 justify-between'>
                        <div className='flex flex-col w-1/4'>
                            <div>
                                Patient ID <span className='text-red-400'>*</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="patientId"
                                value={patientId}
                                onChange={handleOnChange}
                                className='bg-gray-100 w-full rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <div>
                                First Name <span className='text-red-400'>*</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={handleOnChange}
                                className='bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <div>
                                Last Name <span className='text-red-400'>*</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={handleOnChange}
                                className='bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
                        </div>
                    </div>

                    <div className='flex gap-12 mt-8 justify-between'>
                        <div className='flex flex-col w-1/4'>
                            <div>
                                DOB <span className='text-red-400'>*</span>
                            </div>
                            <input
                                required
                                type="date"
                                name="age"
                                value={age}
                                onChange={handleOnChange}
                                className='bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <div>
                                Gender <span className='text-red-400'>*</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="gender"
                                value={gender}
                                onChange={handleOnChange}
                                className='bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <div>
                                Blood Group <span className='text-red-400'>*</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="bloodGroup"
                                value={bloodGroup}
                                onChange={handleOnChange}
                                className='bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
                        </div>
                    </div>

                    <div className='flex gap-8 justify-between mt-8'>
                        <div className='flex flex-col w-5/12'>
                            <div>
                                Mobile Number <span className='text-red-400'>*</span>
                            </div>
                            <input
                                required
                                type="number"
                                name="mobile"
                                value={mobile}
                                onChange={handleOnChange}
                                className='bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
                        </div>
                        <div className='flex flex-col w-6/12'>
                            <div>
                                Email Id <span className='text-red-400'>*</span>
                            </div>
                            <input
                                required
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                className='bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
                        </div>
                    </div>

                    <div className='flex mt-8'>
                        <div className='flex flex-col w-full'>
                            <div>
                                Symptoms <span className='text-red-400'>*</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="symptoms"
                                value={symptoms}
                                onChange={handleOnChange}
                                className='bg-gray-100 rounded px-4 py-2 w-full focus:outline-none border-none text-slate-600 mt-2' placeholder='' />
                        </div>
                    </div>

                    <div className='border border-gray-300 rounded-xl p-5 mt-10 mb-6'>
                        <div className='flex justify-between'>
                            <div className='flex items-center justify-center gap-2 font-semibold text-lg'>
                                <span className='text-blue-600'><BsCalendarWeek /></span>
                                Availability
                            </div>
                            <span>{dayjs().format('D MMM, ddd')}</span>
                        </div>
                        <div className='bg-gray-300 my-6 h-[1px] w-full'></div>
                        <div>
                            <select id="department" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
                                <option selected>Choose a department</option>
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
                            <h3 class="my-5 text-lg font-medium text-gray-900">Book a slot</h3>
                            <ul class="grid w-full gap-6 grid-cols-3">
                                <li>
                                    <input type="radio" id="slot8to10" name="slot" value="slot8to10" class="hidden peer" required />
                                    <label for="slot8to10" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div class="w-full">8:00 AM - 10:00 AM</div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="slot10to12" name="slot" value="slot10to12" class="hidden peer" />
                                    <label for="slot10to12" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div class="w-full">10:00 AM - 12:00 PM</div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="slot12to2" name="slot" value="slot12to2" class="hidden peer" required />
                                    <label for="slot12to2" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div class="w-full">12:00 PM - 2:00 PM</div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="slot2to4" name="slot" value="slot2to4" class="hidden peer" />
                                    <label for="slot2to4" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div class="w-full">2:00 PM - 4:00 PM</div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="slot4to6" name="slot" value="slot4to6" class="hidden peer" required />
                                    <label for="slot4to6" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div class="w-full">4:00 PM - 6:00 PM</div>
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="slot6to8" name="slot" value="slot6to8" class="hidden peer" />
                                    <label for="slot6to8" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                        <div class="w-full">6:00 PM - 8:00 PM</div>
                                    </label>
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <button type="button" className='bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium mt-4' onClick={handleClickBookAppointment}>
                            <span>
                                Book Appointment
                            </span>
                        </button>
                        <button type="button" className=' flex items-center justify-between gap-2 cursor-pointer text-gray-400 border border-gray-400 px-5 py-3 rounded-lg text-sm font-medium mt-4'>
                            <span>
                                Cancel
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewAppointment
