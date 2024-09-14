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
      <div className="messages bg-gray-100 ">
        <div className="md:w-[50vw] m-auto   flex flex-col  rounded p-4 pb-0  overflow-auto h-[100vh]">
          <div className="mx-auto w-fit md:text-3xl font-bold">
            Cool Chat App
          </div>
          {messages &&
            messages.map((msg) =>
              msg.photoURL == user.photoURL ? (
                <div
                  className="flex gap-x-2 my-3  bg-blue-600 shadow-md items-center px-4 py-4 rounded-xl w-fit ml-auto mr-0"
                  key={msg.id}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={msg.photoURL}
                    alt="User Avatar"
                  />
                  <p className="text-white">{msg.text}</p>
                </div>
              ) : (
                <div
                  className="flex gap-x-2 my-3  bg-white items-center p-4 rounded-xl w-fit shadow-md"
                  key={msg.id}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={msg.photoURL}
                    alt="User Avatar"
                  />
                  <p className="">{msg.text}</p>
                </div>
              )
            )}
          <div className="sticky bottom-2    w-full ">
            <form
              onSubmit={sendMessage}
              className="flex justify-center items-center bg-white border-2   h-12  rounded-full   overflow-hidden"
            >
              <input
                className="text-black  h-full w-full  ml-6 outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="text-white w-fit h-full px-6 py-1 text-bold text-lg rounded-full bg-blue-700   ml-auto"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Input field to send a message */}
    </div>
  );
};

export default Chat;
