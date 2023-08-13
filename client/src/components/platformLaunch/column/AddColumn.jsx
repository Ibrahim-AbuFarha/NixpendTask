import React from "react";
import ColumnContext from "../../../store/context";
import { useState, useContext } from "react";
function AddColumn({ onClose }) {
  const [newColumn, setNewColumn] = useState({});
  const { addColumn } = useContext(ColumnContext);
  const handleClick = () => {
    addColumn(newColumn);
    onClose();
  };
  const handleOnChange = (e) => {
    setNewColumn({ ...newColumn, name: e.target.value });
  };
  return (
    <div className="flex items-center gap-3">
      <input
        className="py-2 pl-2 border-2 w-full text-white border-gray-700 mb-3 bg-[#2c2c38]"
        type="text"
        placeholder="Enter your List name"
        onChange={handleOnChange}
      />
      <button
        className="flex justify-center items-center mb-4 text-white bg-[#645fc5] w-[200px] hover:bg-opacity-80 py-2 rounded-full"
        onClick={handleClick}
      >
        Add Column
      </button>
    </div>
  );
}

export default AddColumn;
