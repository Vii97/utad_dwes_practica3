const mongoose = require("mongoose")
const DB_URI = process.env.DB_URI

const connectToMongoDB = () => {
    // Inicializo la conexión
    console.log("[MongoDB Controller] Initializing the database connection...");
    mongoose.set("strictQuery", false);
    try{
      mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("[MongoDB Controller] Database connection successfully initialized.");
    }
    catch(err){
      console.log("[MongoDB Controller] Failed to establish a connection to the database, error:\n" + err);
  
    }
  }

  module.exports = connectToMongoDB