import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUpdateForm from './components/AddUpdateForm';

function App() {
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  const fetchCount = async () => {
    try {
      const res = await axios.get('/count');
      setAddCount(res.data.addCount);
      setUpdateCount(res.data.updateCount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="container-fluid">
      <h1 className='navbar navbar-light bg-light'>MERN Stack Task</h1>
      <AddUpdateForm fetchCount={fetchCount} />
      <div className='border m-2'>
        <p className='m-2'>Add Count: {addCount}</p>
        <p className='m-2'>Update Count: {updateCount}</p>
      </div>
    </div>
  );
}

export default App;