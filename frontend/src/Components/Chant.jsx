import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket';
import axios from 'axios';

const Chat = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch chat history on mount
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/chat/messages/${receiverId}`);
        setChat(res.data);
        scrollToBottom();
      } catch (error) {
        console.error("Failed to fetch chat:", error);
      }
    };

    fetchChat();
  }, [receiverId]);

  // Socket listeners
  useEffect(() => {
    socket.emit("join", { userId: senderId });

    socket.on("private-message", (data) => {
      if (data.senderId === receiverId || data.receiverId === receiverId) {
        setChat((prev) => [...prev, data]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off("private-message");
    };
  }, [receiverId, senderId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const payload = {
      senderId,
      receiverId,
      message,
    };

    socket.emit("private-message", payload);
    setChat((prev) => [...prev, { ...payload, timestamp: new Date() }]);
    setMessage('');
    scrollToBottom();
  };

  return (
    <div className="max-w-md mx-auto mt-8 shadow-xl rounded-lg overflow-hidden border border-gray-300">
      <div className="bg-blue-600 text-white px-4 py-2 font-semibold text-lg">
        Chat with {receiverId.slice(0, 6)}...
      </div>
      <div className="h-96 overflow-y-auto p-4 bg-gray-50">
        {chat.map((msg, idx) => {
          const isSender = msg.senderId === senderId;
          return (
            <div
              key={idx}
              className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md
                ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                {msg.message}
                <div className="text-[10px] text-gray-600 mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex p-3 border-t bg-white gap-2">
        <input
          className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
