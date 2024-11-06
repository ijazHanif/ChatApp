'use client'
import React, { useState } from 'react';
import EmojiPicker from './EmojiPicker';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sendMessage = () => {
    console.log('Message sent:', message);
    setMessage('');
  };

  const addEmoji = (emoji:string) => {
    setMessage(message + emoji);
  };

  return (
    <div className="flex items-center p-4 border-t border-gray-300">
      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
      {showEmojiPicker && <EmojiPicker onSelect={addEmoji} />}
      <input
        type="text"
        className="flex-1 border rounded-lg p-2 mx-2"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="bg-purple-600 text-white px-4 py-2 rounded-lg">Send</button>
    </div>
  );
};

export default ChatInput;
