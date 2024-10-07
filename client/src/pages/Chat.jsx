import React, { useEffect, useState, useRef } from 'react';
import ChatInput from '../components/ChatInput';
import { useParams, useNavigate } from 'react-router-dom';

function Chat({ socket }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]); // State for messages
  const messageAreaRef = useRef(null)
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
    socket.on('receive-message', (message, username) => {
      const newMessage = { username, message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off('user-joined');
      socket.off('room-users');
      socket.off('receive-message');
    };
  }, [id, navigate, socket, users]);
  useEffect(() => {
    // Scroll to the latest message whenever the messages state changes
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

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
      <div className='flex flex-col w-[100%]'>


        <div className="flex-1 overflow-y-auto mb-4 p-10" ref={messageAreaRef}>
          {messages.map((msg,index)=>{
              const isOutgoing = msg.username === localStorage.getItem('username');
              return(
                <div className={`flex mb-2 ${isOutgoing ? 'justify-end' : 'justify-start'}`}  key={index}>
                 <div
                  className={`p-2 rounded-lg max-w-xs ${
                    isOutgoing ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                  }`}
                >
                   <p>{msg.message}</p>
                  <p className={`font-bold ${isOutgoing ? 'text-white' : 'text-black'}`}>
                    - {msg.username}
                  </p>
                </div>
              </div>
              )
          })}
        
        </div>




        {/* Chat Input */}
        <ChatInput socket={socket} roomId={id} />
      </div>
    </div>

  );
}

export default Chat;
