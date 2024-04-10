import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddUpdateForm = ({ fetchCount }) => {
  const [data, setData] = useState('');
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const handleAdd = async () => {
    try {
      await axios.post('/add', { data });
    //   setData('');
      setMessage('Data added successfully');
      fetchCount();
    } catch (err) {
      console.error(err);
      setMessage('error');

    }
  };
  const getData = async () => {
    try{
     const res = await axios.get(`/get`);
     setId(res.data[0]._id);
    }
    catch(error){
      console.log(error);
    }
  }
  const handleUpdate = async () => {
    try {
      await axios.put(`/update/${id}`, { data });
      // setId('');
      // setData('');
      setMessage('Data updated successfully');
      fetchCount();
    } catch (err) {
      console.error(err);
      setMessage('error');
    }
  };
useEffect(()=>{
  getData();
},[])
  return (
    <div>
      <input
      className="form-control mr-sm-2"
        type="text"
        placeholder="Enter data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button className='btn btn-primary m-2' onClick={handleAdd}>Add</button>
      <button className='btn btn-secondary m-2' onClick={handleUpdate}>Update</button>
      <p>{message}</p>
    </div>
  );
};

export default AddUpdateForm;