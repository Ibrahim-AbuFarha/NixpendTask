const Task = require('./../models/taskModel');
const Column = require('./../models/columnModel');
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.status(200).json({
      status: 'success',
      tasks,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.getOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('subTaskList.subTaskId');
    console.log(task);
    if (!task) throw new Error('No task found with that Id');
    res.status(200).json({
      status: 'success',
      task,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.AddTask = async (req, res) => {
  try {
    //check if the column exist
    const { columnId: id } = req.body;
    console.log(req.body);
    const column = await Column.findById(id);

    if (!column) throw new Error('column id is not found');
    //if the task exist then add subtask for it
    const task = await Task.create(req.body);
    //
    column.taskList.push(task._id);
    await column.save();
    res.status(201).json({
      status: 'success',
      task,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { columnId, title, desc, subTaskList } = req.body;
    const newColumn = await Column.findById(columnId);
    if (!newColumn) throw new Error('No column found with that Id');

    const task = await Task.findById(id);
    if (!task) throw new Error('No task found with that Id');

    let oldColumn = await Column.findById(task.columnId);
    oldColumn.taskList = oldColumn.taskList.filter(
      (item) => item._id.toString() !== task._id.toString()
    );
    await oldColumn.save();
    //update task
    task.title = title;
    task.desc = desc;
    task.columnId = columnId;
    task.subTaskList = subTaskList;
    await task.save();
    newColumn.taskList.push(task);
    await newColumn.save();
    res.status(201).json({
      status: 'success',
      task,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.editSubTask = async (req, res) => {
  try {
    const { id, subTaskId } = req.params;
    //check if the task is exist
    const task = await Task.findById(id);
    if (!task) throw new Error('There is no task with that id ');
    const { subTaskList } = task;
    //find the subtask to change its status
    const subTask = subTaskList.find(
      (item) => item._id.toString() === subTaskId
    );
    //toggle to change the progress of subtask
    subTask.completed = !subTask.completed;
    //save it to mongodb
    await task.save();
    res.status(201).json({
      status: 'success',
      task,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new Error('No task found with that Id');
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
