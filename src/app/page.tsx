"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";
import { StaticImageData } from "next/image";
import Ellipse from "@/images/Ellipse 1.png";
import billgate from "@/images/billGates.png";
import boy from "@/images/boy.png";


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

const page: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="flex h-screen p-2 bg-[#e2e5e9] space-x-6">
      <Sidebar users={users} onUserClick={setSelectedUser} />
      {selectedUser ? (
        <Chat user={selectedUser} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a user to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default page;


















// const page = () => {
//   interface User {
//     img: StaticImageData;
//     name: string;
//     lastMessage: string;
//     lastSeen: string;
//     unreadCount: number;
//   }

//   const [users, setUsers] = useState<User[]>([
//     {
//       img: Ellipse,
//       name: "Ahmad",
//       lastMessage: "how are you",
//       lastSeen: "Today 11:00 pm",
//       unreadCount: 1,
//     },
//     {
//       img: Ellipse,
//       name: "Ali",
//       lastMessage: "Good morning",
//       lastSeen: "Today 9:00 pm",
//       unreadCount: 1,
//     },
//     {
//       img: Ellipse,
//       name: "Hussain",
//       lastMessage: "Hi",
//       lastSeen: "Today 7:17 am",
//       unreadCount: 2,
//     },
//   ]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

  
//   const handleUserSelect = (user: User) => {
//     setSelectedUser(user);
//   };
//   return (
//     <div className="flex">
//       <Sidebar users={users} onUserSelect={handleUserSelect} />
//       {selectedUser && <Chat user={selectedUser} />}{" "}
//     </div>
//   );
// };

// export default page;


// App.tsx


