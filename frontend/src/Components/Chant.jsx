import React, { useState, useEffect } from 'react';
import socket from '../socket.js';

const Chat = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit("join", { userId: senderId });

    socket.on("private-message", (data) => {
      if (data.senderId === receiverId) {
        setChat((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("private-message");
    };
  }, [receiverId, senderId]);

  const sendMessage = () => {
    const payload = {
      senderId,
      receiverId,
      message,
    };

    socket.emit("private-message", payload);
    setChat((prev) => [...prev, payload]);
    setMessage('');
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-8 bg-white shadow">
      <h2 className="text-lg font-bold mb-4">Chat</h2>
      <div className="h-64 overflow-y-scroll mb-4 border p-2">
        {chat.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.senderId === senderId ? 'text-right' : 'text-left'}`}>
            <span className="inline-block bg-gray-200 px-3 py-1 rounded">
              {msg.message}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border px-3 py-1 flex-grow rounded"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
