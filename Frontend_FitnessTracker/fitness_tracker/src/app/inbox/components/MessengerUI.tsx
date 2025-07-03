// "use client";
// import { useState, useEffect, useRef } from "react";


// type Message = {
//   id: string;
//   senderId: string;
//   senderName: string;
//   text: string;
//   timestamp: string;
//   avatarUrl: string;
// };

// type Chat = {
//   id: string;
//   name: string;
//   avatarUrl: string;
//   lastMessage: string;
//   lastTimestamp: string;
//   messages: Message[];
// };

// type MessengerUIProps = {
//   darkMode: boolean;
// };



// export default function MessengerUI({ darkMode }: MessengerUIProps) {
//   // Simulated chats data
//   const [chats, setChats] = useState<Chat[]>([
//     {
//       id: "chat1",
//       name: "Alice Johnson",
//       avatarUrl: "/users/alice.jpg",
//       lastMessage: "See you tomorrow!",
//       lastTimestamp: "10:15 AM",
//       messages: [
//         {
//           id: "m1",
//           senderId: "me",
//           senderName: "You",
//           text: "Hey Alice! How are you?",
//           timestamp: "10:00 AM",
//           avatarUrl: "/profile.jpg",
//         },
//         {
//           id: "m2",
//           senderId: "alice",
//           senderName: "Alice Johnson",
//           text: "Hi! I'm good, thanks! See you tomorrow!",
//           timestamp: "10:15 AM",
//           avatarUrl: "/users/alice.jpg",
//         },
//       ],
//     },
//     {
//       id: "chat2",
//       name: "Bob Smith",
//       avatarUrl: "/users/bob.jpg",
//       lastMessage: "Got it, thanks!",
//       lastTimestamp: "Yesterday",
//       messages: [
//         {
//           id: "m3",
//           senderId: "bob",
//           senderName: "Bob Smith",
//           text: "Can you send me the report?",
//           timestamp: "Yesterday",
//           avatarUrl: "/users/bob.jpg",
//         },
//         {
//           id: "m4",
//           senderId: "me",
//           senderName: "You",
//           text: "Sure, sending it now!",
//           timestamp: "Yesterday",
//           avatarUrl: "/profile.jpg",
//         },
//       ],
//     },
//   ]);

//   const [activeChatId, setActiveChatId] = useState<string>(chats[0]?.id || "");
//   const [newMessage, setNewMessage] = useState("");

//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeChatId, chats]);

//   const activeChat = chats.find((c) => c.id === activeChatId);

//   const sendMessage = () => {
//     if (!newMessage.trim() || !activeChat) return;

//     const updatedChats = chats.map((chat) => {
//       if (chat.id === activeChatId) {
//         const newMsg: Message = {
//           id: `m${Date.now()}`,
//           senderId: "me",
//           senderName: "You",
//           text: newMessage.trim(),
//           timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//           avatarUrl: "/profile.jpg",
//         };
//         return {
//           ...chat,
//           messages: [...chat.messages, newMsg],
//           lastMessage: newMsg.text,
//           lastTimestamp: newMsg.timestamp,
//         };
//       }
//       return chat;
//     });

//     setChats(updatedChats);
//     setNewMessage("");
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };



//   return (
//     <div
//       className={`flex h-[calc(100vh-5rem)] rounded-lg overflow-hidden shadow-lg ${
//         darkMode ? "bg-zinc-900 text-zinc-100" : "bg-white text-gray-900"
//       }`}
//     >
//       {/* Chat list sidebar */}
//       <aside
//         className={`w-80 border-r ${
//           darkMode ? "border-zinc-700" : "border-gray-200"
//         } overflow-y-auto`}
//       >
//         <header
//           className={`px-6 py-4 font-semibold text-xl border-b ${
//             darkMode ? "border-zinc-700" : "border-gray-200"
//           }`}
//         >
//           Messages
//         </header>

//         <ul>
//           {chats.map((chat) => {
//             const isActive = chat.id === activeChatId;
//             return (
//               <li
//                 key={chat.id}
//                 onClick={() => setActiveChatId(chat.id)}
//                 className={`flex items-center gap-4 px-4 py-3 cursor-pointer border-l-4 ${
//                   isActive
//                     ? "border-orange-500 bg-orange-600/20"
//                     : darkMode
//                     ? "hover:bg-zinc-700"
//                     : "hover:bg-orange-100"
//                 }`}
//               >
//                 <img
//                   src={chat.avatarUrl}
//                   alt={chat.name}
//                   className="w-12 h-12 rounded-full object-cover"
//                   loading="lazy"
//                 />
//                 <div className="flex flex-col flex-grow overflow-hidden">
//                   <span
//                     className={`font-medium truncate ${
//                       isActive ? "text-white" : darkMode ? "text-zinc-300" : "text-gray-700"
//                     }`}
//                     title={chat.name}
//                   >
//                     {chat.name}
//                   </span>
//                   <span
//                     className={`truncate text-sm ${
//                       isActive ? "text-orange-200" : darkMode ? "text-zinc-400" : "text-gray-500"
//                     }`}
//                     title={chat.lastMessage}
//                   >
//                     {chat.lastMessage}
//                   </span>
//                 </div>
//                 <time
//                   className={`text-xs flex-shrink-0 ${
//                     isActive ? "text-orange-300" : darkMode ? "text-zinc-400" : "text-gray-400"
//                   }`}
//                   dateTime={chat.lastTimestamp}
//                 >
//                   {chat.lastTimestamp}
//                 </time>
//               </li>
//             );
//           })}
//         </ul>
//       </aside>

//       {/* Conversation area */}
//       <section className="flex flex-col flex-grow">
//         {/* Chat header */}
//         <header
//           className={`flex items-center gap-4 px-6 py-3 border-b ${
//             darkMode ? "border-zinc-700" : "border-gray-200"
//           }`}
//         >
//           <img
//             src={activeChat?.avatarUrl}
//             alt={activeChat?.name}
//             className="w-12 h-12 rounded-full object-cover"
//             loading="lazy"
//           />
//           <h2 className="text-lg font-semibold truncate">{activeChat?.name || "Select a chat"}</h2>
//         </header>

//         {/* Messages list */}
//         <main
//           className={`flex-grow px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent ${
//             darkMode ? "bg-zinc-800" : "bg-orange-50"
//           }`}
//         >
//           {!activeChat ? (
//             <p className="text-center text-gray-500 mt-20">No conversation selected.</p>
//           ) : (
//             activeChat.messages.map((msg) => {
//               const isSentByUser = msg.senderId === "me";
//               return (
//                 <div
//                   key={msg.id}
//                   className={`flex mb-4 ${
//                     isSentByUser ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   {!isSentByUser && (
//                     <img
//                       src={msg.avatarUrl}
//                       alt={msg.senderName}
//                       className="w-8 h-8 rounded-full mr-2 object-cover"
//                       loading="lazy"
//                     />
//                   )}
//                   <div
//                     className={`max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap break-words text-sm ${
//                       isSentByUser
//                         ? "bg-orange-500 text-white rounded-tr-none"
//                         : darkMode
//                         ? "bg-zinc-700 text-zinc-100 rounded-bl-none"
//                         : "bg-gray-200 text-gray-900 rounded-bl-none"
//                     }`}
//                   >
//                     {msg.text}
//                     <div className="text-xs text-right mt-1 opacity-70">
//                       {msg.timestamp}
//                     </div>
//                   </div>
//                   {isSentByUser && <div className="w-8 h-8 ml-2" />} {/* spacing */}
//                 </div>
//               );
//             })
//           )}
//           <div ref={messagesEndRef} />
//         </main>

//         {/* Input box */}
//         {activeChat && (
//           <footer
//             className={`px-6 py-4 border-t flex gap-3 items-center ${
//               darkMode ? "border-zinc-700 bg-zinc-900" : "border-gray-200 bg-white"
//             }`}
//           >
//             <textarea
//               rows={1}
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Type your message..."
//               className={`flex-grow resize-none rounded-md border px-4 py-2 focus:outline-none ${
//                 darkMode
//                   ? "bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-zinc-100 focus:border-orange-400"
//                   : "bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:border-orange-400"
//               }`}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
//               aria-label="Send message"
//             >
//               Send
//             </button>
//           </footer>
//         )}
//       </section>
//     </div>
//   );
// }
























// 'use client';

// import { useEffect, useState } from 'react';

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   profileImageUrl: string | null;
//   role: string;
// };

// type Message = {
//   id: number;
//   senderEmail: string;
//   senderRole: string;
//   receiverEmail: string;
//   receiverRole: string;
//   content: string;
//   seen: boolean;
//   timestamp: string;
// };

// type ChatItem = {
//   user: User;
//   messages: Message[];
// };

// export default function MessengerUI() {
//   const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const userStr = localStorage.getItem('user');
//         const token = userStr ? JSON.parse(userStr).Login_token : null;

//         if (!token) throw new Error('User not authenticated');

//         const response = await fetch('http://localhost:3000/messages/chat-history', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Failed to fetch chat history');
//         }

//         const data: ChatItem[] = await response.json();
//         setChatHistory(data);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message || 'Something went wrong');
//         setLoading(false);
//       }
//     };

//     fetchChatHistory();

//     const interval = setInterval(fetchChatHistory, 5000); // Optional: update every 5s
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Chat History</h2>

//       {loading && <p>Loading chat history...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && (
//         <ul className="space-y-4">
//           {chatHistory.map((chat, idx) => (
//             <li key={idx} className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg shadow-md">
//               <div className="flex items-center gap-4">
//                 <img
//                   src={chat.user.profileImageUrl || '/profile.jpg'}
//                   alt="User"
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="font-semibold">{chat.user.name}</p>
//                   <p className="text-sm text-zinc-500">{chat.user.email} ({chat.user.role})</p>
//                 </div>
//               </div>
//               <div className="mt-2 text-sm max-h-32 overflow-y-auto space-y-1">
//                 {chat.messages.map((msg, i) => (
//                   <div key={i} className="border-l-2 pl-2 border-orange-400">
//                     <span className="font-medium">{msg.senderEmail}</span>: {msg.content}
//                     <div className="text-xs text-zinc-400">
//                       {new Date(msg.timestamp).toLocaleString()}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


















// 'use client';
// import { useState, useEffect, useRef } from 'react';

// interface ChatHistory {
//   [email: string]: {
//     user: User;
//     messages: Message[];
//   };
// }

// type Message = {
//   id: number;
//   senderEmail: string;
//   senderRole: string;
//   receiverEmail: string;
//   receiverRole: string;
//   content: string;
//   seen: boolean;
//   timestamp: string;
// };

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   profileImageUrl: string | null;
//   role: string;
// };

// type Chat = {
//   id: string;
//   name: string;
//   avatarUrl: string;
//   lastMessage: string;
//   lastTimestamp: string;
//   email: string;
//   role: string;
//   messages: {
//     id: string;
//     senderId: string;
//     senderName: string;
//     text: string;
//     timestamp: string;
//     avatarUrl: string;
//   }[];
// };

// type MessengerUIProps = {
//   darkMode: boolean;
// };

// export default function MessengerUI({ darkMode }: MessengerUIProps) {
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [activeChatId, setActiveChatId] = useState<string>('');
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const [loggedInEmail, setLoggedInEmail] = useState<string>('');
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

//   // Scroll to bottom on update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chats, activeChatId]);

// //   useEffect(() => {
// //   const fetchChatHistory = async () => {
// //     try {
// //       const userStr = localStorage.getItem('user');
// //       const userData = userStr ? JSON.parse(userStr) : null;
// //       const token = userData?.Login_token;

// //       if (!token || !userData?.email) throw new Error('User not authenticated');

// //       setLoggedInUser({
// //         id: userData.id,
// //         name: userData.name,
// //         email: userData.email,
// //         profileImageUrl: userData.profileImageUrl || '/profile.jpg',
// //         role: userData.role,
// //       });

// //       const res = await fetch('http://localhost:3000/messages/chat-history', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!res.ok) throw new Error('Failed to fetch chat history');

// //       const data: ChatHistory = await res.json();

// //       // const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
// //       //   const last = messages[messages.length - 1];
// //       //   return {
// //       //     id: email,
// //       //     name: user.name,
// //       //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
// //       //     lastMessage: last?.content || '',
// //       //     lastTimestamp: new Date(last?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       //     email: user.email,
// //       //     role: user.role,
// //       //     messages: messages.map((m) => {
// //       //       const isUser = m.senderEmail === userData.email;
// //       //       return {
// //       //         id: String(m.id),
// //       //         senderId: m.senderEmail,
// //       //         senderName: isUser ? 'You' : user.name,
// //       //         text: m.content,
// //       //         timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       //         avatarUrl: isUser
// //       //           ? userData.profileImageUrl || '/profile.jpg'
// //       //           : user.profileImageUrl || '/default-avatar.jpg',
// //       //       };
// //       //     }),
// //       //   };
// //       // });

// //   const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
// //   const last = messages[messages.length - 1];
// //   return {
// //     id: email,
// //     name: user.name,
// //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
// //     lastMessage: last?.content || '',
// //     lastTimestamp: last?.timestamp || '', // Store raw timestamp for accurate sorting
// //     email: user.email,
// //     role: user.role,
// //     messages: messages.map((m) => ({
// //       id: String(m.id),
// //       senderId: m.senderEmail,
// //       senderName: m.senderEmail === user.email ? user.name : 'You',
// //       text: m.content,
// //       timestamp: m.timestamp, // Keep raw timestamp for proper use in sorting
// //       avatarUrl: m.senderEmail === user.email
// //         ? user.profileImageUrl || '/default-avatar.jpg'
// //         : '/profile.jpg',
// //     })),
// //   };
// // });

// // // ✅ Sort by actual timestamp (not formatted string)
// // formattedChats.sort((a, b) => {
// //   const aTime = new Date(a.lastTimestamp).getTime();
// //   const bTime = new Date(b.lastTimestamp).getTime();
// //   return bTime - aTime; // latest message first
// // });


// //       setChats(formattedChats);
// //       setActiveChatId(formattedChats[0]?.id || '');

// //     } catch (err) {
// //       console.error('Chat history fetch error:', err);
// //     }
// //   };

// //   fetchChatHistory();
// // }, []);


//  const fetchChatHistory = async () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       const token = userStr ? JSON.parse(userStr).Login_token : null;

//       if (!token) throw new Error('User not authenticated');

//       const res = await fetch('http://localhost:3000/messages/chat-history', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error('Failed to fetch chat history');

//       const data: ChatHistory = await res.json();
//       // Format your chats as before...
//       const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
//         const last = messages[messages.length - 1];
//         return {
//           id: email,
//           name: user.name,
//           avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
//           lastMessage: last?.content || '',
//           lastTimestamp: last?.timestamp || '',
//           email: user.email,
//           role: user.role,
//           messages: messages.map((m) => ({
//             id: String(m.id),
//             senderId: m.senderEmail,
//             senderName: m.senderEmail === user.email ? user.name : 'You',
//             text: m.content,
//             timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//             avatarUrl: m.senderEmail === user.email ? user.profileImageUrl || '/default-avatar.jpg' : '/profile.jpg',
//           })),
//         };
//       });
//       formattedChats.sort((a, b) => {
//   const timeA = new Date(a.lastTimestamp).getTime();
//   const timeB = new Date(b.lastTimestamp).getTime();
//   return timeB - timeA; // Descending: latest first
// });

//       setChats(formattedChats);

//       // Set active chat only if none is selected
//       setActiveChatId((prev) => prev || formattedChats[0]?.id || '');

//     } catch (err) {
//       console.error('Chat history fetch error:', err);
//     }
//   };

//   useEffect(() => {
//     // Initial fetch
//     fetchChatHistory();

//     // Set polling interval
//     const intervalId = setInterval(() => {
//       fetchChatHistory();
//     }, 5000); // every 5 seconds

//     // Cleanup on unmount
//     return () => clearInterval(intervalId);
//   }, []);


//   const activeChat = chats.find((c) => c.id === activeChatId);

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !activeChat || !loggedInEmail) return;

//     const userStr = localStorage.getItem('user');
//     const token = userStr ? JSON.parse(userStr).Login_token : null;
//     if (!token) return;

//     const newMsg = {
//       content: newMessage.trim(),
//       receiverEmail: activeChat.email,
//       receiverRole: activeChat.role,
//     };

//     try {
//       const res = await fetch('http://localhost:3000/messages/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newMsg),
//       });

//       if (!res.ok) throw new Error('Message send failed');

//       const created = await res.json();

// const updatedChats = chats.map((chat) => {
//   if (chat.id === activeChatId) {
//     const msg = {
//       id: String(created.id),
//       senderId: loggedInUser?.email || '',
//       senderName: 'You',
//       text: created.content,
//       timestamp: new Date(created.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       avatarUrl: loggedInUser?.profileImageUrl || '/profile.jpg',
//     };
//     return {
//       ...chat,
//       messages: [...chat.messages, msg],
//       lastMessage: msg.text,
//       lastTimestamp: msg.timestamp,
//     };
//   }
//   return chat;
// });

//       setChats(updatedChats);
//       setNewMessage('');
//     } catch (err) {
//       console.error('Send error:', err);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };


//   return (
//     <div
//       className={`flex h-[calc(100vh-5rem)] rounded-lg overflow-hidden shadow-lg ${
//         darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-gray-900'
//       }`}
//     >
//       {/* Sidebar */}
//       <aside className={`w-80 border-r ${darkMode ? 'border-zinc-700' : 'border-gray-200'} overflow-y-auto`}>
//         <header
//           className={`px-6 py-4 font-semibold text-xl border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}
//         >
//           Messages
//         </header>
//         <ul>
//           {chats.map((chat) => {
//             const isActive = chat.id === activeChatId;
//             return (
//               <li
//                 key={chat.id}
//                 onClick={() => setActiveChatId(chat.id)}
//                 className={`flex items-center gap-4 px-4 py-3 cursor-pointer border-l-4 ${
//                   isActive
//                     ? 'border-orange-500 bg-orange-600/20'
//                     : darkMode
//                     ? 'hover:bg-zinc-700'
//                     : 'hover:bg-orange-100'
//                 }`}
//               >
//                 <img src={chat.avatarUrl} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
//                 <div className="flex flex-col flex-grow overflow-hidden">
//                   <span className={`font-medium truncate ${isActive ? 'text-white' : darkMode ? 'text-zinc-300' : 'text-gray-700'}`} title={chat.name}>
//                     {chat.name}
//                   </span>
//                   <span className={`truncate text-sm ${isActive ? 'text-orange-200' : darkMode ? 'text-zinc-400' : 'text-gray-500'}`} title={chat.lastMessage}>
//                     {chat.lastMessage}
//                   </span>
//                 </div>
// <time
//   className={`text-xs flex-shrink-0 ${isActive ? 'text-orange-300' : darkMode ? 'text-zinc-400' : 'text-gray-400'}`}
//   dateTime={chat.lastTimestamp}
// >
//   {chat.lastTimestamp ? new Date(chat.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
// </time>

//               </li>
//             );
//           })}
//         </ul>
//       </aside>

//       {/* Chat View */}
//       <section className="flex flex-col flex-grow">
//         <header className={`flex items-center gap-4 px-6 py-3 border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
//           {activeChat && <img src={activeChat.avatarUrl} alt={activeChat.name} className="w-12 h-12 rounded-full object-cover" />}
//           <h2 className="text-lg font-semibold truncate">{activeChat?.name || 'Select a chat'}</h2>
//         </header>

//         <main className={`flex-grow px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent ${darkMode ? 'bg-zinc-800' : 'bg-orange-50'}`}>
//           {!activeChat ? (
//             <p className="text-center text-gray-500 mt-20">No conversation selected.</p>
//           ) : (
//             activeChat.messages.map((msg) => {
//               const isSentByUser = msg.senderId === loggedInUser?.email;
//               return (
//                 <div key={msg.id} className={`flex mb-4 ${isSentByUser ? 'justify-end' : 'justify-start'}`}>
//                   {!isSentByUser && (
//                     <img src={msg.avatarUrl} alt={msg.senderName} className="w-8 h-8 rounded-full mr-2 object-cover" />
//                   )}
//                   <div className={`max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap break-words text-sm ${
//                     isSentByUser
//                       ? 'bg-orange-500 text-white rounded-tr-none'
//                       : darkMode
//                       ? 'bg-zinc-700 text-zinc-100 rounded-bl-none'
//                       : 'bg-gray-200 text-gray-900 rounded-bl-none'
//                   }`}>
//                     {msg.text}
//                     <div className="text-xs text-right mt-1 opacity-70">{msg.timestamp}</div>
//                   </div>
//                   {isSentByUser && <div className="w-8 h-8 ml-2" />}
//                 </div>
//               );
//             })
//           )}
//           <div ref={messagesEndRef} />
//         </main>

//         {activeChat && (
//           <footer className={`px-6 py-4 border-t flex gap-3 items-center ${darkMode ? 'border-zinc-700 bg-zinc-900' : 'border-gray-200 bg-white'}`}>
//             <textarea
//               rows={1}
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Type your message..."
//               className={`flex-grow resize-none rounded-md border px-4 py-2 focus:outline-none ${
//                 darkMode
//                   ? 'bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-zinc-100 focus:border-orange-400'
//                   : 'bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:border-orange-400'
//               }`}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
//               aria-label="Send message"
//             >
//               Send
//             </button>
//           </footer>
//         )}
//       </section>
//     </div>
//   );
// }



















// 'use client';
// import { useState, useEffect, useRef } from 'react';

// interface ChatHistory {
//   [email: string]: {
//     user: User;
//     messages: Message[];
//   };
// }

// type Message = {
//   id: number;
//   senderEmail: string;
//   senderRole: string;
//   receiverEmail: string;
//   receiverRole: string;
//   content: string;
//   seen: boolean;
//   timestamp: string;
// };

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   profileImageUrl: string | null;
//   role: string;
// };

// type Chat = {
//   id: string;
//   name: string;
//   avatarUrl: string;
//   lastMessage: string;
//   lastTimestamp: string;
//   email: string;
//   role: string;
//   messages: {
//     id: string;
//     senderId: string;
//     senderName: string;
//     text: string;
//     timestamp: string;
//     avatarUrl: string;
//   }[];
// };

// type MessengerUIProps = {
//   darkMode: boolean;
// };

// export default function MessengerUI({ darkMode }: MessengerUIProps) {
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [activeChatId, setActiveChatId] = useState<string>('');
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const [loggedInEmail, setLoggedInEmail] = useState<string>('');
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
//   useEffect(() => {
//   const userStr = localStorage.getItem('user');
//   if (userStr) {
//     const userObj = JSON.parse(userStr);
//     setLoggedInEmail(userObj?.email || '');
//     setLoggedInUser({
//       id: userObj?.id,
//       name: userObj?.name,
//       email: userObj?.email,
//       profileImageUrl: userObj?.profileImageUrl || '/profile.jpg',
//       role: userObj?.role,
//     });
//   }

//   fetchChatHistory();

//   const intervalId = setInterval(() => {
//     fetchChatHistory();
//   }, 5000);

//   return () => clearInterval(intervalId);
// }, []);


//   // Scroll to bottom on update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chats, activeChatId]);

// //   useEffect(() => {
// //   const fetchChatHistory = async () => {
// //     try {
// //       const userStr = localStorage.getItem('user');
// //       const userData = userStr ? JSON.parse(userStr) : null;
// //       const token = userData?.Login_token;

// //       if (!token || !userData?.email) throw new Error('User not authenticated');

// //       setLoggedInUser({
// //         id: userData.id,
// //         name: userData.name,
// //         email: userData.email,
// //         profileImageUrl: userData.profileImageUrl || '/profile.jpg',
// //         role: userData.role,
// //       });

// //       const res = await fetch('http://localhost:3000/messages/chat-history', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!res.ok) throw new Error('Failed to fetch chat history');

// //       const data: ChatHistory = await res.json();

// //       // const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
// //       //   const last = messages[messages.length - 1];
// //       //   return {
// //       //     id: email,
// //       //     name: user.name,
// //       //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
// //       //     lastMessage: last?.content || '',
// //       //     lastTimestamp: new Date(last?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       //     email: user.email,
// //       //     role: user.role,
// //       //     messages: messages.map((m) => {
// //       //       const isUser = m.senderEmail === userData.email;
// //       //       return {
// //       //         id: String(m.id),
// //       //         senderId: m.senderEmail,
// //       //         senderName: isUser ? 'You' : user.name,
// //       //         text: m.content,
// //       //         timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       //         avatarUrl: isUser
// //       //           ? userData.profileImageUrl || '/profile.jpg'
// //       //           : user.profileImageUrl || '/default-avatar.jpg',
// //       //       };
// //       //     }),
// //       //   };
// //       // });

// //   const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
// //   const last = messages[messages.length - 1];
// //   return {
// //     id: email,
// //     name: user.name,
// //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
// //     lastMessage: last?.content || '',
// //     lastTimestamp: last?.timestamp || '', // Store raw timestamp for accurate sorting
// //     email: user.email,
// //     role: user.role,
// //     messages: messages.map((m) => ({
// //       id: String(m.id),
// //       senderId: m.senderEmail,
// //       senderName: m.senderEmail === user.email ? user.name : 'You',
// //       text: m.content,
// //       timestamp: m.timestamp, // Keep raw timestamp for proper use in sorting
// //       avatarUrl: m.senderEmail === user.email
// //         ? user.profileImageUrl || '/default-avatar.jpg'
// //         : '/profile.jpg',
// //     })),
// //   };
// // });

// // // ✅ Sort by actual timestamp (not formatted string)
// // formattedChats.sort((a, b) => {
// //   const aTime = new Date(a.lastTimestamp).getTime();
// //   const bTime = new Date(b.lastTimestamp).getTime();
// //   return bTime - aTime; // latest message first
// // });


// //       setChats(formattedChats);
// //       setActiveChatId(formattedChats[0]?.id || '');

// //     } catch (err) {
// //       console.error('Chat history fetch error:', err);
// //     }
// //   };

// //   fetchChatHistory();
// // }, []);


//  const fetchChatHistory = async () => {
//     try {
//       const userStr = localStorage.getItem('user');

//       const token = userStr ? JSON.parse(userStr).Login_token : null;

//       if (!token) throw new Error('User not authenticated');

//       const res = await fetch('http://localhost:3000/messages/chat-history', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error('Failed to fetch chat history');

//       const data: ChatHistory = await res.json();
//       // Format your chats as before...
//       const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
//         const last = messages[messages.length - 1];
//         return {
//           id: email,
//           name: user.name,
//           avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
//           lastMessage: last?.content || '',
//           lastTimestamp: last?.timestamp || '',
//           email: user.email,
//           role: user.role,
//           messages: messages.map((m) => ({
//             id: String(m.id),
//             senderId: m.senderEmail,
//             senderName: m.senderEmail === user.email ? user.name : 'You',
//             text: m.content,
//             timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//             avatarUrl: m.senderEmail === user.email ? user.profileImageUrl || '/default-avatar.jpg' : '/profile.jpg',
//           })),
//         };
//       });
//       formattedChats.sort((a, b) => {
//   const timeA = new Date(a.lastTimestamp).getTime();
//   const timeB = new Date(b.lastTimestamp).getTime();
//   return timeB - timeA; // Descending: latest first
// });

//       setChats(formattedChats);

//       // Set active chat only if none is selected
//       setActiveChatId((prev) => prev || formattedChats[0]?.id || '');

//     } catch (err) {
//       console.error('Chat history fetch error:', err);
//     }
//   };

//   useEffect(() => {
//     // Initial fetch
//     fetchChatHistory();

//     // Set polling interval
//     const intervalId = setInterval(() => {
//       fetchChatHistory();
//     }, 5000); // every 5 seconds

//     // Cleanup on unmount
//     return () => clearInterval(intervalId);
//   }, []);


//   const activeChat = chats.find((c) => c.id === activeChatId);

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !activeChat || !loggedInEmail) return;

//     const userStr = localStorage.getItem('user');
//     const token = userStr ? JSON.parse(userStr).Login_token : null;
//     if (!token) return;

//     const newMsg = {
//       content: newMessage.trim(),
//       receiverEmail: activeChat.email,
//       receiverRole: activeChat.role,
//     };

//     try {
//       const res = await fetch('http://localhost:3000/messages/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newMsg),
//       });

//       if (!res.ok) throw new Error('Message send failed');

//       const created = await res.json();

// const updatedChats = chats.map((chat) => {
//   if (chat.id === activeChatId) {
//     const msg = {
//       id: String(created.id),
//       senderId: loggedInUser?.email || '',
//       senderName: 'You',
//       text: created.content,
//       timestamp: new Date(created.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       avatarUrl: loggedInUser?.profileImageUrl || '/profile.jpg',
//     };
//     return {
//       ...chat,
//       messages: [...chat.messages, msg],
//       lastMessage: msg.text,
//       lastTimestamp: msg.timestamp,
//     };
//   }
//   return chat;
// });

//       setChats(updatedChats);
//       setNewMessage('');
//     } catch (err) {
//       console.error('Send error:', err);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };


//   return (
//     <div
//       className={`flex h-[calc(100vh-5rem)] rounded-lg overflow-hidden shadow-lg ${
//         darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-gray-900'
//       }`}
//     >
//       {/* Sidebar */}
//       <aside className={`w-80 border-r ${darkMode ? 'border-zinc-700' : 'border-gray-200'} overflow-y-auto`}>
//         <header
//           className={`px-6 py-4 font-semibold text-xl border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}
//         >
//           Messages
//         </header>
//         <ul>
//           {chats.map((chat) => {
//             const isActive = chat.id === activeChatId;
//             return (
//               <li
//                 key={chat.id}
//                 onClick={() => setActiveChatId(chat.id)}
//                 className={`flex items-center gap-4 px-4 py-3 cursor-pointer border-l-4 ${
//                   isActive
//                     ? 'border-orange-500 bg-orange-600/20'
//                     : darkMode
//                     ? 'hover:bg-zinc-700'
//                     : 'hover:bg-orange-100'
//                 }`}
//               >
//                 <img src={chat.avatarUrl} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
//                 <div className="flex flex-col flex-grow overflow-hidden">
//                   <span className={`font-medium truncate ${isActive ? 'text-white' : darkMode ? 'text-zinc-300' : 'text-gray-700'}`} title={chat.name}>
//                     {chat.name}
//                   </span>
//                   <span className={`truncate text-sm ${isActive ? 'text-orange-200' : darkMode ? 'text-zinc-400' : 'text-gray-500'}`} title={chat.lastMessage}>
//                     {chat.lastMessage}
//                   </span>
//                 </div>
// <time
//   className={`text-xs flex-shrink-0 ${isActive ? 'text-orange-300' : darkMode ? 'text-zinc-400' : 'text-gray-400'}`}
//   dateTime={chat.lastTimestamp}
// >
//   {chat.lastTimestamp ? new Date(chat.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
// </time>

//               </li>
//             );
//           })}
//         </ul>
//       </aside>

//       {/* Chat View */}
//       <section className="flex flex-col flex-grow">
//         <header className={`flex items-center gap-4 px-6 py-3 border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
//           {activeChat && <img src={activeChat.avatarUrl} alt={activeChat.name} className="w-12 h-12 rounded-full object-cover" />}
//           <h2 className="text-lg font-semibold truncate">{activeChat?.name || 'Select a chat'}</h2>
//         </header>

//         <main className={`flex-grow px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent ${darkMode ? 'bg-zinc-800' : 'bg-orange-50'}`}>
//           {!activeChat ? (
//             <p className="text-center text-gray-500 mt-20">No conversation selected.</p>
//           ) : (
//             activeChat.messages.map((msg) => {
//               const isSentByUser = msg.senderId === loggedInUser?.email;
//               return (
//                 <div key={msg.id} className={`flex mb-4 ${isSentByUser ? 'justify-end' : 'justify-start'}`}>
// {!isSentByUser ? (
//   <img src={msg.avatarUrl} alt={msg.senderName} className="w-8 h-8 rounded-full mr-2 object-cover" />
// ) : (
//   <div className="w-8 h-8 ml-2" />
// )}
//                   <div className={`max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap break-words text-sm ${
//                     isSentByUser
//                       ? 'bg-orange-500 text-white rounded-tr-none'
//                       : darkMode
//                       ? 'bg-zinc-700 text-zinc-100 rounded-bl-none'
//                       : 'bg-gray-200 text-gray-900 rounded-bl-none'
//                   }`}>
//                     {msg.text}
//                     <div className="text-xs text-right mt-1 opacity-70">{msg.timestamp}</div>
//                   </div>
//                   {isSentByUser && <div className="w-8 h-8 ml-2" />}
//                 </div>
//               );
//             })
//           )}
//           <div ref={messagesEndRef} />
//         </main>

//         {activeChat && (
//           <footer className={`px-6 py-4 border-t flex gap-3 items-center ${darkMode ? 'border-zinc-700 bg-zinc-900' : 'border-gray-200 bg-white'}`}>
//             <textarea
//               rows={1}
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Type your message..."
//               className={`flex-grow resize-none rounded-md border px-4 py-2 focus:outline-none ${
//                 darkMode
//                   ? 'bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-zinc-100 focus:border-orange-400'
//                   : 'bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:border-orange-400'
//               }`}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
//               aria-label="Send message"
//             >
//               Send
//             </button>
//           </footer>
//         )}
//       </section>
//     </div>
//   );
// }

























// 'use client';
// import { div } from 'framer-motion/client';
// import { useState, useEffect, useRef } from 'react';

// interface ChatHistory {
//   [email: string]: {
//     user: User;
//     messages: Message[];
//   };
// }

// type Message = {
//   id: number;
//   senderEmail: string;
//   senderRole: string;
//   receiverEmail: string;
//   receiverRole: string;
//   content: string;
//   seen: boolean;
//   timestamp: string;
// };

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   profileImageUrl: string | null;
//   role: string;
// };

// type Chat = {
//   id: string;
//   name: string;
//   avatarUrl: string;
//   lastMessage: string;
//   lastTimestamp: string;
//   email: string;
//   role: string;
//   messages: {
//     id: string;
//     senderId: string;
//     senderName: string;
//     text: string;
//     timestamp: string;
//     avatarUrl: string;
//   }[];
// };

// type MessengerUIProps = {
//   darkMode: boolean;
// };

// export default function MessengerUI({ darkMode }: MessengerUIProps) {
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [activeChatId, setActiveChatId] = useState<string>('');
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const [loggedInEmail, setLoggedInEmail] = useState<string>('');
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
//   useEffect(() => {
//   const userStr = localStorage.getItem('user');
//   if (userStr) {
//     const userObj = JSON.parse(userStr);
//     setLoggedInEmail(userObj?.email || '');
//     setLoggedInUser({
//       id: userObj?.id,
//       name: userObj?.name,
//       email: userObj?.email,
//       profileImageUrl: userObj?.profileImageUrl || '/profile.jpg',
//       role: userObj?.role,
//     });
//   }

//   fetchChatHistory();

//   const intervalId = setInterval(() => {
//     fetchChatHistory();
//   }, 5000);

//   return () => clearInterval(intervalId);
// }, []);


//   // Scroll to bottom on update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chats, activeChatId]);

// //   useEffect(() => {
// //   const fetchChatHistory = async () => {
// //     try {
// //       const userStr = localStorage.getItem('user');
// //       const userData = userStr ? JSON.parse(userStr) : null;
// //       const token = userData?.Login_token;

// //       if (!token || !userData?.email) throw new Error('User not authenticated');

// //       setLoggedInUser({
// //         id: userData.id,
// //         name: userData.name,
// //         email: userData.email,
// //         profileImageUrl: userData.profileImageUrl || '/profile.jpg',
// //         role: userData.role,
// //       });

// //       const res = await fetch('http://localhost:3000/messages/chat-history', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!res.ok) throw new Error('Failed to fetch chat history');

// //       const data: ChatHistory = await res.json();

// //       // const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
// //       //   const last = messages[messages.length - 1];
// //       //   return {
// //       //     id: email,
// //       //     name: user.name,
// //       //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
// //       //     lastMessage: last?.content || '',
// //       //     lastTimestamp: new Date(last?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       //     email: user.email,
// //       //     role: user.role,
// //       //     messages: messages.map((m) => {
// //       //       const isUser = m.senderEmail === userData.email;
// //       //       return {
// //       //         id: String(m.id),
// //       //         senderId: m.senderEmail,
// //       //         senderName: isUser ? 'You' : user.name,
// //       //         text: m.content,
// //       //         timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       //         avatarUrl: isUser
// //       //           ? userData.profileImageUrl || '/profile.jpg'
// //       //           : user.profileImageUrl || '/default-avatar.jpg',
// //       //       };
// //       //     }),
// //       //   };
// //       // });

// //   const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
// //   const last = messages[messages.length - 1];
// //   return {
// //     id: email,
// //     name: user.name,
// //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
// //     lastMessage: last?.content || '',
// //     lastTimestamp: last?.timestamp || '', // Store raw timestamp for accurate sorting
// //     email: user.email,
// //     role: user.role,
// //     messages: messages.map((m) => ({
// //       id: String(m.id),
// //       senderId: m.senderEmail,
// //       senderName: m.senderEmail === user.email ? user.name : 'You',
// //       text: m.content,
// //       timestamp: m.timestamp, // Keep raw timestamp for proper use in sorting
// //       avatarUrl: m.senderEmail === user.email
// //         ? user.profileImageUrl || '/default-avatar.jpg'
// //         : '/profile.jpg',
// //     })),
// //   };
// // });

// // // ✅ Sort by actual timestamp (not formatted string)
// // formattedChats.sort((a, b) => {
// //   const aTime = new Date(a.lastTimestamp).getTime();
// //   const bTime = new Date(b.lastTimestamp).getTime();
// //   return bTime - aTime; // latest message first
// // });


// //       setChats(formattedChats);
// //       setActiveChatId(formattedChats[0]?.id || '');

// //     } catch (err) {
// //       console.error('Chat history fetch error:', err);
// //     }
// //   };

// //   fetchChatHistory();
// // }, []);


//  const fetchChatHistory = async () => {
//     try {
//       const userStr = localStorage.getItem('user');

//       const token = userStr ? JSON.parse(userStr).Login_token : null;

//       if (!token) throw new Error('User not authenticated');

//       const res = await fetch('http://localhost:3000/messages/chat-history', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error('Failed to fetch chat history');

//       const data: ChatHistory = await res.json();
//       // Format your chats as before...
//       const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
//         const last = messages[messages.length - 1];
//         return {
//           id: email,
//           name: user.name,
//           avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
//           lastMessage: last?.content || '',
//           lastTimestamp: last?.timestamp || '',
//           email: user.email,
//           role: user.role,
//           messages: messages.map((m) => ({
//             id: String(m.id),
//             senderId: m.senderEmail,
//             senderName: m.senderEmail === user.email ? user.name : 'You',
//             text: m.content,
//             timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//             avatarUrl: m.senderEmail === user.email ? user.profileImageUrl || '/default-avatar.jpg' : '/profile.jpg',
//           })),
//         };
//       });
//       formattedChats.sort((a, b) => {
//   const timeA = new Date(a.lastTimestamp).getTime();
//   const timeB = new Date(b.lastTimestamp).getTime();
//   return timeB - timeA; // Descending: latest first
// });

//       setChats(formattedChats);

//       // Set active chat only if none is selected
//       setActiveChatId((prev) => prev || formattedChats[0]?.id || '');

//     } catch (err) {
//       console.error('Chat history fetch error:', err);
//     }
//   };

//   useEffect(() => {
//     // Initial fetch
//     fetchChatHistory();

//     // Set polling interval
//     const intervalId = setInterval(() => {
//       fetchChatHistory();
//     }, 5000); // every 5 seconds

//     // Cleanup on unmount
//     return () => clearInterval(intervalId);
//   }, []);


//   const activeChat = chats.find((c) => c.id === activeChatId);

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !activeChat || !loggedInEmail) return;

//     const userStr = localStorage.getItem('user');
//     const token = userStr ? JSON.parse(userStr).Login_token : null;
//     if (!token) return;

//     const newMsg = {
//       content: newMessage.trim(),
//       receiverEmail: activeChat.email,
//       receiverRole: activeChat.role,
//     };

//     try {
//       const res = await fetch('http://localhost:3000/messages/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newMsg),
//       });

//       if (!res.ok) throw new Error('Message send failed');

//       const created = await res.json();

// const updatedChats = chats.map((chat) => {
//   if (chat.id === activeChatId) {
//     const msg = {
//       id: String(created.id),
//       senderId: loggedInUser?.email || '',
//       senderName: 'You',
//       text: created.content,
//       timestamp: new Date(created.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       avatarUrl: loggedInUser?.profileImageUrl || '/profile.jpg',
//     };
//     return {
//       ...chat,
//       messages: [...chat.messages, msg],
//       lastMessage: msg.text,
//       lastTimestamp: msg.timestamp,
//     };
//   }
//   return chat;
// });

//       setChats(updatedChats);
//       setNewMessage('');
//     } catch (err) {
//       console.error('Send error:', err);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   function getInitials(name: string) {
//   return name
//     .split(' ')
//     .map((part) => part[0]?.toUpperCase())
//     .join('')
//     .slice(0, 2); // Max 2 letters
// }


//   return (
//     <div
//       className={`flex h-[calc(100vh-5rem)] rounded-lg overflow-hidden shadow-lg ${
//         darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-gray-900'
//       }`}
//     >
//       {/* Sidebar */}
//       <aside className={`w-80 border-r ${darkMode ? 'border-zinc-700' : 'border-gray-200'} overflow-y-auto`}>
//         <header
//           className={`px-6 py-4 font-semibold text-xl border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}
//         >
//           Messages
//         </header>
//         <ul>
//           {chats.map((chat) => {
//             const isActive = chat.id === activeChatId;
//             return (
//               <li
//                 key={chat.id}
//                 onClick={() => setActiveChatId(chat.id)}
//                 className={`flex items-center gap-4 px-4 py-3 cursor-pointer border-l-4 ${
//                   isActive
//                     ? 'border-orange-500 bg-orange-600/20'
//                     : darkMode
//                     ? 'hover:bg-zinc-700'
//                     : 'hover:bg-orange-100'
//                 }`}
//               >
//                 {chat.avatarUrl && !chat.avatarUrl.includes('default-avatar.jpg') ? (
//                   <img src={chat.avatarUrl} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
//                 ) : (
//                             <div className="avatar avatar-placeholder">
//                               <div className="bg-base-300 text-base-content w-12 rounded-full">
//                                 <span className="text-sm">
//                                   {getInitials(chat.name)}
//                                 </span>
//                               </div>
//                             </div>
//                 )}
//                 <div className="flex flex-col flex-grow overflow-hidden">
//                   <span className={`font-medium truncate ${isActive ? 'text-white' : darkMode ? 'text-zinc-300' : 'text-gray-700'}`} title={chat.name}>
//                     {chat.name}
//                   </span>
//                   <span className={`truncate text-sm ${isActive ? 'text-orange-200' : darkMode ? 'text-zinc-400' : 'text-gray-500'}`} title={chat.lastMessage}>
//                     {chat.lastMessage}
//                   </span>
//                 </div>
// <time
//   className={`text-xs flex-shrink-0 ${isActive ? 'text-orange-300' : darkMode ? 'text-zinc-400' : 'text-gray-400'}`}
//   dateTime={chat.lastTimestamp}
// >
//   {chat.lastTimestamp ? new Date(chat.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
// </time>

//               </li>
//             );
//           })}
//         </ul>
//       </aside>

//       {/* Chat View */}
//       <section className="flex flex-col flex-grow">
//       <header className={`flex items-center gap-4 px-6 py-3 border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
//         {activeChat && (
//           activeChat.avatarUrl && !activeChat.avatarUrl.includes('default-avatar.jpg') ? (
//             <img
//               src={activeChat.avatarUrl}
//               alt={activeChat.name}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//           ) : (
//                 <div className="avatar placeholder">
//                   <div className="avatar avatar-placeholder">
//                     <div className="bg-black text-base-content w-12 rounded-full">
//                     <span className="text-sm">
//                         {activeChat.name
//                           .split(' ')
//                           .map((part) => part[0].toUpperCase())
//                           .join('')
//                           .slice(0, 2)}
//                       </span>
//                     </div>
//                   </div>
//               </div>
//              )
//         )}
//         <h2 className="text-lg font-semibold truncate">
//           {activeChat?.name || 'Select a chat'}
//         </h2>
//       </header>


// <main className={`flex-grow px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent ${darkMode ? 'bg-zinc-800' : 'bg-orange-50'}`}>
//   {!activeChat ? (
//     <p className="text-center text-gray-500 mt-20">No conversation selected.</p>
//   ) : (
//     activeChat.messages.map((msg) => {
//       const isSentByUser = msg.senderId === loggedInUser?.email;

//       // Helper: fallback initials
//       const getInitials = (name: string) => {
//         const names = name.split(' ');
//         return names.length === 1
//           ? names[0][0].toUpperCase()
//           : names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
//       };

//       return (
//         <div key={msg.id} className={`flex mb-4 ${isSentByUser ? 'justify-end' : 'justify-start'}`}>
//           {!isSentByUser && (
//             msg.avatarUrl && !msg.avatarUrl.includes('default-avatar.jpg') ? (
//               <img src={msg.avatarUrl} alt={msg.senderName} className="w-8 h-8 rounded-full mr-2 object-cover" />
//             ) : (
//               <div> 
//                 <div className="avatar placeholder mr-3">
//                     <div className="avatar avatar-placeholder">
//                           <div className="bg-base-300 text-base-content w-12 rounded-full">
//                               <span className="text-sm">
//                                 {getInitials(msg.senderName)}
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//               </div>
//             )
//           )}
//           <div className={`max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap break-words text-sm ${
//             isSentByUser
//               ? 'bg-orange-500 text-white rounded-tr-none'
//               : darkMode
//               ? 'bg-zinc-700 text-zinc-100 rounded-bl-none'
//               : 'bg-gray-200 text-gray-900 rounded-bl-none'
//           }`}>
//             {msg.text}
//             <div className="text-xs text-right mt-1 opacity-70">{msg.timestamp}</div>
//           </div>
//           {isSentByUser && <div className="w-8 h-8 ml-2" />}
//         </div>
//       );
//     })
//   )}
//   <div ref={messagesEndRef} />
// </main>


//         {activeChat && (
//           <footer className={`px-6 py-4 border-t flex gap-3 items-center ${darkMode ? 'border-zinc-700 bg-zinc-900' : 'border-gray-200 bg-white'}`}>
//             <textarea
//               rows={1}
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Type your message..."
//               className={`flex-grow resize-none rounded-md border px-4 py-2 focus:outline-none ${
//                 darkMode
//                   ? 'bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-zinc-100 focus:border-orange-400'
//                   : 'bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:border-orange-400'
//               }`}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
//               aria-label="Send message"
//             >
//               Send
//             </button>
//           </footer>
//         )}
//       </section>
//     </div>
//   );
// }



































































































//////////////////////////////////////////------------------------------Search working Partially---------------------------------------


// 'use client';
// import { div } from 'framer-motion/client';
// import { useState, useEffect, useRef } from 'react';

// interface ChatHistory {
//   [email: string]: {
//     user: User;
//     messages: Message[];
//   };
// }

// type Message = {
//   id: number;
//   senderEmail: string;
//   senderRole: string;
//   receiverEmail: string;
//   receiverRole: string;
//   content: string;
//   seen: boolean;
//   timestamp: string;
// };

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   profileImageUrl: string | null;
//   role: string;
// };

// type Chat = {
//   id: string;
//   name: string;
//   avatarUrl: string;
//   lastMessage: string;
//   lastTimestamp: string;
//   email: string;
//   role: string;
//   messages: {
//     id: string;
//     senderId: string;
//     senderName: string;
//     text: string;
//     timestamp: string;
//     avatarUrl: string;
//   }[];
// };

// type MessengerUIProps = {
//   darkMode: boolean;
// };

// export default function MessengerUI({ darkMode }: MessengerUIProps) {
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [activeChatId, setActiveChatId] = useState<string>('');
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const [loggedInEmail, setLoggedInEmail] = useState<string>('');
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
//   const [tempChats, setTempChats] = useState<Chat[]>([]);


//   const [isStartConversationOpen, setIsStartConversationOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<User[]>([]);
//   useEffect(() => {
//   const userStr = localStorage.getItem('user');
//   if (userStr) {
//     const userObj = JSON.parse(userStr);
//     setLoggedInEmail(userObj?.email || '');
//     setLoggedInUser({
//       id: userObj?.id,
//       name: userObj?.name,
//       email: userObj?.email,
//       profileImageUrl: userObj?.profileImageUrl || '/profile.jpg',
//       role: userObj?.role,
//     });
//   }

//   fetchChatHistory();

//   const intervalId = setInterval(() => {
//     fetchChatHistory();
//   }, 5000);

//   return () => clearInterval(intervalId);
// }, []);


// const handleUserSearch = async () => {
//   if (!searchQuery.trim()) return;

//   try {
//     const res = await fetch(`http://localhost:3000/admin/search-users?query=${encodeURIComponent(searchQuery.trim())}`);
//     if (!res.ok) throw new Error('Search failed');

//     const users = await res.json();

//     // Only include essential fields for UI (name, email, image, role)
//     const results = users.map((user: any) => ({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       profileImageUrl: user.profileImageUrl,
//       role: user.role,
//     }));

//     setSearchResults(results);
//   } catch (err) {
//     console.error('Search error:', err);
//     setSearchResults([]);
//   }
// };

// const handleStartNewChat = (user: User) => {
//   const existingChat = chats.find((c) => c.email === user.email);

//   if (existingChat) {
//     setActiveChatId(existingChat.id);
//   } else {
//     const newChat: Chat = {
//       id: user.email,
//       name: user.name,
//       avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
//       lastMessage: '',
//       lastTimestamp: '',
//       email: user.email,
//       role: user.role,
//       messages: [],
//     };

//       setChats((prev) => [newChat, ...prev]);
//       setTempChats((prev) => [newChat, ...prev]);
//       setActiveChatId(newChat.id);
//   }

//   // Close modal and reset search
//   setIsStartConversationOpen(false);
//   setSearchQuery('');
//   setSearchResults([]);
// };

//   // Scroll to bottom on update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chats, activeChatId]);

// //   useEffect(() => {
// //   const fetchChatHistory = async () => {
// //     try {
// //       const userStr = localStorage.getItem('user');
// //       const userData = userStr ? JSON.parse(userStr) : null;
// //       const token = userData?.Login_token;

// //       if (!token || !userData?.email) throw new Error('User not authenticated');

// //       setLoggedInUser({
// //         id: userData.id,
// //         name: userData.name,
// //         email: userData.email,
// //         profileImageUrl: userData.profileImageUrl || '/profile.jpg',
// //         role: userData.role,
// //       });

// //       const res = await fetch('http://localhost:3000/messages/chat-history', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!res.ok) throw new Error('Failed to fetch chat history');

// //       const data: ChatHistory = await res.json();

// //       // const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
// //       //   const last = messages[messages.length - 1];
// //       //   return {
// //       //     id: email,
// //       //     name: user.name,
// //       //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
// //       //     lastMessage: last?.content || '',
// //       //     lastTimestamp: new Date(last?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       //     email: user.email,
// //       //     role: user.role,
// //       //     messages: messages.map((m) => {
// //       //       const isUser = m.senderEmail === userData.email;
// //       //       return {
// //       //         id: String(m.id),
// //       //         senderId: m.senderEmail,
// //       //         senderName: isUser ? 'You' : user.name,
// //       //         text: m.content,
// //       //         timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       //         avatarUrl: isUser
// //       //           ? userData.profileImageUrl || '/profile.jpg'
// //       //           : user.profileImageUrl || '/default-avatar.jpg',
// //       //       };
// //       //     }),
// //       //   };
// //       // });

// //   const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
// //   const last = messages[messages.length - 1];
// //   return {
// //     id: email,
// //     name: user.name,
// //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
// //     lastMessage: last?.content || '',
// //     lastTimestamp: last?.timestamp || '', // Store raw timestamp for accurate sorting
// //     email: user.email,
// //     role: user.role,
// //     messages: messages.map((m) => ({
// //       id: String(m.id),
// //       senderId: m.senderEmail,
// //       senderName: m.senderEmail === user.email ? user.name : 'You',
// //       text: m.content,
// //       timestamp: m.timestamp, // Keep raw timestamp for proper use in sorting
// //       avatarUrl: m.senderEmail === user.email
// //         ? user.profileImageUrl || '/default-avatar.jpg'
// //         : '/profile.jpg',
// //     })),
// //   };
// // });

// // // ✅ Sort by actual timestamp (not formatted string)
// // formattedChats.sort((a, b) => {
// //   const aTime = new Date(a.lastTimestamp).getTime();
// //   const bTime = new Date(b.lastTimestamp).getTime();
// //   return bTime - aTime; // latest message first
// // });


// //       setChats(formattedChats);
// //       setActiveChatId(formattedChats[0]?.id || '');

// //     } catch (err) {
// //       console.error('Chat history fetch error:', err);
// //     }
// //   };

// //   fetchChatHistory();
// // }, []);


//  const fetchChatHistory = async () => {
//     try {
//       const userStr = localStorage.getItem('user');

//       const token = userStr ? JSON.parse(userStr).Login_token : null;

//       if (!token) throw new Error('User not authenticated');

//       const res = await fetch('http://localhost:3000/messages/chat-history', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error('Failed to fetch chat history');

//       const data: ChatHistory = await res.json();
//       // Format your chats as before...
//       const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
//         const last = messages[messages.length - 1];
//         return {
//           id: email,
//           name: user.name,
//           avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
//           lastMessage: last?.content || '',
//           lastTimestamp: last?.timestamp || '',
//           email: user.email,
//           role: user.role,
//           messages: messages.map((m) => ({
//             id: String(m.id),
//             senderId: m.senderEmail,
//             senderName: m.senderEmail === user.email ? user.name : 'You',
//             text: m.content,
//             timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//             avatarUrl: m.senderEmail === user.email ? user.profileImageUrl || '/default-avatar.jpg' : '/profile.jpg',
//           })),
//         };
//       });
//       formattedChats.sort((a, b) => {
//   const timeA = new Date(a.lastTimestamp).getTime();
//   const timeB = new Date(b.lastTimestamp).getTime();
//   return timeB - timeA; // Descending: latest first
// });

//       //setChats(formattedChats);

//       setChats((realChats) => {
//   const combined = [...formattedChats];

//   // Append any tempChats that don't exist in realChats
//   tempChats.forEach((temp) => {
//     if (!formattedChats.some((c) => c.id === temp.id)) {
//       combined.push(temp);
//     }
//   });

//   return combined;
// });

//       // Set active chat only if none is selected
//       setActiveChatId((prev) => prev || formattedChats[0]?.id || '');

//     } catch (err) {
//       console.error('Chat history fetch error:', err);
//     }
//   };

//   useEffect(() => {
//     // Initial fetch
//     fetchChatHistory();

//     // Set polling interval
//     const intervalId = setInterval(() => {
//       fetchChatHistory();
//     }, 5000); // every 5 seconds

//     // Cleanup on unmount
//     return () => clearInterval(intervalId);
//   }, []);


//   const activeChat = chats.find((c) => c.id === activeChatId);

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !activeChat || !loggedInEmail) return;

//     const userStr = localStorage.getItem('user');
//     const token = userStr ? JSON.parse(userStr).Login_token : null;
//     if (!token) return;

//     const newMsg = {
//       content: newMessage.trim(),
//       receiverEmail: activeChat.email,
//       receiverRole: activeChat.role,
//     };

//     try {
//       const res = await fetch('http://localhost:3000/messages/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newMsg),
//       });

//       if (!res.ok) throw new Error('Message send failed');

//       const created = await res.json();

// const updatedChats = chats.map((chat) => {
//   if (chat.id === activeChatId) {
//     const msg = {
//       id: String(created.id),
//       senderId: loggedInUser?.email || '',
//       senderName: 'You',
//       text: created.content,
//       timestamp: new Date(created.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       avatarUrl: loggedInUser?.profileImageUrl || '/profile.jpg',
//     };
//     return {
//       ...chat,
//       messages: [...chat.messages, msg],
//       lastMessage: msg.text,
//       lastTimestamp: msg.timestamp,
//     };
//   }
//   return chat;
// });

//       setChats(updatedChats);
//       setNewMessage('');
//       setTempChats((prev) => prev.filter((c) => c.id !== activeChatId));
//     } catch (err) {
//       console.error('Send error:', err);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();

//     }
//   };

//   function getInitials(name: string) {
//   return name
//     .split(' ')
//     .map((part) => part[0]?.toUpperCase())
//     .join('')
//     .slice(0, 2); // Max 2 letters
// }


//   return (
//     <div
//       className={`flex h-[calc(100vh-5rem)] rounded-lg overflow-hidden shadow-lg ${
//         darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-gray-900'
//       }`}
//     > {/* Sidebar */}
//       <aside className={`w-80 border-r ${darkMode ? 'border-zinc-700' : 'border-gray-200'} flex flex-col`}>
//   {/* Header */}
//   <header
//     className={`px-6 py-4 font-semibold text-xl border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}
//   >
//     Messages
//   </header>

//   {/* Chat Heads List */}
//   <div className="flex-1 overflow-y-auto">
//     <ul>
//       {chats.map((chat) => {
//         const isActive = chat.id === activeChatId;
//         return (
//           <li
//             key={chat.id}
//             onClick={() => setActiveChatId(chat.id)}
//             className={`flex items-center gap-4 px-4 py-3 cursor-pointer border-l-4 ${
//               isActive
//                 ? 'border-orange-500 bg-orange-600/20'
//                 : darkMode
//                 ? 'hover:bg-zinc-700'
//                 : 'hover:bg-orange-100'
//             }`}
//           >
//             {chat.avatarUrl && !chat.avatarUrl.includes('default-avatar.jpg') ? (
//               <img
//                 src={chat.avatarUrl}
//                 alt={chat.name}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//             ) : (
//               <div className="avatar avatar-placeholder">
//                 <div className="bg-base-300 text-base-content w-12 rounded-full">
//                   <span className="text-sm">
//                     {getInitials(chat.name)}
//                   </span>
//                 </div>
//               </div>
//             )}
//             <div className="flex flex-col flex-grow overflow-hidden">
//               <span
//                 className={`font-medium truncate ${
//                   isActive ? 'text-white' : darkMode ? 'text-zinc-300' : 'text-gray-700'
//                 }`}
//                 title={chat.name}
//               >
//                 {chat.name}
//               </span>
//               <span
//                 className={`truncate text-sm ${
//                   isActive ? 'text-orange-200' : darkMode ? 'text-zinc-400' : 'text-gray-500'
//                 }`}
//                 title={chat.lastMessage}
//               >
//                 {chat.lastMessage}
//               </span>
//             </div>
//             <time
//               className={`text-xs flex-shrink-0 ${
//                 isActive ? 'text-orange-300' : darkMode ? 'text-zinc-400' : 'text-gray-400'
//               }`}
//               dateTime={chat.lastTimestamp}
//             >
//               {chat.lastTimestamp
//                 ? new Date(chat.lastTimestamp).toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })
//                 : ''}
//             </time>
//           </li>
//         );
//       })}
//     </ul>
//   </div>

//   {/* Button Stuck to Bottom */}
//   <div className="px-4 py-3 border-t border-dashed border-orange-300">
//     <button
//       onClick={() => {
//         setIsStartConversationOpen(true);
//         setSearchQuery('');
//         setSearchResults([]);
//       }}
//       className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold"
//     >
//       Start a Conversation
//     </button>
//   </div>
// </aside>

//       {/* Chat View */}
//       <section className="flex flex-col flex-grow">
//       <header className={`flex items-center gap-4 px-6 py-3 border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
//         {activeChat && (
//           activeChat.avatarUrl && !activeChat.avatarUrl.includes('default-avatar.jpg') ? (
//             <img
//               src={activeChat.avatarUrl}
//               alt={activeChat.name}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//           ) : (
//                 <div className="avatar placeholder">
//                   <div className="avatar avatar-placeholder">
//                     <div className="bg-black text-base-content w-12 rounded-full">
//                     <span className="text-sm">
//                         {activeChat.name
//                           .split(' ')
//                           .map((part) => part[0].toUpperCase())
//                           .join('')
//                           .slice(0, 2)}
//                       </span>
//                     </div>
//                   </div>
//               </div>
//              )
//         )}
//         <h2 className="text-lg font-semibold truncate">
//           {activeChat?.name || 'Select a chat'}
//         </h2>
//       </header>


// <main className={`flex-grow px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent ${darkMode ? 'bg-zinc-800' : 'bg-orange-50'}`}>
//   {!activeChat ? (
//     <p className="text-center text-gray-500 mt-20">No conversation selected.</p>
//   ) : (
//     activeChat.messages.map((msg) => {
//       const isSentByUser = msg.senderId === loggedInUser?.email;

//       // Helper: fallback initials
//       const getInitials = (name: string) => {
//         const names = name.split(' ');
//         return names.length === 1
//           ? names[0][0].toUpperCase()
//           : names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
//       };

//       return (
//         <div key={msg.id} className={`flex mb-4 ${isSentByUser ? 'justify-end' : 'justify-start'}`}>
//           {!isSentByUser && (
//             msg.avatarUrl && !msg.avatarUrl.includes('default-avatar.jpg') ? (
//               <img src={msg.avatarUrl} alt={msg.senderName} className="w-8 h-8 rounded-full mr-2 object-cover" />
//             ) : (
//               <div> 
//                 <div className="avatar placeholder mr-3">
//                     <div className="avatar avatar-placeholder">
//                           <div className="bg-base-300 text-base-content w-12 rounded-full">
//                               <span className="text-sm">
//                                 {getInitials(msg.senderName)}
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//               </div>
//             )
//           )}
//           <div className={`max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap break-words text-sm ${
//             isSentByUser
//               ? 'bg-orange-500 text-white rounded-tr-none'
//               : darkMode
//               ? 'bg-zinc-700 text-zinc-100 rounded-bl-none'
//               : 'bg-gray-200 text-gray-900 rounded-bl-none'
//           }`}>
//             {msg.text}
//             <div className="text-xs text-right mt-1 opacity-70">{msg.timestamp}</div>
//           </div>
//           {isSentByUser && <div className="w-8 h-8 ml-2" />}
//         </div>
//       );
//     })
//   )}
//   <div ref={messagesEndRef} />
// </main>


//         {activeChat && (
//           <footer className={`px-6 py-4 border-t flex gap-3 items-center ${darkMode ? 'border-zinc-700 bg-zinc-900' : 'border-gray-200 bg-white'}`}>
//             <textarea
//               rows={1}
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Type your message..."
//               className={`flex-grow resize-none rounded-md border px-4 py-2 focus:outline-none ${
//                 darkMode
//                   ? 'bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-zinc-100 focus:border-orange-400'
//                   : 'bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:border-orange-400'
//               }`}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
//               aria-label="Send message"
//             >
//               Send
//             </button>
//           </footer>
//         )}
//       </section>

//       {isStartConversationOpen && (
//   <>
//     {/* Blurred dark overlay */}
//     <div
//       className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
//       onClick={() => setIsStartConversationOpen(false)} // optional close on background click
//     />

//     {/* Modal */}
//     <div className="animate-slide-down-modal fixed inset-0 z-50 flex items-start justify-center pt-32 px-4">
//       <div className="bg-white dark:bg-zinc-800 w-full max-w-md rounded-lg shadow-lg transform transition-all duration-300">
//         {/* Modal Header */}
//         <div className="flex justify-between items-center p-4 border-b dark:border-zinc-700">
//           <h2 className="text-lg font-semibold">Start Conversation</h2>
//           <button
//             onClick={() => setIsStartConversationOpen(false)}
//             className="text-gray-500 hover:text-red-500 text-xl"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Search Box */}
//         <div className="p-4">
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
//           />
//           <button
//             onClick={handleUserSearch}
//             className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
//           >
//             Search
//           </button>
//         </div>

//         {/* Search Results */}
//         <div className="max-h-72 overflow-y-auto p-4 pt-0">
//           {searchResults.length === 0 ? (
//             <p className="text-center text-sm text-gray-500 dark:text-zinc-400 mt-4">
//               No users found.
//             </p>
//           ) : (
//             <ul className="space-y-3">
//               {searchResults.map((user) => (
//                 <li
//                   key={user.email}
//                   className="p-3 rounded-md border dark:border-zinc-600 hover:bg-orange-50 dark:hover:bg-zinc-700 cursor-pointer"
//                   onClick={() => handleStartNewChat(user)}
//                 >
//                   <div className="flex items-center gap-3">
//                     {user.profileImageUrl ? (
//                       <img
//                         src={user.profileImageUrl}
//                         alt={user.name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="bg-orange-200 w-10 h-10 flex items-center justify-center rounded-full font-bold text-orange-900">
//                         {getInitials(user.name)}
//                       </div>
//                     )}
//                     <div>
//                       <p className="font-medium">{user.name}</p>
//                       <p className="text-sm text-gray-500 dark:text-zinc-400">{user.email}</p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   </>
// )}

//     </div>
//   );
// }





































































////////////////////////////////////////// Searched user do not vanish from chat head after polling ////////////////////////////////////////////////













// 'use client';
// import { div } from 'framer-motion/client';
// import { useState, useEffect, useRef } from 'react';

// interface ChatHistory {
//   [email: string]: {
//     user: User;
//     messages: Message[];
//   };
// }

// type Message = {
//   id: number;
//   senderEmail: string;
//   senderRole: string;
//   receiverEmail: string;
//   receiverRole: string;
//   content: string;
//   seen: boolean;
//   timestamp: string;
// };

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   profileImageUrl: string | null;
//   role: string;
// };

// type Chat = {
//   id: string;
//   name: string;
//   avatarUrl: string;
//   lastMessage: string;
//   lastTimestamp: string;
//   email: string;
//   role: string;
//   messages: {
//     id: string;
//     senderId: string;
//     senderName: string;
//     text: string;
//     timestamp: string;
//     avatarUrl: string;
//   }[];
// };

// type MessengerUIProps = {
//   darkMode: boolean;
// };

// export default function MessengerUI({ darkMode }: MessengerUIProps) {
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [activeChatId, setActiveChatId] = useState<string>('');
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const [loggedInEmail, setLoggedInEmail] = useState<string>('');
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
//   const [tempChats, setTempChats] = useState<Chat[]>([]);
//   const pollingRef = useRef<NodeJS.Timeout | null>(null);
//   const tempChatsRef = useRef<Chat[]>([]);
//   useEffect(() => {
//   tempChatsRef.current = tempChats;
// }, [tempChats]);

//   const [isStartConversationOpen, setIsStartConversationOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<User[]>([]);
//   useEffect(() => {
//   const userStr = localStorage.getItem('user');
//   if (userStr) {
//     const userObj = JSON.parse(userStr);
//     setLoggedInEmail(userObj?.email || '');
//     setLoggedInUser({
//       id: userObj?.id,
//       name: userObj?.name,
//       email: userObj?.email,
//       profileImageUrl: userObj?.profileImageUrl || '/profile.jpg',
//       role: userObj?.role,
//     });
//   }

//   fetchChatHistory();

//   // ✅ Start polling only if not in temp chat
//   pollingRef.current = setInterval(() => {
//     const isTempChat = activeChatId.startsWith('temp-');
//     if (!isTempChat) {
//       fetchChatHistory();
//     }
//   }, 5000);

//   return () => {
//     if (pollingRef.current) {
//       clearInterval(pollingRef.current);
//       pollingRef.current = null;
//     }
//   };
// }, []);

// useEffect(() => {
//   if (!activeChatId.startsWith('temp-')) {
//     fetchChatHistory();
//   }
// }, [activeChatId]);

// const handleUserSearch = async () => {
//   if (!searchQuery.trim()) return;

//   try {
//     const res = await fetch(`http://localhost:3000/admin/search-users?query=${encodeURIComponent(searchQuery.trim())}`);
//     if (!res.ok) throw new Error('Search failed');

//     const users = await res.json();

//     // Only include essential fields for UI (name, email, image, role)
//     const results = users.map((user: any) => ({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       profileImageUrl: user.profileImageUrl,
//       role: user.role,
//     }));

//     setSearchResults(results);
//   } catch (err) {
//     console.error('Search error:', err);
//     setSearchResults([]);
//   }
// };

// const handleStartNewChat = (user: User) => {
//   const existingChat = chats.find((c) => c.email === user.email);

//   if (existingChat) {
//     setActiveChatId(existingChat.id);
//   } else {
//     const newChat: Chat = {
//       id: user.email,
//       name: user.name,
//       avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
//       lastMessage: '',
//       lastTimestamp: '',
//       email: user.email,
//       role: user.role,
//       messages: [],
//     };

//       setChats((prev) => [newChat, ...prev]);
//       setTempChats((prev) => [newChat, ...prev]);
//       setActiveChatId(newChat.id);
//   }

//   // Close modal and reset search
//   setIsStartConversationOpen(false);
//   setSearchQuery('');
//   setSearchResults([]);
// };

//   // Scroll to bottom on update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chats, activeChatId]);

// //   useEffect(() => {
// //   const fetchChatHistory = async () => {
// //     try {
// //       const userStr = localStorage.getItem('user');
// //       const userData = userStr ? JSON.parse(userStr) : null;
// //       const token = userData?.Login_token;

// //       if (!token || !userData?.email) throw new Error('User not authenticated');

// //       setLoggedInUser({
// //         id: userData.id,
// //         name: userData.name,
// //         email: userData.email,
// //         profileImageUrl: userData.profileImageUrl || '/profile.jpg',
// //         role: userData.role,
// //       });

// //       const res = await fetch('http://localhost:3000/messages/chat-history', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!res.ok) throw new Error('Failed to fetch chat history');

// //       const data: ChatHistory = await res.json();

// //       // const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
// //       //   const last = messages[messages.length - 1];
// //       //   return {
// //       //     id: email,
// //       //     name: user.name,
// //       //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
// //       //     lastMessage: last?.content || '',
// //       //     lastTimestamp: new Date(last?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       //     email: user.email,
// //       //     role: user.role,
// //       //     messages: messages.map((m) => {
// //       //       const isUser = m.senderEmail === userData.email;
// //       //       return {
// //       //         id: String(m.id),
// //       //         senderId: m.senderEmail,
// //       //         senderName: isUser ? 'You' : user.name,
// //       //         text: m.content,
// //       //         timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       //         avatarUrl: isUser
// //       //           ? userData.profileImageUrl || '/profile.jpg'
// //       //           : user.profileImageUrl || '/default-avatar.jpg',
// //       //       };
// //       //     }),
// //       //   };
// //       // });

// //   const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
// //   const last = messages[messages.length - 1];
// //   return {
// //     id: email,
// //     name: user.name,
// //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
// //     lastMessage: last?.content || '',
// //     lastTimestamp: last?.timestamp || '', // Store raw timestamp for accurate sorting
// //     email: user.email,
// //     role: user.role,
// //     messages: messages.map((m) => ({
// //       id: String(m.id),
// //       senderId: m.senderEmail,
// //       senderName: m.senderEmail === user.email ? user.name : 'You',
// //       text: m.content,
// //       timestamp: m.timestamp, // Keep raw timestamp for proper use in sorting
// //       avatarUrl: m.senderEmail === user.email
// //         ? user.profileImageUrl || '/default-avatar.jpg'
// //         : '/profile.jpg',
// //     })),
// //   };
// // });

// // // ✅ Sort by actual timestamp (not formatted string)
// // formattedChats.sort((a, b) => {
// //   const aTime = new Date(a.lastTimestamp).getTime();
// //   const bTime = new Date(b.lastTimestamp).getTime();
// //   return bTime - aTime; // latest message first
// // });


// //       setChats(formattedChats);
// //       setActiveChatId(formattedChats[0]?.id || '');

// //     } catch (err) {
// //       console.error('Chat history fetch error:', err);
// //     }
// //   };

// //   fetchChatHistory();
// // }, []);


// const fetchChatHistory = async () => {
//   try {
//     const userStr = localStorage.getItem('user');
//     const token = userStr ? JSON.parse(userStr).Login_token : null;

//     if (!token) throw new Error('User not authenticated');

//     const res = await fetch('http://localhost:3000/messages/chat-history', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) throw new Error('Failed to fetch chat history');

//     const data: ChatHistory = await res.json();

//     const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
//       const last = messages[messages.length - 1];
//       return {
//         id: email,
//         name: user.name,
//         avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
//         lastMessage: last?.content || '',
//         lastTimestamp: last?.timestamp || '',
//         email: user.email,
//         role: user.role,
//         messages: messages.map((m) => ({
//           id: String(m.id),
//           senderId: m.senderEmail,
//           senderName: m.senderEmail === user.email ? user.name : 'You',
//           text: m.content,
//           timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           avatarUrl: m.senderEmail === user.email
//             ? user.profileImageUrl || '/default-avatar.jpg'
//             : '/profile.jpg',
//         })),
//       };
//     });

//     // Sort chats by last timestamp (latest first)
//     formattedChats.sort((a, b) => {
//       const timeA = new Date(a.lastTimestamp).getTime();
//       const timeB = new Date(b.lastTimestamp).getTime();
//       return timeB - timeA;
//     });

//     // ✅ FIX: Preserve temporary chats using tempChatsRef
//     setChats(() => {
//       const combined = [...formattedChats];

//       // Append any temporary chat that isn't already in formatted
//       tempChatsRef.current.forEach((temp) => {
//         if (!formattedChats.some((c) => c.id === temp.id)) {
//           combined.push(temp);
//         }
//       });

//       return combined;
//     });

//     // Set active chat if none is selected
//     setActiveChatId((prev) => prev || formattedChats[0]?.id || '');

//   } catch (err) {
//     console.error('Chat history fetch error:', err);
//   }
// };

// useEffect(() => {
//   tempChatsRef.current = tempChats;
// }, [tempChats]);
//   // useEffect(() => {
//   //   // Initial fetch
//   //   fetchChatHistory();

//   //   // Set polling interval
//   //   const intervalId = setInterval(() => {
//   //     fetchChatHistory();
//   //   }, 5000); // every 5 seconds

//   //   // Cleanup on unmount
//   //   return () => clearInterval(intervalId);
//   // }, []);


//   const activeChat = chats.find((c) => c.id === activeChatId);

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !activeChat || !loggedInEmail) return;

//     const userStr = localStorage.getItem('user');
//     const token = userStr ? JSON.parse(userStr).Login_token : null;
//     if (!token) return;

//     const newMsg = {
//       content: newMessage.trim(),
//       receiverEmail: activeChat.email,
//       receiverRole: activeChat.role,
//     };

//     try {
//       const res = await fetch('http://localhost:3000/messages/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newMsg),
//       });

//       if (!res.ok) throw new Error('Message send failed');

//       const created = await res.json();

// const updatedChats = chats.map((chat) => {
//   if (chat.id === activeChatId) {
//     const msg = {
//       id: String(created.id),
//       senderId: loggedInUser?.email || '',
//       senderName: 'You',
//       text: created.content,
//       timestamp: new Date(created.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       avatarUrl: loggedInUser?.profileImageUrl || '/profile.jpg',
//     };
//     return {
//       ...chat,
//       messages: [...chat.messages, msg],
//       lastMessage: msg.text,
//       lastTimestamp: msg.timestamp,
//     };
//   }
//   return chat;
// });

//       setChats(updatedChats);
//       setNewMessage('');
//       setTempChats((prev) => prev.filter((c) => c.id !== activeChatId));
//     } catch (err) {
//       console.error('Send error:', err);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();

//     }
//   };

// function getInitials(name?: string) {
//   if (!name) return '?';
//   return name
//     .split(' ')
//     .map((part) => part[0]?.toUpperCase())
//     .join('')
//     .slice(0, 2);
// }


//   return (
//     <div
//       className={`flex h-[calc(100vh-5rem)] rounded-lg overflow-hidden shadow-lg ${
//         darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-gray-900'
//       }`}
//     > {/* Sidebar */}
//       <aside className={`w-80 border-r ${darkMode ? 'border-zinc-700' : 'border-gray-200'} flex flex-col`}>
//   {/* Header */}
//   <header
//     className={`px-6 py-4 font-semibold text-xl border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}
//   >
//     Messages
//   </header>

//   {/* Chat Heads List */}
//   <div className="flex-1 overflow-y-auto">
//     <ul>
//       {chats.map((chat) => {
//         const isActive = chat.id === activeChatId;
//         return (
//           <li
//             key={chat.id}
//             onClick={() => setActiveChatId(chat.id)}
//             className={`flex items-center gap-4 px-4 py-3 cursor-pointer border-l-4 ${
//               isActive
//                 ? 'border-orange-500 bg-orange-600/20'
//                 : darkMode
//                 ? 'hover:bg-zinc-700'
//                 : 'hover:bg-orange-100'
//             }`}
//           >
//             {chat.avatarUrl && !chat.avatarUrl.includes('default-avatar.jpg') ? (
//               <img
//                 src={chat.avatarUrl}
//                 alt={chat.name}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//             ) : (
//               <div className="avatar avatar-placeholder">
//                 <div className="bg-base-300 text-base-content w-12 rounded-full">
//                   <span className="text-sm">
//                    {getInitials(chat?.name)}
//                   </span>
//                 </div>
//               </div>
//             )}
//             <div className="flex flex-col flex-grow overflow-hidden">
//               <span
//                 className={`font-medium truncate ${
//                   isActive ? 'text-white' : darkMode ? 'text-zinc-300' : 'text-gray-700'
//                 }`}
//                 title={chat.name}
//               >
//                 {chat.name}
//               </span>
//               <span
//                 className={`truncate text-sm ${
//                   isActive ? 'text-orange-200' : darkMode ? 'text-zinc-400' : 'text-gray-500'
//                 }`}
//                 title={chat.lastMessage}
//               >
//                 {chat.lastMessage}
//               </span>
//             </div>
//             <time
//               className={`text-xs flex-shrink-0 ${
//                 isActive ? 'text-orange-300' : darkMode ? 'text-zinc-400' : 'text-gray-400'
//               }`}
//               dateTime={chat.lastTimestamp}
//             >
//               {chat.lastTimestamp
//                 ? new Date(chat.lastTimestamp).toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })
//                 : ''}
//             </time>
//           </li>
//         );
//       })}
//     </ul>
//   </div>

//   {/* Button Stuck to Bottom */}
//   <div className="px-4 py-3 border-t border-dashed border-orange-300">
//     <button
//       onClick={() => {
//         setIsStartConversationOpen(true);
//         setSearchQuery('');
//         setSearchResults([]);
//       }}
//       className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold"
//     >
//       Start a Conversation
//     </button>
//   </div>
// </aside>

//       {/* Chat View */}
//       <section className="flex flex-col flex-grow">
//       <header className={`flex items-center gap-4 px-6 py-3 border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
//         {activeChat && (
//           activeChat.avatarUrl && !activeChat.avatarUrl.includes('default-avatar.jpg') ? (
//             <img
//               src={activeChat.avatarUrl}
//               alt={activeChat.name}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//           ) : (
//                 <div className="avatar placeholder">
//                   <div className="avatar avatar-placeholder">
//                     <div className="bg-black text-base-content w-12 rounded-full">
//                     <span className="text-sm">
//                       {(activeChat?.name ?? '?')
//                         .split(' ')
//                         .map((part) => part[0]?.toUpperCase())
//                         .join('')
//                         .slice(0, 2)}
//                     </span>
//                     </div>
//                   </div>
//               </div>
//              )
//         )}
//         <h2 className="text-lg font-semibold truncate">
//           {activeChat?.name || 'Select a chat'}
//         </h2>
//       </header>


// <main className={`flex-grow px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent ${darkMode ? 'bg-zinc-800' : 'bg-orange-50'}`}>
//   {!activeChat ? (
//     <p className="text-center text-gray-500 mt-20">No conversation selected.</p>
//   ) : (
//     activeChat.messages.map((msg) => {
//       const isSentByUser = msg.senderId === loggedInUser?.email;

//       // Helper: fallback initials
//       const getInitials = (name: string) => {
//         const names = name.split(' ');
//         return names.length === 1
//           ? names[0][0].toUpperCase()
//           : names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
//       };

//       return (
//         <div key={msg.id} className={`flex mb-4 ${isSentByUser ? 'justify-end' : 'justify-start'}`}>
//           {!isSentByUser && (
//             msg.avatarUrl && !msg.avatarUrl.includes('default-avatar.jpg') ? (
//               <img src={msg.avatarUrl} alt={msg.senderName} className="w-8 h-8 rounded-full mr-2 object-cover" />
//             ) : (
//               <div> 
//                 <div className="avatar placeholder mr-3">
//                     <div className="avatar avatar-placeholder">
//                           <div className="bg-base-300 text-base-content w-12 rounded-full">
//                               <span className="text-sm">
//                                {getInitials(msg?.senderName)}
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//               </div>
//             )
//           )}
//           <div className={`max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap break-words text-sm ${
//             isSentByUser
//               ? 'bg-orange-500 text-white rounded-tr-none'
//               : darkMode
//               ? 'bg-zinc-700 text-zinc-100 rounded-bl-none'
//               : 'bg-gray-200 text-gray-900 rounded-bl-none'
//           }`}>
//             {msg.text}
//             <div className="text-xs text-right mt-1 opacity-70">{msg.timestamp}</div>
//           </div>
//           {isSentByUser && <div className="w-8 h-8 ml-2" />}
//         </div>
//       );
//     })
//   )}
//   <div ref={messagesEndRef} />
// </main>


//         {activeChat && (
//           <footer className={`px-6 py-4 border-t flex gap-3 items-center ${darkMode ? 'border-zinc-700 bg-zinc-900' : 'border-gray-200 bg-white'}`}>
//             <textarea
//               rows={1}
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Type your message..."
//               className={`flex-grow resize-none rounded-md border px-4 py-2 focus:outline-none ${
//                 darkMode
//                   ? 'bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-zinc-100 focus:border-orange-400'
//                   : 'bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:border-orange-400'
//               }`}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
//               aria-label="Send message"
//             >
//               Send
//             </button>
//           </footer>
//         )}
//       </section>

//       {isStartConversationOpen && (
//   <>
//     {/* Blurred dark overlay */}
//     <div
//       className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
//       onClick={() => setIsStartConversationOpen(false)} // optional close on background click
//     />

//     {/* Modal */}
//     <div className="animate-slide-down-modal fixed inset-0 z-50 flex items-start justify-center pt-32 px-4">
//       <div className="bg-white dark:bg-zinc-800 w-full max-w-md rounded-lg shadow-lg transform transition-all duration-300">
//         {/* Modal Header */}
//         <div className="flex justify-between items-center p-4 border-b dark:border-zinc-700">
//           <h2 className="text-lg font-semibold">Start Conversation</h2>
//           <button
//             onClick={() => setIsStartConversationOpen(false)}
//             className="text-gray-500 hover:text-red-500 text-xl"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Search Box */}
//         <div className="p-4">
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
//           />
//           <button
//             onClick={handleUserSearch}
//             className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
//           >
//             Search
//           </button>
//         </div>

//         {/* Search Results */}
//         <div className="max-h-72 overflow-y-auto p-4 pt-0">
//           {searchResults.length === 0 ? (
//             <p className="text-center text-sm text-gray-500 dark:text-zinc-400 mt-4">
//               No users found.
//             </p>
//           ) : (
//             <ul className="space-y-3">
//               {searchResults.map((user) => (
//                 <li
//                   key={user.email}
//                   className="p-3 rounded-md border dark:border-zinc-600 hover:bg-orange-50 dark:hover:bg-zinc-700 cursor-pointer"
//                   onClick={() => handleStartNewChat(user)}
//                 >
//                   <div className="flex items-center gap-3">
//                     {user.profileImageUrl ? (
//                       <img
//                         src={user.profileImageUrl}
//                         alt={user.name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="bg-orange-200 w-10 h-10 flex items-center justify-center rounded-full font-bold text-orange-900">
//                         {getInitials(user?.name)}
//                       </div>
//                     )}
//                     <div>
//                       <p className="font-medium">{user.name}</p>
//                       <p className="text-sm text-gray-500 dark:text-zinc-400">{user.email}</p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   </>
// )}

//     </div>
//   );
// }




















































'use client';
import { div } from 'framer-motion/client';
import { useState, useEffect, useRef } from 'react';

interface ChatHistory {
  [email: string]: {
    user: User;
    messages: Message[];
  };
}

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

type User = {
  id: number;
  name: string;
  email: string;
  profileImageUrl: string | null;
  role: string;
};

type Chat = {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastTimestamp: string;
  email: string;
  role: string;
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    text: string;
    timestamp: string;
    avatarUrl: string;
  }[];
};

type MessengerUIProps = {
  darkMode: boolean;
};

export default function MessengerUI({ darkMode }: MessengerUIProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [loggedInEmail, setLoggedInEmail] = useState<string>('');
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [tempChats, setTempChats] = useState<Chat[]>([]);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const tempChatsRef = useRef<Chat[]>([]);
  useEffect(() => {
    tempChatsRef.current = tempChats;
  }, [tempChats]);

  const [isStartConversationOpen, setIsStartConversationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      setLoggedInEmail(userObj?.email || '');
      setLoggedInUser({
        id: userObj?.id,
        name: userObj?.name,
        email: userObj?.email,
        profileImageUrl: userObj?.profileImageUrl || '/profile.jpg',
        role: userObj?.role,
      });
    }

    fetchChatHistory();

    // ✅ Start polling only if not in temp chat
    pollingRef.current = setInterval(() => {
      const isTempChat = activeChatId.startsWith('temp-');
      if (!isTempChat) {
        fetchChatHistory();
      }
    }, 5000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!activeChatId.startsWith('temp-')) {
      fetchChatHistory();
    }
  }, [activeChatId]);

  const handleUserSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(`http://localhost:3000/admin/search-users?query=${encodeURIComponent(searchQuery.trim())}`);
      if (!res.ok) throw new Error('Search failed');

      const users = await res.json();

      // Only include essential fields for UI (name, email, image, role)
      const results = users.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
      }));

      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    }
  };

  const handleStartNewChat = (user: User) => {
    const existingChat = chats.find((c) => c.email === user.email);

    if (existingChat) {
      setActiveChatId(existingChat.id);
    } else {
      const newChat: Chat = {
        id: user.email,
        name: user.name ?? 'Unknown',
        avatarUrl: user.profileImageUrl ?? '/default-avatar.jpg',
        lastMessage: '',
        lastTimestamp: '',
        email: user.email,
        role: user.role,
        messages: [],
      };

      setChats((prev) => {
        const existing = prev.find((c) => c.id === newChat.id);
        return existing ? prev : [newChat, ...prev];
      });

      setTempChats((prev) => {
        const existing = prev.find((c) => c.id === newChat.id);
        return existing ? prev : [newChat, ...prev];
      });

      setActiveChatId(newChat.id);
    }

    // Close modal and reset search
    setIsStartConversationOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Scroll to bottom on update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeChatId]);

  //   useEffect(() => {
  //   const fetchChatHistory = async () => {
  //     try {
  //       const userStr = localStorage.getItem('user');
  //       const userData = userStr ? JSON.parse(userStr) : null;
  //       const token = userData?.Login_token;

  //       if (!token || !userData?.email) throw new Error('User not authenticated');

  //       setLoggedInUser({
  //         id: userData.id,
  //         name: userData.name,
  //         email: userData.email,
  //         profileImageUrl: userData.profileImageUrl || '/profile.jpg',
  //         role: userData.role,
  //       });

  //       const res = await fetch('http://localhost:3000/messages/chat-history', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!res.ok) throw new Error('Failed to fetch chat history');

  //       const data: ChatHistory = await res.json();

  //       // const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
  //       //   const last = messages[messages.length - 1];
  //       //   return {
  //       //     id: email,
  //       //     name: user.name,
  //       //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
  //       //     lastMessage: last?.content || '',
  //       //     lastTimestamp: new Date(last?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //       //     email: user.email,
  //       //     role: user.role,
  //       //     messages: messages.map((m) => {
  //       //       const isUser = m.senderEmail === userData.email;
  //       //       return {
  //       //         id: String(m.id),
  //       //         senderId: m.senderEmail,
  //       //         senderName: isUser ? 'You' : user.name,
  //       //         text: m.content,
  //       //         timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //       //         avatarUrl: isUser
  //       //           ? userData.profileImageUrl || '/profile.jpg'
  //       //           : user.profileImageUrl || '/default-avatar.jpg',
  //       //       };
  //       //     }),
  //       //   };
  //       // });

  //   const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
  //   const last = messages[messages.length - 1];
  //   return {
  //     id: email,
  //     name: user.name,
  //     avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
  //     lastMessage: last?.content || '',
  //     lastTimestamp: last?.timestamp || '', // Store raw timestamp for accurate sorting
  //     email: user.email,
  //     role: user.role,
  //     messages: messages.map((m) => ({
  //       id: String(m.id),
  //       senderId: m.senderEmail,
  //       senderName: m.senderEmail === user.email ? user.name : 'You',
  //       text: m.content,
  //       timestamp: m.timestamp, // Keep raw timestamp for proper use in sorting
  //       avatarUrl: m.senderEmail === user.email
  //         ? user.profileImageUrl || '/default-avatar.jpg'
  //         : '/profile.jpg',
  //     })),
  //   };
  // });

  // // ✅ Sort by actual timestamp (not formatted string)
  // formattedChats.sort((a, b) => {
  //   const aTime = new Date(a.lastTimestamp).getTime();
  //   const bTime = new Date(b.lastTimestamp).getTime();
  //   return bTime - aTime; // latest message first
  // });


  //       setChats(formattedChats);
  //       setActiveChatId(formattedChats[0]?.id || '');

  //     } catch (err) {
  //       console.error('Chat history fetch error:', err);
  //     }
  //   };

  //   fetchChatHistory();
  // }, []);


  const fetchChatHistory = async () => {
    try {
      const userStr = localStorage.getItem('user');
      const token = userStr ? JSON.parse(userStr).Login_token : null;

      if (!token) throw new Error('User not authenticated');

      const res = await fetch('http://localhost:3000/messages/chat-history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch chat history');

      const data: ChatHistory = await res.json();

      const formattedChats: Chat[] = Object.entries(data).map(([email, { user, messages }]) => {
        const last = messages[messages.length - 1];
        return {
          id: email,
          name: user.name,
          avatarUrl: user.profileImageUrl || '/default-avatar.jpg',
          lastMessage: last?.content || '',
          lastTimestamp: last?.timestamp || '',
          email: user.email,
          role: user.role,
          messages: messages.map((m) => ({
            id: String(m.id),
            senderId: m.senderEmail,
            senderName: m.senderEmail === user.email ? user.name : 'You',
            text: m.content,
            timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatarUrl: m.senderEmail === user.email
              ? user.profileImageUrl || '/default-avatar.jpg'
              : '/profile.jpg',
          })),
        };
      });

      // Sort chats by last timestamp (latest first)
      formattedChats.sort((a, b) => {
        const timeA = new Date(a.lastTimestamp).getTime();
        const timeB = new Date(b.lastTimestamp).getTime();
        return timeB - timeA;
      });

      // ✅ FIX: Preserve temporary chats using tempChatsRef
      setChats(() => {
        const combined = [...formattedChats];

        // Append any temporary chat that isn't already in formatted
        tempChatsRef.current.forEach((temp) => {
          if (!formattedChats.some((c) => c.id === temp.id)) {
            combined.push(temp);
          }
        });

        return combined;
      });

      // Set active chat if none is selected
      setActiveChatId((prev) => prev || formattedChats[0]?.id || '');

    } catch (err) {
      console.error('Chat history fetch error:', err);
    }
  };

  useEffect(() => {
    tempChatsRef.current = tempChats;
  }, [tempChats]);
  // useEffect(() => {
  //   // Initial fetch
  //   fetchChatHistory();

  //   // Set polling interval
  //   const intervalId = setInterval(() => {
  //     fetchChatHistory();
  //   }, 5000); // every 5 seconds

  //   // Cleanup on unmount
  //   return () => clearInterval(intervalId);
  // }, []);


  const activeChat = chats.find((c) => c.id === activeChatId);

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat || !loggedInEmail || !loggedInUser) return;

    const userStr = localStorage.getItem('user');
    const token = userStr ? JSON.parse(userStr).Login_token : null;
    if (!token) return;

    const newMsg = {
      content: newMessage.trim(),
      receiverEmail: activeChat.email,
      receiverRole: activeChat.role.toLowerCase(),
    };

    try {
      const res = await fetch('http://localhost:3000/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMsg),
      });

      if (!res.ok) throw new Error('Message send failed');
      const created = await res.json();

      const msg = {
        id: String(created.id),
        senderId: loggedInUser.email,
        senderName: 'You',
        text: created.content,
        timestamp: new Date(created.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        avatarUrl: loggedInUser.profileImageUrl || '/profile.jpg',
      };

      setChats((prevChats) => {
        const existing = prevChats.find((chat) => chat.id === activeChatId);

        if (existing) {
          return prevChats.map((chat) =>
            chat.id === activeChatId
              ? {
                ...chat,
                name: chat.name || activeChat.name,
                avatarUrl: chat.avatarUrl || activeChat.avatarUrl,
                role: chat.role || activeChat.role,
                email: chat.email || activeChat.email,
                messages: [...chat.messages, msg],
                lastMessage: msg.text,
                lastTimestamp: msg.timestamp,
              }
              : chat
          );
        } else {
          // First-time new chat, not in list
          const newChat: Chat = {
            id: activeChat.email,
            name: activeChat.name || 'Unknown',
            avatarUrl: activeChat.avatarUrl || '/default-avatar.jpg',
            lastMessage: msg.text,
            lastTimestamp: msg.timestamp,
            email: activeChat.email,
            role: activeChat.role,
            messages: [msg],
          };
          return [newChat, ...prevChats];
        }
      });

      setTempChats((prev) => prev.filter((c) => c.id !== activeChatId));
      setNewMessage('');
    } catch (err) {
      console.error('Send error:', err);
    }
  };



  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();

    }
  };

  function getInitials(name: string = 'User') {
    return name
      .split(' ')
      .map((part) => part[0]?.toUpperCase())
      .join('')
      .slice(0, 2); // Max 2 letters
  }


  return (
    <div
      className={`flex h-[calc(100vh-5rem)] rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-gray-900'
        }`}
    > {/* Sidebar */}
      <aside className={`w-80 border-r ${darkMode ? 'border-zinc-700' : 'border-gray-200'} flex flex-col`}>
        {/* Header */}
        <header
          className={`px-6 py-4 font-semibold text-xl border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}
        >
          Messages
        </header>

        {/* Chat Heads List */}
        <div className="flex-1 overflow-y-auto">
          <ul>
            {chats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <li
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`flex items-center gap-4 px-4 py-3 cursor-pointer border-l-4 ${isActive
                      ? 'border-orange-500 bg-orange-600/20'
                      : darkMode
                        ? 'hover:bg-zinc-700'
                        : 'hover:bg-orange-100'
                    }`}
                >
                  {chat.avatarUrl && !chat.avatarUrl.includes('default-avatar.jpg') ? (
                    <img
                      src={chat.avatarUrl}
                      alt={chat.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="avatar avatar-placeholder">
                      <div className="bg-base-300 text-base-content w-12 rounded-full">
                        <span className="text-sm">
                          {getInitials(chat.name || chat.email || 'User')}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col flex-grow overflow-hidden">
                    <span
                      className={`font-medium truncate ${isActive ? 'text-white' : darkMode ? 'text-zinc-300' : 'text-gray-700'
                        }`}
                      title={chat.name}
                    >
                      {chat.name}
                    </span>
                    <span
                      className={`truncate text-sm ${isActive ? 'text-orange-200' : darkMode ? 'text-zinc-400' : 'text-gray-500'
                        }`}
                      title={chat.lastMessage}
                    >
                      {chat.lastMessage}
                    </span>
                  </div>
                  <time
                    className={`text-xs flex-shrink-0 ${isActive ? 'text-orange-300' : darkMode ? 'text-zinc-400' : 'text-gray-400'
                      }`}
                    dateTime={chat.lastTimestamp}
                  >
                    {chat.lastTimestamp
                      ? new Date(chat.lastTimestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                      : ''}
                  </time>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Button Stuck to Bottom */}
        <div className="px-4 py-3 border-t border-dashed border-orange-300">
          <button
            onClick={() => {
              setIsStartConversationOpen(true);
              setSearchQuery('');
              setSearchResults([]);
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold"
          >
            Start a Conversation
          </button>
        </div>
      </aside>

      {/* Chat View */}
      <section className="flex flex-col flex-grow">
        <header className={`flex items-center gap-4 px-6 py-3 border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
          {activeChat && (
            activeChat.avatarUrl && !activeChat.avatarUrl.includes('default-avatar.jpg') ? (
              <img
                src={activeChat.avatarUrl}
                alt={activeChat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="avatar placeholder">
                <div className="avatar avatar-placeholder">
                  <div className="bg-black text-base-content w-12 rounded-full">
                    <span className="text-sm">
                      {(activeChat?.name ?? '?')
                        .split(' ')
                        .map((part) => part[0]?.toUpperCase())
                        .join('')
                        .slice(0, 2)}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
          <h2 className="text-lg font-semibold truncate">
            {activeChat?.name || 'Select a chat'}
          </h2>
        </header>


        <main className={`flex-grow px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent ${darkMode ? 'bg-zinc-800' : 'bg-orange-50'}`}>
          {!activeChat ? (
            <p className="text-center text-gray-500 mt-20">No conversation selected.</p>
          ) : (
            activeChat.messages.map((msg) => {
              const isSentByUser = msg.senderId === loggedInUser?.email;

              // Helper: fallback initials
              const getInitials = (name: string) => {
                const names = name.split(' ');
                return names.length === 1
                  ? names[0][0].toUpperCase()
                  : names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
              };

              return (
                <div key={msg.id} className={`flex mb-4 ${isSentByUser ? 'justify-end' : 'justify-start'}`}>
                  {!isSentByUser && (
                    msg.avatarUrl && !msg.avatarUrl.includes('default-avatar.jpg') ? (
                      <img src={msg.avatarUrl} alt={msg.senderName} className="w-8 h-8 rounded-full mr-2 object-cover" />
                    ) : (
                      <div>
                        <div className="avatar placeholder mr-3">
                          <div className="avatar avatar-placeholder">
                            <div className="bg-base-300 text-base-content w-12 rounded-full">
                              <span className="text-sm">
                                {getInitials(msg?.senderName)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  <div className={`max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-wrap break-words text-sm ${isSentByUser
                      ? 'bg-orange-500 text-white rounded-tr-none'
                      : darkMode
                        ? 'bg-zinc-700 text-zinc-100 rounded-bl-none'
                        : 'bg-gray-200 text-gray-900 rounded-bl-none'
                    }`}>
                    {msg.text}
                    <div className="text-xs text-right mt-1 opacity-70">{msg.timestamp}</div>
                  </div>
                  {isSentByUser && <div className="w-8 h-8 ml-2" />}
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </main>


        {activeChat && (
          <footer className={`px-6 py-4 border-t flex gap-3 items-center ${darkMode ? 'border-zinc-700 bg-zinc-900' : 'border-gray-200 bg-white'}`}>
            <textarea
              rows={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className={`flex-grow resize-none rounded-md border px-4 py-2 focus:outline-none ${darkMode
                  ? 'bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-zinc-100 focus:border-orange-400'
                  : 'bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:border-orange-400'
                }`}
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
              aria-label="Send message"
            >
              Send
            </button>
          </footer>
        )}
      </section>

      {isStartConversationOpen && (
        <>
          {/* Blurred dark overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsStartConversationOpen(false)} // optional close on background click
          />

          {/* Modal */}
          <div className="animate-slide-down-modal fixed inset-0 z-50 flex items-start justify-center pt-32 px-4">
            <div className="bg-white dark:bg-zinc-800 w-full max-w-md rounded-lg shadow-lg transform transition-all duration-300">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b dark:border-zinc-700">
                <h2 className="text-lg font-semibold">Start Conversation</h2>
                <button
                  onClick={() => setIsStartConversationOpen(false)}
                  className="text-gray-500 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
              </div>

              {/* Search Box */}
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
                />
                <button
                  onClick={handleUserSearch}
                  className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
                >
                  Search
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-72 overflow-y-auto p-4 pt-0">
                {searchResults.length === 0 ? (
                  <p className="text-center text-sm text-gray-500 dark:text-zinc-400 mt-4">
                    No users found.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {searchResults.map((user) => (
                      <li
                        key={user.email}
                        className="p-3 rounded-md border dark:border-zinc-600 hover:bg-orange-50 dark:hover:bg-zinc-700 cursor-pointer"
                        onClick={() => handleStartNewChat(user)}
                      >
                        <div className="flex items-center gap-3">
                          {user.profileImageUrl ? (
                            <img
                              src={user.profileImageUrl}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="bg-orange-200 w-10 h-10 flex items-center justify-center rounded-full font-bold text-orange-900">
                              {getInitials(user?.name)}
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-zinc-400">{user.email}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}