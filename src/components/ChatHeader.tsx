import React from 'react';

const ChatHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-300">
      <div>
        <h2 className="font-semibold">Anil</h2>
        <p className="text-xs text-gray-500">Online - Last seen 2:02pm</p>
      </div>
      <div className="flex space-x-4">
        <button>📞</button>
        <button>📹</button>
        <button>⋮</button>
      </div>
    </header>
  );
};

export default ChatHeader;
