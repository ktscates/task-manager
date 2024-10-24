import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa6";
import logo from "../logo.svg";

const TaskCard = () => {
  return (
    <div className="bg-white p-5 mt-5 w-80 rounded-2xl shadow-sm flex flex-col gap-5">
      <div className="bg-gray rounded-2xl">
        <img className="object-cover" src={logo} alt="logo" />
      </div>
      <div className="flex justify-between items-center">
        <h6 className="text-todo-text bg-todo-bg px-4 py-1.5 rounded-lg font-semibold text-base">
          To do
        </h6>
        <BsThreeDotsVertical className="text-gray" size={24} />
      </div>
      <div className="flex flex-col gap-1 text-2xl font-extrabold text-black">
        Footer Design{" "}
        <span className="text-gray text-lg font-normal">Landing Page UI</span>
      </div>
      <div className="flex justify-between items-center border-t-2 border-backAuth pt-4">
        <img
          className="rounded-full bg-gray w-8 h-8 object-cover"
          src={logo}
          alt="logo"
        />
        <span className="flex items-center gap-2 text-gray text-lg font-semibold">
          <FaRegCommentDots size={24} /> 3
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
