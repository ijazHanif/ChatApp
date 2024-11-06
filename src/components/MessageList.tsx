import React from 'react';

const messages = [
  { id: 1, text: "Hey There!", sender: "other", timestamp: "Today, 8:30pm" },
  { id: 2, text: "How are you?", sender: "other", timestamp: "Today, 8:31pm" },
  { id: 3, text: "Hello!", sender: "me", timestamp: "Today, 8:32pm" },
  { id: 4, text: "I am fine and how are you?", sender: "me", timestamp: "Today, 8:33pm" }
];

const MessageList = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
          <div className={`p-2 rounded-lg max-w-xs ${message.sender === "me" ? "bg-purple-500 text-white" : "bg-gray-200 text-black"}`}>
            <p>{message.text}</p>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
