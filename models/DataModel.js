import mongoose from "mongoose";


const dataSchema = new mongoose.Schema({
  data: String,
});

const Entry = mongoose.model('Entry',dataSchema)


export default Entry