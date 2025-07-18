import { useEffect, useState } from "react";

type ChatHistoryType = any; // Replace with actual type if available

export default function useChatHistory() {
  const [chatHistory, setChatHistory] = useState<ChatHistoryType | null>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = userStr ? JSON.parse(userStr).Login_token : null;
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiBase}/messages/chat-history`, {
          method: "GET",
          headers: {

           Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch chat history");
        }

        const data = await response.json();
        console.log("Chat history fetched:", data);
        setChatHistory(data);
      } catch (error) {
        console.error("Chat history fetch error:", error);
      }
    };

    fetchChatHistory();

    const interval = setInterval(fetchChatHistory, 5000); // Optional: refresh every 5s
    return () => clearInterval(interval); // Cleanup
  }, []);

  return chatHistory;
}
