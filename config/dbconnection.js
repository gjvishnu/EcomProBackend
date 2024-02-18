const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose.connect(process.env.DBlocal);

  const db = mongoose.connection;

  db.on("error", () => {
    console.log("database connection error :(");
  });
  db.once("open", () => {
    console.log("database connected..!");
  });
  db.on("disconnected", () => {
    console.log("Database connection lost. Reconnecting...");
   });
   
}; 
  
module.exports = dbConnection;
 