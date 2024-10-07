import React, { useEffect, useState, useRef } from 'react';
import ChatInput from '../components/ChatInput';
import { useParams, useNavigate } from 'react-router-dom';

function Chat({ socket }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const joinedRef = useRef(false); // Track if user has joined

  useEffect(() => {
    const storedRoomId = localStorage.getItem('roomId');
    const storedUsername = localStorage.getItem('username');

    // Verify if roomId matches and username exists
    if (!storedUsername || storedRoomId !== id) {
      alert('Room ID or username mismatch!');
      navigate('/'); // Redirect if there's a mismatch
      return; // Early exit if mismatch
    }

    // Check if roomId and username exist in localStorage
    if (storedRoomId && storedUsername && !joinedRef.current) {
      socket.emit('join-room', storedUsername, storedRoomId);
      joinedRef.current = true; // Set the ref to true to prevent re-joining
    }

    socket.on('user-joined', (username) => {
      // Only add user if they are not already in the users array
      if (!users.includes(username) && username !== storedUsername) {
        setUsers((prevUsers) => [...prevUsers, username]);
      }
    });

    socket.on('room-users', (existingUsers) => {
      setUsers(existingUsers);
    });

    return () => {
      socket.off('user-joined');
      socket.off('room-users');
    };
  }, [id, navigate, socket, users]); // Make sure to include users here for the logic to work

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with active users */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">Active Users</h2>
        <ul>
          {users.map((user, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              <span>{user}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
          {/* Placeholder for future chat messages */}
        </div>

        {/* Chat Input */}
        <ChatInput socket={socket} /> 
      </div>
    </div>
  );
}

export default Chat;
