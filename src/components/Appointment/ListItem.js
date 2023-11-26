import dayjs from "dayjs";
import React from "react";

const ListItem = (props) => {
  const { value } = props;
  let slotPairs = {
    slot8to10: "8 A.M. to 10 A.M.",
    slot10to12: "10 A.M. to 12 P.M.",
    slot12to2: "12 P.M. to 2 P.M.",
    slot2to4: "2 P.M. to 4 P.M.",
    slot4to6: "4 P.M. to 6 P.M."
  };
  return (
    <div className="w-full shadow-xl p-5 rounded-lg">
      {/* <div>
        <span className="text-lg font-medium">Patient Name </span>
        {value.patient.firstName + " " + value.patient.lastName}
      </div> */}
      <div>
        <span className="text-lg font-medium">Doctor Name </span>
        {value.doctor?.firstname + " " + value.doctor?.lastname}
      </div>
      <div>
        <span className="text-lg font-medium">Patient Id: </span>
        {value.patient?.rollno}
      </div>
      <div>
        <span className="text-lg font-medium">Preferred slot: </span>{slotPairs[value.slot]}
      </div>
      <div>
        <span className="text-lg font-medium">Date of Appointment: </span>{dayjs(value.dateOfAppointment).format('D MMM YYYY')}
      </div>
      <div>
        <span className="text-lg font-medium">Department: </span>
        {value.department ?? "Not specified"}
      </div>
      <div>
        <span className="text-lg font-medium">Reason: </span>
        {value.symptoms}
      </div>
      <div>
        <span className="text-lg font-medium">Token: </span>
        {value.token_no}
      </div>
    </div>
  );
};

export default ListItem;
