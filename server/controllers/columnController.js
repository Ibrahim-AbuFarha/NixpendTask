const Column = require('./../models/columnModel');
exports.getAllColumns = async (req, res) => {
  try {
    const columns = await Column.find().populate({ path: 'taskList' }).exec();

    res.status(200).json({
      status: 'success',
      columns,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.AddColumn = async (req, res) => {
  try {
    console.log(req.body);
    const column = await Column.create(req.body);
    res.status(201).json({
      status: 'success',
      column,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.deleteColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const column = await Column.findByIdAndDelete(id);
    if (!column) throw new Error('No column found with that Id');

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
