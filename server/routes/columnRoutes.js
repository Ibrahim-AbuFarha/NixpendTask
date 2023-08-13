const express = require('express');
const router = express.Router();
const {
  AddColumn,
  deleteColumn,
  getAllColumns,
} = require('../controllers/columnController');

router.route('/').get(getAllColumns).post(AddColumn);
router.route('/:id').delete(deleteColumn);
module.exports = router;
