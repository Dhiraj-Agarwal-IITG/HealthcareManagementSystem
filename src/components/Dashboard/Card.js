import React from "react";

const Card = (props) => {
  return (
    <div
      className={`shadow-md hover:shadow-xl ${props.title === "Token Number" ? "bg-blue-100" : "bg-white"} cursor-pointer w-96 transition-all ease-in-out p-8 rounded-lg`}
    >
      <div className="font-semibold text-sm gap-1">{props.title}</div>
      <div className={`mb-5 h-1 w-10 ${props.titleColor}`}></div>
      <div className=" mb-5 flex gap-2">
        {props.children}
        <div className=" font-semibold text-black text-3xl">{props.value}</div>
      </div>
    </div>
  );
};
export default Card;
