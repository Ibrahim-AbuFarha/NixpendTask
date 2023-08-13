import React from "react";
import Task from "../task/Task";
import { useContext } from "react";
import ColumnContext from "../../../store/context";
function Column({ col }) {
  const { deleteColumn } = useContext(ColumnContext);
  const handleDeleteColumn = () => {
    deleteColumn(col._id);
  };

  const colors = {
    todo: "#41c5e2",
    doing: "#645fc5",
    done: "#67e2ae",
  };
  const color = colors[col.name.toLowerCase()] || "#F39C12";
  return (
    <div className="w-[350px]  shrink-0">
      <div className="flex items-center gap-20 mb-5">
        <p className="flex items-center gap-3 font-bold">
          <span
            style={{ background: color }}
            className=" w-4 h-4 block rounded-full"
          ></span>
          {col.name} ({col.taskList.length})
        </p>
        <button className="text-[#56566c] hover:text-red-500">
          <i
            onClick={handleDeleteColumn}
            className="fa-solid fa-xmark text-2xl   "
          ></i>
        </button>
      </div>
      <div>
        {col.taskList.map((task) => {
          return <Task key={task._id} task={task} />;
        })}
      </div>
    </div>
  );
}

export default Column;
