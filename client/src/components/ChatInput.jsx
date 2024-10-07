import React,{useState} from 'react';
import { FiSend } from 'react-icons/fi'; // Send icon
import { BsEmojiSmile } from 'react-icons/bs'; // Emoji icon


function ChatInput({socket,roomId}) {
  const username = localStorage.getItem('username');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([])
  const [recipient,setRecipient] = useState('');
  socket.on('room-users', (existingUsers) => {
    setUsers(existingUsers);
  });
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {

      if (recipient) {
        
        socket.emit('send-private-message', { message, username, recipient, roomId });
      } else {
        // Emit public message
        socket.emit('send-message', { message, username, roomId });
      }

      setMessage(''); // Optionally clear the input after sending the message
    }
  };
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div >
        <form onSubmit={sendMessage} className="flex items-center space-x-3">

        {/* Select recipient for private message */}
        <select
            className="p-2 border border-gray-300 rounded-md"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          >
            <option value="">Public (Everyone)</option>
            {users.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />


        {/* Send Button */}
        <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-lg" type='submit'>
          <FiSend className="h-6 w-6" />
        </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
