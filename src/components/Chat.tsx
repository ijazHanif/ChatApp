"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  PaperClipIcon,
  FaceSmileIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import socket from "@/utils/socket";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { StaticImageData } from "next/image";

interface Message {
  content: string;
  sender: string;
  timestamp: string;
  attachmentUrl?: string|null;
  attachmentName?: string;
}

interface ChatProps {
  user: {
    img: StaticImageData;
    name: string;
    lastMessage: string;
    lastSeen: string;
    unreadCount: number;
  };
  messages: Message[];
  onSendMessage: (message: Message) => void;
}

const Chat: React.FC<ChatProps> = ({ user, messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(null ); // For displaying preview

  useEffect(() => {
    socket.on("message", (message: Message) => {
      if (message.sender === user.name) {
        onSendMessage(message);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [user, onSendMessage]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() || attachment) {
      const newMessage: Message = {
        content: inputValue,
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          //  hour12:false
        }),
        attachmentUrl: attachmentPreview, 
        attachmentName: attachment ? attachment.name : undefined,
      };

      // Update the messages in the parent component via onSendMessage
      onSendMessage(newMessage);

      // Emit message over the socket
      socket.emit("message", newMessage);

      // Clear input and attachment states
      setInputValue("");
      setAttachment(null);
      setAttachmentPreview(null);
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputValue((prev) => prev + emojiData.emoji);
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
      const previewUrl = URL.createObjectURL(file);
      setAttachmentPreview(previewUrl);
    }
  };

  return (
    <div className="text-black shadow-xl bg-white rounded-xl border border-blue-200 p-6 flex flex-col justify-between flex-grow">
      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <Image
            src={user.img}
            alt={user.name}
            width={35}
            height={35}
            className="rounded-full"
          />
          <div>
            <h1>{user.name}</h1>
            <p className="text-[12px] text-[#5F83A3]">{user.lastMessage}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col justify-end">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-center gap-2 ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-2 rounded-lg max-w-xs text-gray-800 flex flex-col ${message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              >
                <div className="flex items-end">
                  <p className="flex-1 break-words">{message.content}</p>
                  <p className="text-xs ml-2 flex-shrink-0">
                    {message.timestamp}
                  </p>
                </div>
                {message.attachmentUrl && (
                  <a
                    href={message.attachmentUrl}
                    download={message.attachmentName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline block mt-1"
                  >
                    {message.attachmentName}
                  </a>
                )}
              </div>
            </div>
          ))}
          {/* Show attachment preview in the chat */}
          {attachmentPreview && (
            <div className="mt-2 p-2 border border-gray-300 rounded-md">
              {attachmentPreview && (
                <Image
                  src={attachmentPreview}
                  alt="Attachment Preview"
                  className="max-w-full h-auto rounded-md"
                />
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="mt-4 relative">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="p-2 pl-12 pr-24 rounded-full shadow-md border border-gray-300 text-gray-900 outline-none w-full"
          />
          <input
            type="file"
            onChange={handleAttachmentChange}
            className="hidden"
            id="attachment"
          />
          <label htmlFor="attachment">
            <PaperClipIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 cursor-pointer" />
          </label>
          {attachment && (
            <span className="text-sm text-gray-500 ml-2">
              {attachment.name}
            </span>
          )}
          <FaceSmileIcon
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
          />
          <CameraIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </form>

        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0 z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </footer>
    </div>
  );
};

export default Chat;
