import { createContext, useEffect, useState } from "react";
import axios from "axios";

const ColumnContext = createContext();
export default ColumnContext;

export function ColumnProvider({ children }) {
  const [columns, setColumns] = useState([]);

  const getColumns = () => {
    try {
      axios.get(`http://127.0.0.1:5000/api/v1/columns`).then(({ data }) => {
        setColumns(data.columns);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addColumn = (col) => {
    try {
      axios
        .post(`http://127.0.0.1:5000/api/v1/columns`, { ...col })
        .then(({ data }) => {
          console.log(data);
          setColumns([...columns, data.column]);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteColumn = async (columnId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/v1/columns/${columnId}`);

      setColumns((prev) => prev.filter((col) => col._id !== columnId));
    } catch (error) {
      console.log(error);
    }
  };

  //to get columns names
  const columnsOption = columns.map((col) => ({ name: col.name, id: col._id }));

  const addTask = async (newTask) => {
    try {
      const { data } = await axios.post(`http://127.0.0.1:5000/api/v1/tasks`, {
        ...newTask,
      });

      const updatedColumns = [...columns];
      const column = updatedColumns.find(
        (col) => col._id === data.task.columnId
      );
      // column.taskList.push(data.task);
      column.taskList = [...column.taskList, data.task];

      setColumns([...updatedColumns]);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  const editTask = async (id, oldColId, task) => {
    try {
      const { data } = await axios.patch(
        `http://127.0.0.1:5000/api/v1/tasks/${id}`,
        { ...task }
      );
      console.log(data.task);
      const updatedColumns = [...columns];

      //old column
      const oldColumn = updatedColumns.findIndex((col) => col._id === oldColId);

      updatedColumns[oldColumn] = {
        ...updatedColumns[oldColumn],
        taskList: [
          ...updatedColumns[oldColumn].taskList.filter((item) => {
            return item._id !== data.task._id;
          }),
        ],
      };

      //new column
      const column = updatedColumns.findIndex(
        (col) => col._id === data.task.columnId
      );
      updatedColumns[column] = {
        ...updatedColumns[column],
        taskList: [...updatedColumns[column].taskList, data.task],
      };

      setColumns(updatedColumns);
    } catch (error) {
      console.log(error);
    }
  };

  const editSubTask = async (taskId, subTaskId) => {
    try {
      const { data } = await axios.patch(
        `http://127.0.0.1:5000/api/v1/tasks/${taskId}/subTask/${subTaskId}`
      );
      const updatedColumns = [...columns];
      const column = updatedColumns.findIndex(
        (col) => col._id === data.task.columnId
      );
      updatedColumns[column] = {
        ...updatedColumns[column],
        taskList: [
          ...updatedColumns[column].taskList.map((item) =>
            item._id === data.task._id ? data.task : item
          ),
        ],
      };
      setColumns(updatedColumns);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId, columnId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/v1/tasks/${taskId}`);
      const updatedColumns = [...columns];
      const column = updatedColumns.findIndex((col) => col._id === columnId);
      updatedColumns[column] = {
        ...updatedColumns[column],
        taskList: [
          ...updatedColumns[column].taskList.filter(
            (item) => item._id !== taskId
          ),
        ],
      };
      setColumns(updatedColumns);
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    getColumns,
    columns,
    columnsOption,
    addTask,
    editTask,
    editSubTask,
    deleteTask,
    addColumn,
    deleteColumn,
  };
  return (
    <ColumnContext.Provider value={value}>{children}</ColumnContext.Provider>
  );
}
