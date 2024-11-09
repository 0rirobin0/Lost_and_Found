import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function ProfileMessageBox() {

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.REACT_APP_API_URL;
  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/message/get`, {
        withCredentials:true,
        });
        setMessages(response.data.messages); // assuming response.data is the array of messages
      } catch (err) {
        setError('Failed to retrieve messages');
        console.error('Error fetching messages:', err);
      }
    };

    fetchMessages();
  }, []);

// console.log(messages);


  return (
    <div className="container-lg h-25% p-3 overflow-auto">
    <table className="table" style={{
      minHeight: '20vh',
      height: '25%',
      overflowY: 'scroll'
    }}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item Name</th>
          <th scope="col">Message</th>
          <th scope="col">Created At</th>
          <th scope="col">Claim/Found Status</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((msg, index) => (
          <tr key={msg._id}>
            <th scope="row">{index + 1}</th>
            <td>{msg.itemName}</td>
            <td>{msg.message}</td>
            <td>{new Date(msg.createdAt).toLocaleString()}</td>
            <td className='text-primary'>Accepted</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
