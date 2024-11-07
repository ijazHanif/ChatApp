'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Ellipse from "@/images/Ellipse 1.png";
import Home from "@/images/Home.png";
import chat from "@/images/chat.png";
import notification from "@/images/notification.png";
import setting from "@/images/setting.png";
import Group from "@/images/Group.png";
import check from "@/images/check.png";
import { StaticImageData } from "next/image";


interface User {
  img: StaticImageData;
  name: string;
  lastMessage: string;
  lastSeen: string;
  unreadCount: number;
}

interface SidebarProps {
  users: User[];
  onUserClick: (user: User) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users, onUserClick }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (searchQuery === "") { 
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(user =>user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, users]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    onUserClick(user);
  };

  return (
    <div className="flex space-x-2">
       {/* Left part of sidebar */}
       <div>
         <div className="bg-[#6E00FF] flex flex-col justify-between items-center p-4 rounded-2xl h-full">
           <div>
             <Image
              src={Ellipse}
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="space-y-10">
            <Image
              src={Home}
              alt="Home"
              width={30}
              height={30}
              className="rounded-full"
            />
            <Image
              src={chat}
              alt="Chat"
              width={30}
              height={30}
              className="rounded-full"
            />
            <Image
              src={notification}
              alt="Notification"
              width={30}
              height={30}
              className="rounded-full"
            />
            <Image
              src={setting}
              alt="Settings"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
          <div>
            <Image
              src={Group}
              alt="Group"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 space-y-2 h-full text-black">
        {/* Search bar */}
         <div className="relative p-2">
          <input
            type="search"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 pl-8 rounded-xl shadow-2xl border text-black outline-gray-200 w-full"
          />
          <svg
            className="absolute left-4 top-5 w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 4a6 6 0 100 12 6 6 0 000-12zm4.586 10.586l4.828 4.828m-4.828-4.828l-4.828-4.828"
            />
          </svg>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto rounded-lg shadow-2xl p-4 space-y-1 bg-white ">
          <h1 className="font-semibold">People</h1>
          <div>

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className={`flex justify-between items-center space-x-12 border-b border-gray-300 pb-1 cursor-pointer ${
                  selectedUser === user ? "bg-blue-100 rounded-lg" : ""
                }`}
                onClick={() => handleUserClick(user)}
              >
                <div className="flex gap-3">
                  <Image src={user.img} alt={user.name} width={35} height={35} className="rounded-full" />
                  <div>
                    <h1 className="text-sm">{user.name}</h1>
                    <p className="text-[10px] text-[#5F83A3]">{user.lastMessage}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[#5F83A3] text-[12px] pt-4">{user.lastSeen}</p>
                  <span className={`text-white bg-orange-500 text-center rounded-full px-[5px] py-[1px]`}>
                    {user.unreadCount > 0 ? user.unreadCount : ""}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">User not found</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;