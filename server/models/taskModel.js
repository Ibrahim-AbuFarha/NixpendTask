const mongoose = require('mongoose');
const subTaskSchema = new mongoose.Schema({
  content: { type: String },
  completed: {
    type: Boolean,
    default: false,
  },
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please provide A title'] },
  desc: { type: String, required: [true, 'Please provide A title'] },
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: [true, 'Please provide a columnId'],
  },
  subTaskList: [subTaskSchema],

  createdAt: {
    type: String,
    default: new Date().toUTCString(),
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
