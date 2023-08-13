const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//get access to config file
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
//connect to database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });
const port = process.env.PORT || 5000;

//listing to server
const server = app.listen(port, () => {
  console.log(`server is listening for  ${port} `);
});
