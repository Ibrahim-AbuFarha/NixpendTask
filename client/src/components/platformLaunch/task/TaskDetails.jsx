import React, { useState, useContext } from "react";
import ColumnContext from "../../../store/context";
import Modal from "../../common/Modal";
import EditTaskForm from "./EditTaskForm";
function TaskDetails({ task, onClose, completed }) {
  const { editSubTask, columnsOption, deleteTask, editTask } =
    useContext(ColumnContext);
  const [isShow, setIsShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleOnclick = () => {
    deleteTask(task._id, task.columnId);
    onClose();
  };
  const handleOnChange = (e) => {
    const subTaskId = e.target.id;
    editSubTask(task._id, subTaskId);
  };
  const handleChangeStatus = (e) => {
    console.log(e.target.value);
    editTask(task._id, task.columnId, { ...task, columnId: e.target.value });
  };
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <p className="text-white text-2xl mb-4">{task.title}</p>
          <div className="relative">
            <button className="p-2" onClick={() => setIsShow(!isShow)}>
              <i className="fa-solid fa-ellipsis-vertical text-gray-400 text-2xl"></i>
            </button>
            {isShow && (
              <div className="bg-[#20212c] rounded-lg p-4 w-32 h-20 absolute right-3 top-8">
                <div>
                  <button
                    onClick={() => setIsEdit(true)}
                    className="text-gray-400 hover:text-gray-500 mb-1"
                  >
                    Edit Task
                  </button>
                </div>
                <button
                  onClick={handleOnclick}
                  className="text-red-400 hover:text-red-500"
                >
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-500 mb-4">{task.desc}</p>
        <div className="flex flex-col mb-3">
          <label className="text-white mb-3">
            Subtasks ({completed.length} of {task.subTaskList.length})
          </label>
          {task.subTaskList.map((subTask) => {
            return (
              <div
                key={subTask._id}
                className="bg-[#21212d] flex items-center gap-4 text-white p-3 mb-3"
              >
                {subTask.completed ? (
                  <input
                    className="w-5 h-5 text-#2c2c38 checked:bg-[#645fc5]  "
                    type="checkbox"
                    id={subTask._id}
                    onChange={handleOnChange}
                    checked
                  />
                ) : (
                  <input
                    className="w-5 h-5 text-#2c2c38 checked:bg-[#645fc5] "
                    type="checkbox"
                    id={subTask._id}
                    onChange={handleOnChange}
                    checked={false}
                  />
                )}
                <label
                  className={`${
                    subTask.completed ? "opacity-50 line-through" : ""
                  }`}
                >
                  {subTask.content}
                </label>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-white mb-3">Status</label>
          <select
            onChange={handleChangeStatus}
            className="py-1 pr-2 border-2 border-gray-700 text-[#645fc5]  bg-[#2c2c38]"
          >
            {columnsOption.map((option) => {
              return option.id === task.columnId ? (
                <option
                  selected
                  id={option.id}
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </option>
              ) : (
                <option id={option.id} key={option.id} value={option.id}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {isEdit && (
        <Modal>
          <EditTaskForm task={task} onClose={onClose} />
        </Modal>
      )}
    </>
  );
}

export default TaskDetails;
