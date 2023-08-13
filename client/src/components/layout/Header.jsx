import React, { useState } from "react";
import Modal from "../common/Modal";
import AddTaskForm from "../platformLaunch/task/AddTaskForm";
function Header() {
  const [isShow, setIsShow] = useState(false);
  const handleClose = () => {
    setIsShow(!isShow);
  };
  return (
    <>
      <div className="bg-[#2c2c38] flex flex-1 justify-between items-center px-6 w-full h-24 border-b-2 border-gray-700">
        <h2 className="text-white text-3xl font-bold">Platform Launch</h2>
        <div className="flex gap-3 items-center">
          <button
            className="bg-[#645fc5] hover:bg-opacity-80  font-bold flex justify-between items-center text-white px-8 py-2 rounded-full "
            onClick={() => setIsShow(!isShow)}
          >
            +<p className="max-sm:hidden ">Add New Task</p>
          </button>
          <i className="fa-solid fa-ellipsis-vertical text-gray-400 text-2xl"></i>
        </div>
      </div>
      {isShow && (
        <Modal onClose={handleClose}>
          <AddTaskForm onClose={handleClose} />
        </Modal>
      )}
    </>
  );
}

export default Header;
