import Entry from "../models/DataModel.js";
import mongoose  from "mongoose";

export const getData = async(req,res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
    updateCount=0
    addCount=0
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
export const addData = async(req, res) => {
    try {
        const { data } = req.body;
        if (!data) return res.status(400).send('Data is required');
        await Entry.create({ data });
        addCount++
        res.status(201).send('Data added successfully');
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
}

export const updateData = async(req,res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }

    // Check if the entry exists
    const entry = await Entry.findByIdAndUpdate(id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Update the entry
    entry.data = data;
    await entry.save();

    updateCount++;

    res.json({ message: 'Data updated successfully', updateCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
let addCount = 0;
let updateCount = 0;
export const countApi = async(req,res) => {
    res.json({ addCount, updateCount });
}