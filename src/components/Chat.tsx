'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Ellipse from "@/images/Ellipse 1.png";
import { PaperClipIcon, FaceSmileIcon, CameraIcon } from "@heroicons/react/24/outline";
import socket from "@/utils/socket";


import { StaticImageData } from "next/image";

interface Message {
  content: string;
  sender: string;
  timestamp: string;
}

interface ChatProps {
  user: {
    img: StaticImageData;
    name: string;
    lastMessage: string;
    lastSeen: string;
    unreadCount: number;
  };
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage: Message = {
        content: inputValue,
        sender: "You",
        timestamp: new Date().toLocaleTimeString(),
      };

      socket.emit("message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div className="text-black shadow-xl bg-white rounded-xl border border-blue-200 p-6 flex flex-col justify-between flex-grow">
      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <Image src={user.img} alt={user.name} width={35} height={35} className="rounded-full" />
          <div>
            <h1>{user.name}</h1>
            <p className="text-[12px] text-[#5F83A3]">{user.lastMessage}</p>
          </div>
        </div>
        <div className="flex space-x-5 ">
           {/* Icons can be replaced with actual components */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#A855F7"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 9.665 7.835 17.5 17.5 17.5a2.25 2.25 0 002.25-2.25v-3.75a2.25 2.25 0 00-1.22-2.005L17.87 14.12a2.25 2.25 0 00-2.12-.25l-2.1.84a9.45 9.45 0 01-4.83-4.83l.84-2.1a2.25 2.25 0 00-.25-2.12L6.755 2.72A2.25 2.25 0 004.75 1.5H1a2.25 2.25 0 00-2.25 2.25z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#A855F7"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.75a1.25 1.25 0 011.25 1.25v8.25a1.25 1.25 0 01-1.25 1.25H6.75A1.25 1.25 0 015.5 20.25v-8.25a1.25 1.25 0 011.25-1.25h9zm1.2 5.55l3.8-3.8v9.6l-3.8-3.8z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#A855F7"
            width="24"
            height="24"
          >
            <circle cx="12" cy="6" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="18" r="1.5" />
          </svg>
        </div>


      </header>

      <main className="flex-1 overflow-y-auto mt-4 flex justify-end items-end">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div key={index} className="flex justify-start items-center">
              <div className="bg-gray-200 p-2 rounded-lg max-w-xs">
                <p>{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 ">{message.timestamp}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-4">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="p-2 pl-12 pr-24 rounded-full shadow-md border border-gray-300 text-black outline-none w-full"
          />
          <PaperClipIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
          <FaceSmileIcon className="absolute right-16 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <CameraIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </form>
      </footer>
    </div>
  );
};

export default Chat;
















// interface Message {
//   content: string;
//   sender: string;
//   timestamp: string;
// }
// interface ChatProps {
//   user: User;
// }


// const Chat: React.FC<ChatProps> = ({ user }) => {
//   const [messages, setMessages] = useState<Message[]>([]); 
//   const [inputValue, setInputValue] = useState<string>(""); 

//   useEffect(() => {
//     socket.on("message", (message: Message) => { 
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // Cleanup the socket connection on component unmount
//     return () => {
//       socket.off("message");
//     };
//   }, []);

//   const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => { 
//     e.preventDefault();
//     if (inputValue.trim()) {
//       const newMessage: Message = { 
//         content: inputValue,
//         sender: "You", 
//         timestamp: new Date().toLocaleTimeString(),
//       };

//       // Emit the message to the server
//       socket.emit("message", newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setInputValue(""); 
//     }
//   };

//   return (
//     <div className="text-black shadow-xl rounded-xl border border-blue-200 p-6 flex flex-col justify-between flex-grow">
//       <header className="flex space-x-52 items-center justify-between">
//         <div className="flex items-center space-x-5">
//           <div>
//             <Image
//               src={Ellipse}
//               alt="User"
//               width={35}
//               height={35}
//               className="rounded-full"
//             />
//           </div>
//           <div>
//             <h1>Anil</h1>
//             <p className="text-[12px] text-[#5F83A3]">
//               Online last-seen 2:0.2pm
//             </p>
//           </div>
//         </div>
//         <div className="flex space-x-5 ">
//           {/* Icons can be replaced with actual components */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="#A855F7"
//             width="24"
//             height="24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M2.25 6.75c0 9.665 7.835 17.5 17.5 17.5a2.25 2.25 0 002.25-2.25v-3.75a2.25 2.25 0 00-1.22-2.005L17.87 14.12a2.25 2.25 0 00-2.12-.25l-2.1.84a9.45 9.45 0 01-4.83-4.83l.84-2.1a2.25 2.25 0 00-.25-2.12L6.755 2.72A2.25 2.25 0 004.75 1.5H1a2.25 2.25 0 00-2.25 2.25z"
//             />
//           </svg>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="#A855F7"
//             width="24"
//             height="24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.75 10.75a1.25 1.25 0 011.25 1.25v8.25a1.25 1.25 0 01-1.25 1.25H6.75A1.25 1.25 0 015.5 20.25v-8.25a1.25 1.25 0 011.25-1.25h9zm1.2 5.55l3.8-3.8v9.6l-3.8-3.8z"
//             />
//           </svg>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="#A855F7"
//             width="24"
//             height="24"
//           >
//             <circle cx="12" cy="6" r="1.5" />
//             <circle cx="12" cy="12" r="1.5" />
//             <circle cx="12" cy="18" r="1.5" />
//           </svg>
//         </div>
//       </header>

//     {/* main message container */}
//       <main className="flex-1 overflow-y-auto mt-4 flex justify-end items-end">
//         <div className="space-y-2">
//           {messages.map((message, index) => (
//             <div key={index} className="flex justify-start mb-2">
//               <div className="flex flex-col">
//                 <div className="bg-gray-200 p-2 rounded-lg max-w-xs">
//                   <p>{message.content}</p>
//                 </div>
//                 <p className="text-xs text-gray-500 text-right">{message.timestamp}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       <footer className="mt-4">
//         <form onSubmit={handleSendMessage} className="relative">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type your message here..."
//             className="p-2 pl-12 pr-24 rounded-full shadow-md border border-gray-300 text-black outline-none w-full"
//           />
//           <PaperClipIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
//           <FaceSmileIcon className="absolute right-16 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
//           <CameraIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
//         </form>
//       </footer>
//     </div>
//   );
// };

// export default Chat;

