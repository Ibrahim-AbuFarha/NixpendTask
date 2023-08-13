import React, { useState } from "react";
import Modal from "../../common/Modal";
import TaskDetails from "./TaskDetails";
function Task({ task }) {
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => setIsShow(!isShow);
  const completed = task.subTaskList.filter((item) => item.completed === true);
  return (
    <>
      <div
        key={task._id}
        className=" bg-[#2c2c38] p-5 mb-4 rounded-lg cursor-pointer "
        onClick={() => setIsShow(!isShow)}
      >
        <p className="text-white mb-2 text-lg">{task.title}</p>
        <p className="text-gray-400">
          {completed.length} of {task.subTaskList.length} subtasks
        </p>
      </div>

      {isShow && (
        <Modal onClose={handleShow}>
          <TaskDetails
            onClose={handleShow}
            task={task}
            completed={completed}
          ></TaskDetails>
        </Modal>
      )}
    </>
  );
}

export default Task;
