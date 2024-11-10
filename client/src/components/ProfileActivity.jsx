import axios from 'axios';
import React, { useEffect, useState } from 'react'



export default function ProfileActivity() {
    const [activity, setactivity] = useState([]);
    const [error, setError] = useState('');
    const API_URL = import.meta.env.REACT_APP_API_URL;
  
    // Fetch activitys on component mount
    useEffect(() => {
      const fetchactivitys = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/activity/get`, {
            withCredentials: true,
          });
          setactivity(response.data.activities); // assuming response.data.posts is the array of activitys
        } catch (err) {
          setError('Failed to retrieve activitys');
          console.error('Error fetching activitys:', err);
        }
      };
  
      fetchactivitys();
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
              <th scope="col">Activity</th>
              <th scope="col">Log</th>
              <th scope="col">Timestamps</th>
              
            </tr>
          </thead>
          <tbody>
            {activity.map((activity, index) => (
              <tr key={activity._id}>
                <th scope="row">{index + 1}</th>
                <td>{activity.activity_type}</td>
                <td>{activity.description}</td>
                <td>{new Date(activity.createdAt).toLocaleString()}</td>
              
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}
