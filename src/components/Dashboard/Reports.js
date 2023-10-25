import React from "react";

const Reports = () => {
  return (
    <div className="flex gap-8 font-normal text-black justify-between mb-1 shadow transition-all ease-in-out cursor-pointer hover:shadow-xl p-3">
      <div>R1254</div>
      <div>Lungs X-ray</div>
      <div>X-ray.pdf</div>
      <div>John Ray</div>
      <div className="rounded-xl bg-green-500 cursor-pointer w-1/12 text-center">
        <button className="text-white p-1">Share</button>
      </div>
    </div>
  );
};

export default Reports;
