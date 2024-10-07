import React from 'react';
import { FiSend } from 'react-icons/fi'; // Send icon
import { BsEmojiSmile } from 'react-icons/bs'; // Emoji icon


function ChatInput() {
 
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
        />

        {/* Emoji Icon */}
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <BsEmojiSmile className="text-gray-500 h-6 w-6" />
        </button>

        {/* Send Button */}
        <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-lg">
          <FiSend className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
