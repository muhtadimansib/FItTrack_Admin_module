// 'use client'
// import CommonLayout from "../layouts/commonLayout";


// export default function SettingsPage() {

//   return (
//     <CommonLayout activePage="Inbox">
//       {({ darkMode }) => (
//         <>
//           <div><h1>Message Content here</h1></div>
//         </>
//       )}
//     </CommonLayout>
//   );
// }









// 'use client'

// import React, { useEffect, useState, useRef } from "react";
// import CommonLayout from "../layouts/commonLayout";

// const BACKEND_URL = "http://localhost:3000";

// interface Message {
//   id: number;
//   senderEmail: string;
//   senderRole: string;
//   receiverEmail: string;
//   receiverRole: string;
//   content: string;
//   seen: boolean;
//   timestamp: string;
// }

// export default function SettingsPage() {
//   const [inbox, setInbox] = useState<Message[]>([]);
//   const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);
//   const [conversation, setConversation] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loadingConversation, setLoadingConversation] = useState(false);
//   const [loadingInbox, setLoadingInbox] = useState(false);
//   const conversationEndRef = useRef<HTMLDivElement>(null);

//   function getToken(): string | null {
//     const userStr = localStorage.getItem("user");
//     if (!userStr) return null;
//     try {
//       const parsed = JSON.parse(userStr);
//       return parsed.Login_token ?? null;
//     } catch {
//       return null;
//     }
//   }

//   const fetchInbox = async () => {
//     setLoadingInbox(true);
//     try {
//       const token = getToken();
//       if (!token) {
//         console.error("No token found. Please login.");
//         setInbox([]);
//         setLoadingInbox(false);
//         return;
//       }
//       const res = await fetch(`${BACKEND_URL}/messages/inbox`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch inbox");
//       const data: Message[] = await res.json();
//       setInbox(data);
//     } catch (error) {
//       console.error("Error fetching inbox:", error);
//       setInbox([]);
//     } finally {
//       setLoadingInbox(false);
//     }
//   };

//   const fetchConversation = async (email: string) => {
//     setLoadingConversation(true);
//     try {
//       const token = getToken();
//       if (!token) {
//         console.error("No token found. Please login.");
//         setConversation([]);
//         setLoadingConversation(false);
//         return;
//       }
//       const res = await fetch(`${BACKEND_URL}/messages/conversation/${encodeURIComponent(email)}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch conversation");
//       const data: Message[] = await res.json();
//       setConversation(data);
//       scrollToBottom();
//     } catch (error) {
//       console.error("Error fetching conversation:", error);
//       setConversation([]);
//     } finally {
//       setLoadingConversation(false);
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !selectedUserEmail) return;

//     try {
//       const token = getToken();
//       if (!token) {
//         console.error("No token found. Please login.");
//         return;
//       }
//       const body = {
//         receiverEmail: selectedUserEmail,
//         receiverRole: "trainer", // Adjust as needed
//         content: newMessage.trim(),
//       };

//       const res = await fetch(`${BACKEND_URL}/messages/send`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });

//       if (!res.ok) throw new Error("Failed to send message");
//       const savedMessage = await res.json();

//       setConversation((prev) => [...prev, savedMessage]);
//       setNewMessage("");
//       scrollToBottom();
//       await fetchInbox(); // refresh inbox to reflect new message
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const scrollToBottom = () => {
//     conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Poll inbox every 5 seconds
//   useEffect(() => {
//     fetchInbox();
//     const interval = setInterval(fetchInbox, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Poll conversation every 3 seconds when selectedUserEmail changes
//   useEffect(() => {
//     if (!selectedUserEmail) {
//       setConversation([]);
//       return;
//     }

//     fetchConversation(selectedUserEmail);
//     const interval = setInterval(() => fetchConversation(selectedUserEmail), 3000);

//     return () => clearInterval(interval);
//   }, [selectedUserEmail]);

//   return (
//     <CommonLayout activePage="Inbox">
//       {({ darkMode }) => (
//         <div className={`flex h-[calc(100vh-64px)] ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
//           {/* Sidebar - Inbox Users */}
//           <div className="w-1/3 border-r border-gray-300 overflow-y-auto">
//             <h2 className="p-4 font-bold text-xl border-b border-gray-300">Inbox</h2>
//             {loadingInbox ? (
//               <div className="p-4">Loading inbox...</div>
//             ) : inbox.length === 0 ? (
//               <div className="p-4 text-gray-500">No messages.</div>
//             ) : (
//               <ul>
//                 {Array.from(
//                   inbox.reduce((map, msg) => {
//                     const userEmail = msg.senderEmail === "admin@example.com" ? msg.receiverEmail : msg.senderEmail;
//                     if (!map.has(userEmail)) map.set(userEmail, msg);
//                     return map;
//                   }, new Map<string, Message>()).values()
//                 ).map((msg) => {
//                   const userEmail = msg.senderEmail === "admin@example.com" ? msg.receiverEmail : msg.senderEmail;
//                   return (
//                     <li
//                       key={msg.id}
//                       onClick={() => setSelectedUserEmail(userEmail)}
//                       className={`cursor-pointer p-3 border-b border-gray-300 hover:bg-gray-200 ${
//                         selectedUserEmail === userEmail ? "bg-blue-500 text-white" : ""
//                       }`}
//                     >
//                       <div className="flex justify-between">
//                         <span>{userEmail}</span>
//                         {!msg.seen && (
//                           <span className="bg-red-600 rounded-full px-2 text-xs font-bold">New</span>
//                         )}
//                       </div>
//                       <div className="truncate">{msg.content}</div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </div>

//           {/* Conversation and Send Box */}
//           <div className="flex-1 flex flex-col">
//             <div className="p-4 border-b border-gray-300 font-semibold">
//               Conversation with: {selectedUserEmail ?? <em>Select a user</em>}
//             </div>

//             <div
//               className="flex-1 overflow-y-auto p-4 space-y-4"
//               style={{ backgroundColor: darkMode ? "#111827" : "#f9fafb" }}
//             >
//               {loadingConversation ? (
//                 <div>Loading conversation...</div>
//               ) : conversation.length === 0 ? (
//                 <div className="text-gray-500 italic">No conversation to display.</div>
//               ) : (
//                 conversation.map((msg) => {
//                   const isSender = msg.senderEmail === "admin@example.com";
//                   return (
//                     <div
//                       key={msg.id}
//                       className={`max-w-xl p-2 rounded ${
//                         isSender ? "bg-blue-600 text-white ml-auto" : "bg-gray-300 text-black mr-auto"
//                       }`}
//                     >
//                       <div className="text-sm">{msg.content}</div>
//                       <div className="text-xs mt-1 text-gray-600">
//                         {new Date(msg.timestamp).toLocaleString()}
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//               <div ref={conversationEndRef} />
//             </div>

//             {/* Send Message */}
//             {selectedUserEmail && (
//               <div className="p-4 border-t border-gray-300 flex space-x-2">
//                 <input
//                   type="text"
//                   className="flex-1 border border-gray-400 rounded px-3 py-2"
//                   placeholder="Type your message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       sendMessage();
//                     }
//                   }}
//                 />
//                 <button
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   onClick={sendMessage}
//                   disabled={!newMessage.trim()}
//                 >
//                   Send
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </CommonLayout>
//   );
// }



















































// 'use client'

// import React, { useEffect, useState, useRef } from "react";
// import CommonLayout from "../layouts/commonLayout";

// const BACKEND_URL = "http://localhost:3000";

// interface Message {
//   id: number;
//   senderEmail: string;
//   senderRole: string;
//   receiverEmail: string;
//   receiverRole: string;
//   content: string;
//   seen: boolean;
//   timestamp: string;
// }

// export default function SettingsPage() {
//   const [inbox, setInbox] = useState<Message[]>([]);
//   const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);
//   const [conversation, setConversation] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loadingConversation, setLoadingConversation] = useState(false);
//   const [loadingInbox, setLoadingInbox] = useState(false);
//   const conversationEndRef = useRef<HTMLDivElement>(null);

//   function getToken(): string | null {
//     const userStr = localStorage.getItem("user");
//     if (!userStr) return null;
//     try {
//       const parsed = JSON.parse(userStr);
//       return parsed.Login_token ?? null;
//     } catch {
//       return null;
//     }
//   }

//   const fetchInbox = async () => {
//     setLoadingInbox(true);
//     try {
//       const token = getToken();
//       if (!token) {
//         console.error("No token found. Please login.");
//         setInbox([]);
//         setLoadingInbox(false);
//         return;
//       }
//       const res = await fetch(`${BACKEND_URL}/messages/inbox`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch inbox");
//       const data: Message[] = await res.json();
//       setInbox(data);
//     } catch (error) {
//       console.error("Error fetching inbox:", error);
//       setInbox([]);
//     } finally {
//       setLoadingInbox(false);
//     }
//   };

//   const fetchConversation = async (email: string) => {
//     setLoadingConversation(true);
//     try {
//       const token = getToken();
//       if (!token) {
//         console.error("No token found. Please login.");
//         setConversation([]);
//         setLoadingConversation(false);
//         return;
//       }
//       const res = await fetch(`${BACKEND_URL}/messages/conversation/${encodeURIComponent(email)}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch conversation");
//       const data: Message[] = await res.json();
//       setConversation(data);
//       scrollToBottom();
//     } catch (error) {
//       console.error("Error fetching conversation:", error);
//       setConversation([]);
//     } finally {
//       setLoadingConversation(false);
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !selectedUserEmail) return;

//     try {
//       const token = getToken();
//       if (!token) {
//         console.error("No token found. Please login.");
//         return;
//       }
//       const body = {
//         receiverEmail: selectedUserEmail,
//         receiverRole: "trainer", // Adjust as needed
//         content: newMessage.trim(),
//       };

//       const res = await fetch(`${BACKEND_URL}/messages/send`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });

//       if (!res.ok) throw new Error("Failed to send message");
//       const savedMessage = await res.json();

//       setConversation((prev) => [...prev, savedMessage]);
//       setNewMessage("");
//       scrollToBottom();
//       await fetchInbox(); // refresh inbox to reflect new message
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const scrollToBottom = () => {
//     conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     fetchInbox();
//     const interval = setInterval(fetchInbox, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (!selectedUserEmail) {
//       setConversation([]);
//       return;
//     }

//     fetchConversation(selectedUserEmail);
//     const interval = setInterval(() => fetchConversation(selectedUserEmail), 3000);

//     return () => clearInterval(interval);
//   }, [selectedUserEmail]);

//   return (
//     <CommonLayout activePage="Inbox">
//       {({ darkMode }) => (
//         <div className={`flex h-[calc(100vh-64px)] ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
//           {/* Sidebar - Inbox Users */}
//           <div className="w-1/3 border-r border-gray-300 overflow-y-auto bg-white dark:bg-gray-800">
//             <h2 className="p-4 font-bold text-xl border-b border-gray-300 dark:border-gray-700">Inbox</h2>
//             {loadingInbox ? (
//               <div className="p-4">Loading inbox...</div>
//             ) : inbox.length === 0 ? (
//               <div className="p-4 text-gray-500 dark:text-gray-400">No messages.</div>
//             ) : (
//               <ul>
//                 {Array.from(
//                   inbox.reduce((map, msg) => {
//                     const userEmail = msg.senderEmail === "admin@example.com" ? msg.receiverEmail : msg.senderEmail;
//                     if (!map.has(userEmail)) map.set(userEmail, msg);
//                     return map;
//                   }, new Map<string, Message>()).values()
//                 ).map((msg) => {
//                   const userEmail = msg.senderEmail === "admin@example.com" ? msg.receiverEmail : msg.senderEmail;
//                   return (
//                     <li
//                       key={msg.id}
//                       onClick={() => setSelectedUserEmail(userEmail)}
//                       className={`cursor-pointer p-3 border-b border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 rounded ${
//                         selectedUserEmail === userEmail
//                           ? "bg-blue-600 text-white font-semibold"
//                           : "text-gray-900 dark:text-gray-300"
//                       }`}
//                     >
//                       <div className="flex justify-between">
//                         <span className="truncate">{userEmail}</span>
//                         {!msg.seen && (
//                           <span className="bg-red-600 rounded-full px-2 text-xs font-bold">New</span>
//                         )}
//                       </div>
//                       <div className="truncate text-sm opacity-80">{msg.content}</div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </div>

//           {/* Conversation and Send Box */}
//           <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
//             {/* Header */}
//             <div className="p-4 border-b border-gray-300 dark:border-gray-700 flex items-center space-x-4">
//               <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg uppercase">
//                 {selectedUserEmail ? selectedUserEmail.charAt(0) : "?"}
//               </div>
//               <div className="font-semibold text-lg truncate">
//                 {selectedUserEmail ?? <em>Select a user</em>}
//               </div>
//             </div>

//             {/* Messages List */}
//             <div
//               className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
//               style={{ backgroundColor: darkMode ? "#121212" : "#f0f2f5" }}
//             >
//               {loadingConversation ? (
//                 <div className="text-center text-gray-500">Loading conversation...</div>
//               ) : conversation.length === 0 ? (
//                 <div className="text-center text-gray-500 italic">No conversation to display.</div>
//               ) : (
//                 conversation.map((msg) => {
//                   const isSender = msg.senderEmail === "admin@example.com";
//                   return (
//                     <div
//                       key={msg.id}
//                       className={`max-w-[70%] px-4 py-2 rounded-lg shadow-md break-words ${
//                         isSender
//                           ? "bg-blue-600 text-white ml-auto rounded-br-none"
//                           : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-200 rounded-bl-none"
//                       }`}
//                       title={new Date(msg.timestamp).toLocaleString()}
//                     >
//                       <div>{msg.content}</div>
//                       <div className="text-xs mt-1 opacity-70 text-right select-none">
//                         {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//               <div ref={conversationEndRef} />
//             </div>

//             {/* Send Message */}
//             {selectedUserEmail && (
//               <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex space-x-3 bg-white dark:bg-gray-900">
//                 <input
//                   type="text"
//                   className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//                   placeholder="Type a message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       sendMessage();
//                     }
//                   }}
//                   autoComplete="off"
//                 />
//                 <button
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
//                   onClick={sendMessage}
//                   disabled={!newMessage.trim()}
//                   aria-label="Send message"
//                 >
//                   Send
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </CommonLayout>
//   );
// }







'use client'
import CommonLayout from "../layouts/commonLayout";
import MessengerUI from "./components/MessengerUI";


export default function SettingsPage() {

  return (
    <CommonLayout activePage="Inbox">
      {({ darkMode }) => (
        <>
          <div> {<MessengerUI darkMode={darkMode} />}</div>
        </>
      )}
    </CommonLayout>
  );
}