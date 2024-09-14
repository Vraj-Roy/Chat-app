// components/Chat.js
import { useState } from "react";
import {
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase"; // Firebase config and Firestore initialization

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");

  // Firestore reference to the 'messages' collection
  const messagesRef = collection(db, "messages");

  // Create a query that orders messages by 'createdAt' field
  const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

  // Use react-firebase-hooks to listen to real-time updates from Firestore
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  // Send a message to Firestore
  const sendMessage = async (e) => {
    console.log(message);
    e.preventDefault();

    // Ensure the message isn't empty
    if (!message.trim()) return;

    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      uid: user.uid,
      photoURL: user.photoURL,
    });

    // Clear the input field after sending the message
    setMessage("");
  };

  return (
    <div>
      {/* Message list */}
      <div className="messages">
        {messages &&
          messages.map((msg) =>
            msg.photoURL == user.photoURL ? (
              <div
                className="flex gap-x-2 my-3  bg-green-950 items-center p-4 rounded-xl w-fit "
                key={msg.id}
              >
                <img
                  className="h-10 w-10 rounded-full"
                  src={msg.photoURL}
                  alt="User Avatar"
                />
                <p className="">{msg.text}</p>
              </div>
            ) : (
              <div
                className="flex gap-x-2 my-3  bg-blue-950 items-center p-4 rounded-xl w-fit "
                key={msg.id}
              >
                <img
                  className="h-10 w-10 rounded-full"
                  src={msg.photoURL}
                  alt="User Avatar"
                />
                <p className="">{msg.text}</p>
              </div>
            )
          )}
      </div>

      {/* Input field to send a message */}
      <form onSubmit={sendMessage}>
        <input
          className="text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
