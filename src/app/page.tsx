// Main Page Component
"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";
import { StaticImageData } from "next/image";
import Ellipse from "@/images/Ellipse 1.png";
import billgate from "@/images/billGates.png";
import boy from "@/images/boy.png";

interface Message {
  content: string;
  sender: string;
  timestamp: string;
}

interface User {
  img: StaticImageData;
  name: string;
  lastMessage: string;
  lastSeen: string;
  unreadCount: number;
}

const users: User[] = [
  {
    img: Ellipse,
    name: "Ahmad",
    lastMessage: "Hello!",
    lastSeen: "2 min ago",
    unreadCount: 3,
  },
  {
    img: billgate,
    name: "Bill Gates",
    lastMessage: "when you are going",
    lastSeen: "2 min ago",
    unreadCount: 4,
  },
  {
    img: boy,
    name: "jhon",
    lastMessage: "Good morning",
    lastSeen: "2 min ago",
    unreadCount: 1,
  }
];

const Page: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userMessages, setUserMessages] = useState<{ [key: string]: Message[] }>({});

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleSendMessage = (user: User, newMessage: Message) => {
    setUserMessages((prevMessages) => ({
      ...prevMessages,
      [user.name]: [...(prevMessages[user.name] || []), newMessage],
    }));
  };

  return (
    <div className="flex h-screen p-2 bg-[#e2e5e9] space-x-6">
      <Sidebar users={users} onUserClick={handleUserClick} />
      {selectedUser ? (
        <Chat 
          user={selectedUser} 
          messages={userMessages[selectedUser.name] || []}
          onSendMessage={(newMessage) => handleSendMessage(selectedUser, newMessage)}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a user to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default Page;
