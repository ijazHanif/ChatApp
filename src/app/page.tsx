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
  meMessage?: boolean;
}


interface User {
  img: StaticImageData;
  name: string;
  lastMessage: string;
  lastSeen: string;
  unreadCount: number;
  messages?: Message[];
}


const users: User[] = [
  {
    img: Ellipse,
    name: "Ahmad",
    lastMessage: "Hello!",
    lastSeen: "2 min ago",
    unreadCount: 3,
    messages: [
      { content: "Hi, Ahmad!", sender: "You", timestamp: "10:30 AM", meMessage: true },
      { content: "Hello! How are you?", sender: "Ahmad", timestamp: "10:32 AM", meMessage: false },
      { content: "I'm good, thanks for asking!", sender: "You", timestamp: "10:34 AM", meMessage: true },
    ],
  },
  {
    img: billgate,
    name: "Bill Gates",
    lastMessage: "when you are going",
    lastSeen: "2 min ago",
    unreadCount: 4,
    messages: [
      { content: "Hey Bill!", sender: "You", timestamp: "11:00 AM", meMessage: true },
      { content: "When are you leaving?", sender: "Bill Gates", timestamp: "11:05 AM", meMessage: false },
    ],
  },
  {
    img: boy,
    name: "John",
    lastMessage: "Good morning",
    lastSeen: "2 min ago",
    unreadCount: 1,
    messages: [
      { content: "Good morning, John!", sender: "You", timestamp: "8:00 AM", meMessage: true },
      { content: "Good morning, how are you?", sender: "John", timestamp: "8:05 AM", meMessage: false },
    ],
  },
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
      [user.name]: [
        ...(prevMessages[user.name] || []),
        { ...newMessage, meMessage: true }, 
      ],
    }));
  };

  return (
    <div className="flex h-screen p-2 bg-[#e2e5e9] space-x-6">
      <Sidebar users={users} onUserClick={handleUserClick} />
      {selectedUser ? (
  <Chat
    user={selectedUser}
    // messages={[...selectedUser.messages, ...(userMessages[selectedUser.name] || [])]} 
    messages={[...(selectedUser.messages || []), ...(userMessages[selectedUser.name] || [])]}

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
