import React, { useState, useContext } from "react";
import ColumnContext from "../../../store/context";
function AddTaskForm({ onClose }) {
  const { addTask, columnsOption } = useContext(ColumnContext);
  const [newTask, setNewTask] = useState({});
  const [subTaskList, setSubTaskList] = useState([]);

  const handleChangeSubTask = (e) => {
    const updatedSubTask = [...subTaskList];
    updatedSubTask[e.target.id] = { content: e.target.value };
    setSubTaskList(updatedSubTask);
  };
  const handleAddSubTask = (e) => {
    e.preventDefault();
    setSubTaskList([...subTaskList, { content: "" }]);
  };
  const handleDeleteSubTask = (subtaskIndx) => {
    setSubTaskList((prev) => prev.filter((item, indx) => indx !== subtaskIndx));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const columnId = newTask.columnId || columnsOption[0].id;
    addTask({ ...newTask, subTaskList, columnId });
    onClose();
  };
  let disabled =
    newTask.title &&
    newTask.desc &&
    subTaskList.every((subTask) => subTask.content !== "")
      ? false
      : true;

  return (
    <form
      className="px-5 max-h-[600px] overflow-y-scroll"
      onSubmit={handleSubmit}
    >
      <h2 className="text-white text-2xl mb-4">Add New Task</h2>
      <div className="flex flex-col mb-3">
        <label className="text-white mb-3">Title</label>
        <input
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="py-2 flex item-center justify-center pl-2 border-2 border-gray-700 text-white bg-[#2c2c38]"
          type="text"
          placeholder="e.g. Take coffee break"
        />
      </div>

      <div className="flex flex-col mb-3">
        <label className="text-white mb-3">Description</label>
        <textarea
          onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
          className="py-2 pl-2 border-2 border-gray-700 text-white bg-[#2c2c38] h-28 resize-none"
          type="text"
          placeholder="e.g. It's always good to take a break .This 15 minute break will charge the batteries a little "
        />
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-white mb-3">Subtasks</label>
        {subTaskList.map((subTask, index) => {
          return (
            <div className="flex gap-2" key={index}>
              <input
                id={index}
                onChange={handleChangeSubTask}
                className="py-2 pl-2 border-2 w-full text-white border-gray-700 mb-3 bg-[#2c2c38]"
                type="text"
                placeholder="e.g. Make coffee "
              />

              <i
                onClick={() => handleDeleteSubTask(index)}
                className="fa-solid fa-xmark text-xl  cursor-pointer text-[#56566c] hover:text-red-500"
              ></i>
            </div>
          );
        })}
      </div>
      {subTaskList.length < 4 && (
        <button
          onClick={handleAddSubTask}
          className="flex justify-center items-center mb-4 text-[#645fc5] hover:bg-opacity-90  bg-white w-full py-2  rounded-full"
        >
          +Add New Subtask
        </button>
      )}
      <div className="flex flex-col mb-3">
        <label className="text-white mb-3">State</label>
        <select
          onChange={(e) => {
            setNewTask({ ...newTask, columnId: e.target.value });
          }}
          className="py-1 pr-2 border-2 border-gray-700 text-[#645fc5] cursor-pointer  bg-[#2c2c38]"
        >
          {columnsOption.map((option) => {
            return (
              <option id={option.id} key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
      <button
        disabled={disabled}
        className="flex justify-center items-center mb-6 text-[white] bg-[#645fc5] hover:bg-opacity-80  w-full py-2  rounded-full"
      >
        Create Task
      </button>
    </form>
  );
}

export default AddTaskForm;
