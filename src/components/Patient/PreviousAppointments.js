import React, { useEffect, useState } from 'react'
import { UserState } from '../../Context/UserProvider'
import axios from 'axios';
import ListItem from '../Appointment/ListItem';
import dayjs from 'dayjs';

function checkDate(data) {
  return new Date(data.dateOfAppointment).getTime() <= Date.now() - 86400000;
}

const PreviousAppointments = () => {
  const { user, getUserFromToken } = UserState();
  const [appointmentData, setAppointmentData] = useState([]);
  useEffect(() => {
    if (!user) {
      getUserFromToken();
    }
  }, []);
  useEffect(() => {
    if (user) {
      allAppointments();
    }
  }, [user]);

  //  console.log(user);
  const allAppointments = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/appointment/${user.role === "doctor" ? "getAppointmentsByDoctorId" : "getAppointmentsByPatientId"}`,
      { params: { id: user.id } }
    );
    // console.log(response);
    const appdata = response.data.data;
    const filteredData = appdata.filter(checkDate);

    let appointmentByDate = [];

    const dateList = new Set();

    filteredData.forEach(data => {
      dateList.add(data.dateOfAppointment.substr(0, 10));
    })

    Array.from(dateList).forEach((currDate) => {
      const currArr = filteredData.filter(elem => {
        return elem.dateOfAppointment.substr(0, 10) === currDate;
      });
      appointmentByDate.push({
        title: currDate,
        value: currArr
      })
    })

    appointmentByDate.sort(function (a, b) {
      var keyA = new Date(a.title),
        keyB = new Date(b.title);
      // Compare the 2 dates
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    setAppointmentData(appointmentByDate);
  }

  return (
    <div className='p-5'>
      <div className="flex flex-row my-6 font-bold text-xs items-center justify-between">
        Appointment history
        <div className="bg-gray-400 h-[1px] w-9/12"></div>
      </div>
      {
        appointmentData.map(data => (
          <>
            <div className='font-bold text-xl mt-8'>Appointments on:  {dayjs(data.title).format('D MMM YYYY')}</div>
            {
              data.value.map((data) => (
                <ListItem key={data._id} value={data} />
              ))
            }
          </>
        ))
      }
    </div>
  );
};

export default PreviousAppointments;
