
import React, { useState } from 'react';
import { ArrowLeft, Search, Send, Phone, Video, Info, Home, Compass, MessageCircle, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ChatScreen: React.FC = () => {
  const { goBack, navigate } = useAppContext();
  const [messageText, setMessageText] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(null);

  // Mock conversation data
  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'Great! See you at the Oxford tour tomorrow',
      time: '2:35 PM',
      unread: 2,
      type: 'Guide'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage: 'The audio tour was amazing! Thanks',
      time: 'Yesterday',
      unread: 0,
      type: 'Audio Guide'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=9',
      lastMessage: 'Looking forward to our coffee chat!',
      time: 'Monday',
      unread: 1,
      type: 'Coffee Host'
    },
    {
      id: 4,
      name: 'The Garden Restaurant',
      avatar: 'https://i.pravatar.cc/150?img=20',
      lastMessage: 'Your table for 2 is confirmed for 7 PM',
      time: 'Sunday',
      unread: 0,
      type: 'Restaurant'
    }
  ];

  // Mock messages for active conversation
  const messages = activeConversation ? [
    { id: 1, text: 'Hi! Looking forward to the tour tomorrow', sender: 'me', time: '2:30 PM' },
    { id: 2, text: 'Hello! I\'m excited too! We\'ll meet at the Oxford Visitor Centre', sender: 'them', time: '2:32 PM' },
    { id: 3, text: 'Should I bring anything specific?', sender: 'me', time: '2:33 PM' },
    { id: 4, text: 'Just comfortable walking shoes and a camera! Weather looks good', sender: 'them', time: '2:35 PM' },
    { id: 5, text: 'Great! See you at the Oxford tour tomorrow', sender: 'them', time: '2:35 PM' }
  ] : [];

  const selectedConversation = conversations.find(c => c.id === activeConversation);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message
      setMessageText('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-ios-bg font-sans">

      {!activeConversation ? (
        // Conversation List View
        <>
          {/* Header */}
          <div className="sticky top-0 z-50 bg-ios-bg/80 ios-blur border-b border-black/5 pt-12 pb-4 px-5">
            <h1 className="text-[34px] font-bold text-black tracking-tight leading-tight">Messages</h1>
          </div>

          {/* Search Bar */}
          <div className="px-5 pt-4 pb-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-ios-search text-black rounded-[10px] py-2.5 pl-10 pr-4 focus:outline-none placeholder:text-gray-500 text-[17px]"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
            <div className="px-5 pt-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation.id)}
                  className="flex items-center gap-3 py-3 border-b border-gray-100 cursor-pointer active:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
                >
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {conversation.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-ios-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-[17px] text-black truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                    <span className="text-xs text-ios-blue mt-0.5 inline-block">{conversation.type}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {conversations.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Send size={32} className="text-gray-300" />
                </div>
                <p className="text-center text-sm">No messages yet</p>
                <p className="text-center text-xs mt-1">Start a conversation with your guides</p>
              </div>
            )}
          </div>
        </>
      ) : (
        // Individual Chat View
        <>
          {/* Chat Header */}
          <div className="sticky top-0 z-50 bg-white/80 ios-blur border-b border-black/5 pt-12 pb-3 px-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => setActiveConversation(null)}
                  className="text-ios-blue cursor-pointer active:opacity-50 flex-shrink-0"
                >
                  <ArrowLeft size={24} />
                </button>
                <img
                  src={selectedConversation?.avatar}
                  alt={selectedConversation?.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-[17px] text-black truncate">{selectedConversation?.name}</h2>
                  <p className="text-xs text-gray-500">{selectedConversation?.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-2 flex-shrink-0">
                <button className="text-ios-blue cursor-pointer active:opacity-50">
                  <Phone size={22} />
                </button>
                <button className="text-ios-blue cursor-pointer active:opacity-50">
                  <Video size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto pb-4 px-5 pt-4 scrollbar-hide bg-ios-bg">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-[18px] px-4 py-2.5 ${
                      message.sender === 'me'
                        ? 'bg-ios-blue text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                    }`}>{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-black/5 bg-white/80 ios-blur px-5 py-3 pb-8">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-ios-search rounded-[20px] px-4 py-2.5 flex items-center">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Message..."
                  className="flex-1 bg-transparent text-black focus:outline-none placeholder:text-gray-500 text-[17px]"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  messageText.trim()
                    ? 'bg-ios-blue text-white cursor-pointer active:scale-95'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* iOS Blur Tab Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white/80 ios-blur border-t border-black/5 pt-3 pb-6 px-6 flex justify-between items-center z-[100]">
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer hover:text-ios-blue transition-colors" onClick={() => navigate('home')}>
          <Home size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-medium">Explore</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer hover:text-ios-blue transition-colors" onClick={() => navigate('map')}>
          <Compass size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-medium">Map</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-ios-blue cursor-pointer">
          <MessageCircle size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-medium">Chat</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer hover:text-ios-blue transition-colors" onClick={() => navigate('profile')}>
          <User size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-medium">Profile</span>
        </div>
      </div>

    </div>
  );
};

export default ChatScreen;
