import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import ListAppointments from './ListAppointments';
import toast from "react-hot-toast";
import axios from "axios";
import { UserState } from '../../Context/UserProvider';

const UpcomingAppointments = () => {
    const { user, getUserFromToken } = UserState();
    React.useEffect(() => {
        if (!user) {
            getUserFromToken();
        }
    }, [])

    const [fromDate, setFromDate] = React.useState(dayjs(Date.now()));
    const [toDate, setToDate] = React.useState(dayjs(Date.now()));
    const [leaveRange, setLeaveRange] = React.useState({
        startTime: "",
        endTime: "",
    });

    const handleClickLeave = async () => {
        if (!leaveRange.startTime) {
            const temp = { ...leaveRange, startTime: new Date().getTime() };
            setLeaveRange(temp);
        }
        if (!leaveRange.endTime || (leaveRange.startTime === leaveRange.endTime)) {
            toast.error("Please select Leave end date");
            return;
        }
        const toastId = toast.loading('Loading...');
        try {
            const data = {
                doctorId: "653262af3936708b5898d1e4", // TODO: fetch doctor id from profile
                ...leaveRange
            };

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/doctor/scheduleLeave`, data);
            console.log(response.data);
            toast.dismiss(toastId);

            if (response.data.success === true) {
                toast.success(response.data.message);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Server error");
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='p-5'>
                {
                    user?.role === "doctor" &&
                    <div>
                        <div className='font-medium text-lg'>Take a leave</div>
                        <div className='flex gap-10 p-5'>
                            <DateTimePicker
                                label="Leave Start"
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                value={fromDate}
                                onChange={(newValue) => {
                                    setFromDate(newValue);
                                    const temp = { ...leaveRange, startTime: newValue.toDate().getTime() };
                                    setLeaveRange(temp);
                                }}
                            />
                            <DateTimePicker
                                label="Leave end"
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                value={toDate}
                                onChange={(newValue) => {
                                    setToDate(newValue);
                                    const temp = { ...leaveRange, endTime: newValue.toDate().getTime() };
                                    setLeaveRange(temp);
                                }}
                            />
                        </div>
                        <div className='font-light text-gray-600 '>
                            Note: All your appointments in this period will be cancelled.
                        </div>
                        <button type="button" className='bg-blue-500 flex items-center justify-between gap-2 cursor-pointer text-white px-5 py-3 rounded-lg text-sm font-medium mt-4' onClick={handleClickLeave}>
                            Confirm Leave
                        </button>
                    </div>
                }
                <div>
                    <ListAppointments />
                </div>
            </div>
        </LocalizationProvider>
    )
}

export default UpcomingAppointments