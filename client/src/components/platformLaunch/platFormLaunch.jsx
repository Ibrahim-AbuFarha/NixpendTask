import React, { useEffect, useContext, useState } from "react";
import Column from "./column/Column";
import Modal from "../common/Modal";
import AddColumn from "./column/AddColumn";
import ColumnContext from "../../store/context";
function platFormLaunch() {
  const [isShow, setIsShow] = useState(false);
  const { getColumns, columns } = useContext(ColumnContext);

  useEffect(() => {
    getColumns();
  }, []);
  const handleClick = () => {
    setIsShow(!isShow);
  };
  return (
    //col
    <>
      <div className="pl-5 pt-5 h-screen  text-white flex  gap-4 ">
        {columns.map((col) => {
          return <Column key={col._id} col={col} />;
        })}
        <button
          onClick={handleClick}
          className=" shrink-0 bg-[#22252e] h-[500px] w-[300px] mt-10 rounded-lg text-[#6a7083] text-2xl flex items-center justify-center cursor-pointer hover:text-[#645fc5] font-bold "
        >
          +New Column
        </button>
      </div>

      {isShow && (
        <Modal onClose={handleClick}>
          <AddColumn onClose={handleClick}></AddColumn>
        </Modal>
      )}
    </>
  );
}

export default platFormLaunch;
