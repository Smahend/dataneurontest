import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

 const connection = async () => {
    const URL_DB = process.env.DB_URL || "mongodb://localhost:27017/data_neuron";
    try{
      await mongoose.connect(URL_DB,{ useUnifiedTopology: true, useNewUrlParser: true })
      console.log("Database is connected successfully ");
    }
    catch(error){
        console.error('Db Error: ', error.message);
    }
}
export default connection;