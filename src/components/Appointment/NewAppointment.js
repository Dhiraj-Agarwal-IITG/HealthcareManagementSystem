import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BsCalendarWeek } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { UserState } from "../../Context/UserProvider";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "16px",
};

const NewAppointment = () => {
    const { user, getUserFromToken } = UserState();

    useEffect(() => {
        if (!user) {
            getUserFromToken();
        }
    }, [])

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const [slots, setSlots] = useState({
        slot8to10: "",
        slot10to12: "",
        slot12to2: "",
        slot2to4: "",
        slot4to6: "",
        slot6to8: ""
    });

    const [slotOpen, setSlotOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        patientId: "",
        gender: "",
        bloodGroup: "",
        mobile: "",
        dateOfBirth: "",
        symptoms: "",
        department: "",
        slot: "",
        token: "",
        dateOfAppointment: new Date().toISOString().substring(0, 10),
    });
    const {
        firstName,
        lastName,
        email,
        patientId,
        gender,
        bloodGroup,
        mobile,
        dateOfBirth,
        symptoms,
        department,
        slot,
        token,
        dateOfAppointment
    } = formData;

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const handleOpenSuccessModal = () => setOpenSuccessModal(true);
    const handleCloseSuccessModal = () => setOpenSuccessModal(false);



    const fetchData = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/auth/patient/getById`,
            { params: { id: user.id } }
        );
        setFormData((prevData) => ({
            ...prevData,
            firstName: response.data.data?.firstName,
            lastName: response.data.data?.lastName,
            patientId: response.data.data?.rollno,
            dateOfBirth: response.data.data?.dateOfBirth.substr(0, 10),
            gender: response.data.data?.gender,
            bloodGroup: response.data.data?.bloodGroup,
            mobile: response.data.data?.mobile,
            email: response.data.data?.email,
        }));
    };

    const getAvailaibility = async () => {
        const toastId = toast.loading('Loading...');
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/doctor/fetchByDept`, { params: { department } });

            const doctorDetails = response.data.data;

            let startHour = 0, endHour = 0;
            if (slot === "slot8to10") {
                startHour = 8;
                endHour = 10;
            }
            else if (slot === "slot10to12") {
                startHour = 10;
                endHour = 12;
            }
            else if (slot === "slot12to2") {
                startHour = 12;
                endHour = 14;
            }
            else if (slot === "slot2to4") {
                startHour = 14;
                endHour = 16;
            }
            else if (slot === "slot4to6") {
                startHour = 16;
                endHour = 18;
            }
            else if (slot === "slot6to8") {
                startHour = 18;
                endHour = 20;
            }
            const appointmentTime = new Date(dateOfAppointment)?.setHours(startHour, 0);

            const ids = doctorDetails.map(doc => {
                const leaveArr = doc.leaveSchedule;
                let isAvailable = true;
                leaveArr.forEach(leave => {
                    if (leave.startTime <= appointmentTime && appointmentTime < leave.endTime) {
                        isAvailable = false;
                    }
                })
                if (isAvailable) {
                    return doc._id
                }
            });

            let countMap = {};

            await Promise.all(ids.map(async (doctorId) => {
                const appointments = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/appointment/getAppointmentsByDoctorId`, { params: { doctorId } });
                appointments.data.data.forEach(data => {
                    if (data?.dateOfAppointment?.substring(0, 10) === dateOfAppointment && data?.status === "Approved") {
                        if (countMap[data.slot] === undefined) {
                            countMap[data.slot] = 1;
                        } else {
                            countMap[data.slot]++;
                        }
                    }
                })
            }));

            const count = response.data.data.length;
            setSlots({
                slot8to10: count * 4,
                slot10to12: count * 4,
                slot12to2: count * 4,
                slot2to4: count * 4,
                slot4to6: count * 4,
                slot6to8: count * 4
            })
            for (let key in countMap) {
                setSlots((prevData) => ({
                    ...prevData,
                    [key]: count * 4 - Number(countMap[key]),
                }));
            }
            toast.dismiss(toastId);
            toast.success("Availability updated");
            setSlotOpen(true);
        }
        catch (error) {
            toast.dismiss(toastId);
            toast.error("Server error. Please try again later");
            console.log("Error while checking availibility", error.message);
        }
    }

    const handleOnChange = (e) => {
        if (e.target.name === "department" || e.target.name === "dateOfAppointment")
            setSlotOpen(false);
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClickCheckAvailibility = () => {
        if (!department) {
            toast.error("Choose a department");
            return;
        }
        getAvailaibility();
    }


    const handleClickBookAppointment = async () => {
        const toastId = toast.loading('Loading...');

        try {
            const data = {
                patient: user.id,
                department,
                slot,
                symptoms,
                dateOfAppointment,
            };
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/appointment/create`, data);
            console.log(response.data);
            toast.dismiss(toastId);
            if (response.data.success === true) {
                handleOpenSuccessModal();
                setFormData((prevData) => ({
                    ...prevData,
                    token: response.data.data.token_no,
                }));
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Server error");
        }
    };

    return (
        <>
            <Modal open={openSuccessModal} onClose={handleCloseSuccessModal}>
                <Box sx={style}>
                    <div className="py-10 px-12 w-[32rem] rounded-xl">
                        <div
                            className="flex justify-end text-gray-500 font-bold text-xl cursor-pointer"
                            onClick={handleCloseSuccessModal}
                        >
                            <AiOutlineClose />
                        </div>
                        <div className="text-green-500 flex items-center text-[3.6rem] justify-center">
                            <FiCheckCircle />
                        </div>
                        <div className="m-5 text-2xl font-medium flex items-center justify-center">
                            Appointment Booked
                        </div>
                        <div className="m-5 text-center text-gray-500 text-lg flex items-center justify-center">
                            Token:{token}. Appointment booked successfully. Reminders will be sent
                            to patient!
                        </div>
                    </div>
                </Box>
            </Modal>

            <div className="flex flex-col m-8">
                <div className="flex font-bold text-2xl">New Appointment</div>
                <form>
                    {
                        (!user || user.role !== "patient") &&
                        <>
                            <div className="flex flex-row my-6 font-bold text-xs items-center justify-between">
                                Patient Details
                                <div className="bg-gray-400 h-[1px] w-10/12"></div>
                            </div>

                            <div className="flex gap-12 justify-between">
                                <div className="flex flex-col w-1/4">
                                    <div>
                                        Patient ID <span className="text-red-400">*</span>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="patientId"
                                        value={patientId}
                                        onChange={handleOnChange}
                                        className="bg-gray-100 w-full rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2"
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col w-1/4">
                                    <div>
                                        First Name <span className="text-red-400">*</span>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        value={firstName}
                                        onChange={handleOnChange}
                                        className="bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2"
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col w-1/4">
                                    <div>
                                        Last Name <span className="text-red-400">*</span>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        value={lastName}
                                        onChange={handleOnChange}
                                        className="bg-gray-100 rounded px-4 py-2 focus:outline-none border-none text-slate-600 mt-2"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            <div className="flex gap-12 mt-8 justify-between">
                                <div className="flex flex-col w-1/4">
                                    <div>
                                        DOB <span className="text-red-400">*</span>
                                    </div>
                                    <input
                                        required
                                        type="date"
                                        name="dateOfBirth"
                                        value={dateOfBirth}
                                        onChange={handleOnChange}
                                        className="bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2"
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col w-1/4">
                                    <div>
                                        Gender <span className="text-red-400">*</span>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="gender"
                                        value={gender}
                                        onChange={handleOnChange}
                                        className="bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2"
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col w-1/4">
                                    <div>
                                        Blood Group <span className="text-red-400">*</span>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="bloodGroup"
                                        value={bloodGroup}
                                        onChange={handleOnChange}
                                        className="bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            <div className="flex gap-8 justify-between mt-8">
                                <div className="flex flex-col w-5/12">
                                    <div>
                                        Mobile Number <span className="text-red-400">*</span>
                                    </div>
                                    <input
                                        required
                                        type="number"
                                        name="mobile"
                                        value={mobile}
                                        onChange={handleOnChange}
                                        className="bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2"
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col w-6/12">
                                    <div>
                                        Email Id <span className="text-red-400">*</span>
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleOnChange}
                                        className="bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </>
                    }

                    <div className="flex flex-row mt-10 mb-6 font-bold text-xs items-center justify-between">
                        Appointment Details
                        <div className="bg-gray-400 h-[1px] w-10/12"></div>
                    </div>

                    <div className="flex">
                        <div className="flex flex-col w-full">
                            <div>
                                Symptoms <span className="text-red-400">*</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="symptoms"
                                value={symptoms}
                                onChange={handleOnChange}
                                className="bg-gray-100 rounded px-4 py-2 w-full focus:outline-none border-none text-slate-600 mt-2"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-xl p-5 mt-10 mb-6">
                        <div className="flex justify-between">
                            <div className="flex items-center justify-center gap-2 font-semibold text-lg">
                                <span className="text-blue-600">
                                    <BsCalendarWeek />
                                </span>
                                Availability
                            </div>
                            <div>
                                <input
                                    required
                                    type="date"
                                    name="dateOfAppointment"
                                    value={dateOfAppointment}
                                    onChange={handleOnChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="bg-gray-100 rounded px-4 w-full py-2 focus:outline-none border-none text-slate-600 mt-2"
                                    placeholder=""
                                />
                            </div>
                            {/* <span>{dayjs().format("D MMM, ddd")}</span> */}
                        </div>
                        <div className="bg-gray-300 my-6 h-[1px] w-full"></div>
                        <div>
                            <select
                                id="department"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                required
                                name="department"
                                value={department}
                                onChange={handleOnChange}
                            >
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
                            <div className="my-5 flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Book a slot
                                </h3>
                                <button
                                    type="button"
                                    className="disabled:bg-blue-300 bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-4 py-2 rounded-lg text-xs"
                                    onClick={handleClickCheckAvailibility}
                                >
                                    Check Availability
                                </button>
                            </div>
                            {slotOpen &&
                                <ul className="grid w-full gap-6 grid-cols-3">
                                    <li>
                                        <input
                                            type="radio"
                                            id="slot8to10"
                                            name="slot"
                                            value="slot8to10"
                                            className="hidden peer"
                                            disabled={slots.slot8to10 === 0}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label
                                            htmlFor="slot8to10"
                                            className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg ${slots.slot8to10 > 0 ? "cursor-pointer" : "cursor-not-allowed"} peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`}
                                        >
                                            <div>
                                                <div className="w-full">8:00 AM - 10:00 AM</div>
                                                {slots.slot8to10 !== "" && <span className={`text-xs ${slots.slot8to10 > 10 ? "text-green-500" : slots.slot8to10 === 0 ? "text-red-500" : "text-orange-500"}`}>{slots.slot8to10} slots available</span>}
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="slot10to12"
                                            name="slot"
                                            value="slot10to12"
                                            className="hidden peer"
                                            disabled={slots.slot10to12 === 0}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label
                                            htmlFor="slot10to12"
                                            className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg ${slots.slot10to12 > 0 ? "cursor-pointer" : "cursor-not-allowed"} peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`}
                                        >
                                            <div>
                                                <div className="w-full">10:00 AM - 12:00 PM</div>
                                                {slots.slot10to12 !== "" && <span className={`text-xs ${slots.slot10to12 > 10 ? "text-green-500" : slots.slot10to12 === 0 ? "text-red-500" : "text-orange-500"}`}>{slots.slot10to12} slots available</span>}
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="slot12to2"
                                            name="slot"
                                            value="slot12to2"
                                            className="hidden peer"
                                            disabled={slots.slot12to2 === 0}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label
                                            htmlFor="slot12to2"
                                            className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg ${slots.slot12to2 > 0 ? "cursor-pointer" : "cursor-not-allowed"} peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`}
                                        >
                                            <div>
                                                <div className="w-full">12:00 PM - 2:00 PM</div>
                                                {slots.slot12to2 !== "" && <span className={`text-xs ${slots.slot12to2 > 10 ? "text-green-500" : slots.slot12to2 === 0 ? "text-red-500" : "text-orange-500"}`}>{slots.slot12to2} slots available</span>}
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="slot2to4"
                                            name="slot"
                                            value="slot2to4"
                                            className="hidden peer"
                                            disabled={slots.slot2to4 === 0}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label
                                            htmlFor="slot2to4"
                                            className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg ${slots.slot2to4 > 0 ? "cursor-pointer" : "cursor-not-allowed"} peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`}
                                        >
                                            <div>
                                                <div className="w-full">2:00 PM - 4:00 PM</div>
                                                {slots.slot2to4 !== "" && <span className={`text-xs ${slots.slot2to4 > 10 ? "text-green-500" : slots.slot2to4 === 0 ? "text-red-500" : "text-orange-500"}`}>{slots.slot2to4} slots available</span>}
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="slot4to6"
                                            name="slot"
                                            value="slot4to6"
                                            className="hidden peer"
                                            disabled={slots.slot4to6 === 0}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label
                                            htmlFor="slot4to6"
                                            className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg ${slots.slot4to6 > 0 ? "cursor-pointer" : "cursor-not-allowed"} peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`}
                                        >
                                            <div>
                                                <div className="w-full">4:00 PM - 6:00 PM</div>
                                                {slots.slot4to6 !== "" && <span className={`text-xs ${slots.slot4to6 > 10 ? "text-green-500" : slots.slot4to6 === 0 ? "text-red-500" : "text-orange-500"}`}>{slots.slot4to6} slots available</span>}
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="slot6to8"
                                            name="slot"
                                            value="slot6to8"
                                            className="hidden peer"
                                            disabled={slots.slot6to8 === 0}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label
                                            htmlFor="slot6to8"
                                            className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg ${slots.slot6to8 > 0 ? "cursor-pointer" : "cursor-not-allowed"} peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100`}
                                        >
                                            <div>
                                                <div className="w-full">6:00 PM - 8:00 PM</div>
                                                {slots.slot6to8 !== "" && <span className={`text-xs ${slots.slot6to8 > 10 ? "text-green-500" : slots.slot6to8 === 0 ? "text-red-500" : "text-orange-500"}`}>{slots.slot6to8} slots available</span>}
                                            </div>
                                        </label>
                                    </li>
                                </ul>}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium mt-4"
                            onClick={handleClickBookAppointment}
                        >
                            <span>Book Appointment</span>
                        </button>
                        <button
                            type="button"
                            className=" flex items-center justify-between gap-2 cursor-pointer text-gray-400 border border-gray-400 px-5 py-3 rounded-lg text-sm font-medium mt-4"
                        >
                            <span>Cancel</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewAppointment;
