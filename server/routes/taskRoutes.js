const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  AddTask,
  getOneTask,
  editTask,
  editSubTask,
  deleteTask,
} = require('./../controllers/taskController');

router.route('/').get(getAllTasks).post(AddTask);
router.route('/:id').get(getOneTask).patch(editTask).delete(deleteTask);
router.route('/:id/subTask/:subTaskId').patch(editSubTask);

module.exports = router;
