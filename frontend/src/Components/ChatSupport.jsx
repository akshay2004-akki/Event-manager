import { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

function ChatSupport() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const scrollRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: generateBotReply(input) }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotReply = (text) => {
    return 'Thanks for your message! We’ll get back shortly.';
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      <div className=''>
        {/* Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 z-50 transition-all"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </button>

      {/* Chat Widget */}
      <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95 translate-y-2"
        enterTo="opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0 scale-95 translate-y-2"
      >
        <div className="fixed bottom-20 right-5 w-80 sm:w-96 bg-white shadow-2xl rounded-2xl border border-gray-300 flex flex-col overflow-hidden z-40">
          {/* Header */}
          <div className="bg-green-600 text-white flex items-center justify-between px-4 py-3">
            <span className="font-semibold">Support Chat</span>
            <button onClick={() => setOpen(false)}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2 bg-gray-50 space-y-2 max-h-96 scrollbar-thin scrollbar-thumb-blue-200 flex flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm px-3 py-2 rounded-lg max-w-[75%] ${
                  msg.from === 'user'
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-200 text-gray-800 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-ping" />
                <span>Bot is typing...</span>
              </div>
            )}
            <div ref={scrollRef}></div>
          </div>

          {/* Input */}
          <div className="flex items-center border-t px-3 py-2 bg-white">
            <input
              type="text"
              className="flex-1 outline-none text-sm px-2 py-1"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="text-blue-600 hover:text-blue-800 p-1"
            >
              <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
            </button>
          </div>
        </div>
      </Transition>
      </div>
    </>
  );
}

export default ChatSupport;
