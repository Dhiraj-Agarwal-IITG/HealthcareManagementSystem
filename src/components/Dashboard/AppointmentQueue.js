import React from "react";

const AppointmentQueue = () => {
  return (
    <div className="flex gap-8 font-normal text-black justify-between p-3 mb-1 shadow transition-all ease-in-out cursor-pointer hover:shadow-xl">
      <div className="flex gap-2">
        <div>Token:</div>
        <div>15</div>
      </div>

      {/*  */}

      <div className="flex gap-2">
        <div>ID:</div>
        <div>222123023</div>
      </div>

      {/*  */}

      <div className="flex gap-2">
        <div>Name:</div>
        <div>Harsh Pandey</div>
      </div>

      {/*  */}

      <div className="flex gap-2">
        <div>Doctor:</div>
        <div>Richard Ray</div>
      </div>

      {/*  */}

      <div className="flex gap-2">
        <div>Status:</div>
        <div className="bg-teal-200 text-center w-16 rounded-lg">In</div>
      </div>

      {/*  */}
    </div>
  );
};

export default AppointmentQueue;
