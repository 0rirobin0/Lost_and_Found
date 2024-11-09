import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilePost() {
  const [Item, setItem] = useState([]);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.REACT_APP_API_URL;

  // Fetch items on component mount
  useEffect(() => {
    const fetchitems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/post/mine`, {
          withCredentials: true,
        });
        setItem(response.data.item); // assuming response.data.posts is the array of items
      } catch (err) {
        setError('Failed to retrieve items');
        console.error('Error fetching items:', err);
      }
    };

    fetchitems();
  }, []);

  return (
    <div className="container-lg  h-25% p-3 overflow-auto">
      {error && <div className="alert alert-danger">{error}</div>}
      <table
        className="table"
        style={{
          minHeight: '20vh',
          height: '25%',
          overflowY: 'scroll',
        }}
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item Name</th>
            <th scope="col">Division</th>
            <th scope="col">Location</th>
            <th scope="col">Found Date & Time</th>
            <th scope="col">User ID</th>
            <th scope="col">Reward Amount</th>
          </tr>
        </thead>
        <tbody>
          {Item.map((itm, index) => (
            <tr key={itm._id}>
              <th scope="row">{index + 1}</th>
              <td>{itm.itemName}</td>
              <td>{itm.district}</td>
              <td>{itm.location}</td>
              <td>{new Date(itm.foundDateTime).toLocaleString()}</td>
              <td>{itm.userId}</td>
              <td>{itm.rewardAmount ? `$${itm.rewardAmount}` : 'N/A'}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
