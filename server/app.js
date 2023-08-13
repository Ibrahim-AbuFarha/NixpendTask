const express = require('express');
//make an instance from express to get all methods
const app = express();
//to get access to req.body
app.use(express.json());
//import cors to connect front with back
const cors = require('cors');
app.use(cors());
//import routes
const columnRouter = require('./routes/columnRoutes');
const taskRouter = require('./routes/taskRoutes');

//connect to routes
app.use('/api/v1/columns', columnRouter);
app.use('/api/v1/tasks', taskRouter);

//

module.exports = app;
