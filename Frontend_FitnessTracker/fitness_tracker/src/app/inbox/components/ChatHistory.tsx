'use client';

import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  profileImageUrl: string | null;
  role: string;
};

type Message = {
  id: number;
  senderEmail: string;
  senderRole: string;
  receiverEmail: string;
  receiverRole: string;
  content: string;
  seen: boolean;
  timestamp: string;
};

type ChatItem = {
  user: User;
  messages: Message[];
};

export default function ChatHistory({ darkMode }: { darkMode: boolean }) {
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }

        const res = await fetch('http://localhost:3000/messages/chat-history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorBody = await res.json();
          throw new Error(errorBody.message || 'Failed to fetch chat history');
        }

        const data: ChatItem[] = await res.json();
        setChatHistory(data);
      } catch (err: any) {
        console.error('Failed to load chat history:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  if (loading) {
    return <div className="p-4 text-sm text-gray-600">Loading chat history...</div>;
  }

  if (error) {
    return <div className="p-4 text-sm text-red-600">{error}</div>;
  }

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-6">Chat History</h1>
      {chatHistory.length === 0 ? (
        <div className="text-gray-600">No chat history available.</div>
      ) : (
        chatHistory.map(({ user, messages }) => (
          <div
            key={user.email}
            className={`border rounded-lg p-4 mb-6 shadow-sm ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <h2 className="text-lg font-semibold mb-2">
              {user.name} ({user.role})
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {messages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <div className="font-medium">{msg.senderEmail} ➜ {msg.receiverEmail}</div>
                  <div>{msg.content}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
