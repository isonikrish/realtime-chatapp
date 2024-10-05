import React from 'react';
import ChatInput from '../components/ChatInput';
function Chat() {
  // Hardcoded messages and user data
  const messages = [
    { id: 1, user: 'Alice', text: 'Hey, how are you?', time: '10:30 AM' },
    { id: 2, user: 'You', text: 'I’m good, how about you?', time: '10:32 AM' },
    { id: 3, user: 'Alice', text: 'Doing great, just working on a project.', time: '10:35 AM' },
    { id: 4, user: 'You', text: 'Nice! Let me know if you need help.', time: '10:36 AM' },
  ];

  const contacts = [
    { name: 'Alice', online: true },
    { name: 'Bob', online: false },
    { name: 'Charlie', online: true },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">Active Users</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              <span>{contact.name}</span>
              <span
                className={`h-3 w-3 rounded-full ${contact.online ? 'bg-green-500' : 'bg-gray-400'
                  }`}
              ></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">



        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.user === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${message.user === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
              >
                <p>{message.text}</p>
                <span className="text-xs text-black mt-2 block">{message.user}</span>
              </div>
            </div>
          ))}
        </div>


        <ChatInput />
      </div>
    </div>
  );
}

export default Chat;
