import React from "react";
import { useState } from "react";
import Card from "./Dashboard/Card";
import Reports from "./Dashboard/Reports";
import Chart from "./Dashboard/Chart";
import AppointmentQueue from "./Dashboard/AppointmentQueue";
import { BiSolidUser } from "react-icons/bi";
import { FaUserMd, FaBed, FaNotesMedical } from "react-icons/fa";
const Dashboard = (props) => {
  const {user}=props;
  const [Data, setData] = useState([]);
  return (
    <div className="bg-white m-10 ">
      <div className=" mb-10">
        <h1 className=" text-slate-800 text-3xl font-semibold mb-2">
          Good Morning!
        </h1>
        <p className="font-extralight text-gray-600 ">
          Check the updates for today here...
        </p>
      </div>
      <div className="flex gap-8">
        <Card title="Total patients" titleColor="bg-blue-500" value={"34"}>
          <div className="h-10 w-10 rounded-full flex justify-center items-center bg-sky-100 ">
            <BiSolidUser className="text-blue-500 text-xl" />
          </div>
        </Card>
        <Card title="Doctors Available" titleColor="bg-blue-500" value={"06"}>
          <div className="h-10 w-10 rounded-full flex justify-center items-center bg-sky-100 ">
            <FaUserMd className="text-blue-500 text-xl" />
          </div>
        </Card>
        <Card title="Beds Available" titleColor="bg-red-200" value={"13"}>
          <div className="h-10 w-10 rounded-full flex justify-center items-center bg-red-100 ">
            <FaBed className="text-red-500 text-xl" />
          </div>
        </Card>
        <Card
          className="bg-blue-400"
          title="Token Number"
          titleColor="bg-yellow-200"
          value={"15,10,8"}
        >
          <div className="h-10 w-10 rounded-full flex justify-center items-center bg-yellow-100 ">
            <FaNotesMedical className="text-yellow-800 text-xl" />
          </div>
        </Card>
      </div>
      <div className="flex mt-20 gap-10">
        <div className="flex-col w-1/4 p-5 font-bold text-black text-lg ml-1 shadow rounded-md">
          Department
          <div>
            <Chart></Chart>
          </div>
        </div>
        <div className="w-3/4 ml-1 p-5 shadow rounded-md">
          <div className="font-bold text-black text-lg ">
            Lab reports to be sent (5)
          </div>
          <div className="mt-5">
            <Reports></Reports>
            <Reports></Reports>
            <Reports></Reports>
            <Reports></Reports>
          </div>
        </div>
      </div>
      <div className="h-72 ml-1 p-5 rounded-md mt-5 shadow">
        <div className="font-bold text-black text-lg ">Appointment Queue</div>
        <div className="mt-5">
          <AppointmentQueue />
          <AppointmentQueue />
          <AppointmentQueue />
          <AppointmentQueue />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
