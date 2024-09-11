"use client";
import { useEffect, useRef, useState } from "react";
import { db, serverTimestamp } from "./firebaseConfig"; // Import from your Firebase config file
import { formatRelative } from "date-fns";

export default function ChatRoom(props) {
  const { uid, displayName, photoURL } = props.user;

  const dummySpace = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      text: newMessage,
      createdAt: serverTimestamp(),
      uid,
      displayName,
      photoURL,
    });

    setNewMessage("");
    dummySpace.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("messages")
      .orderBy("createdAt")
      .limit(100)
      .onSnapshot((querySnapShot) => {
        const data = querySnapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessages(data);
      });

    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <main id="chat_room">
      <ul>
        {messages.map((message) => (
          <li
            key={message.id}
            className={message.uid === uid ? "sent" : "received"}
          >
            <section>
              {message.photoURL ? (
                <img
                  src={message.photoURL}
                  alt="Avatar"
                  width={45}
                  height={45}
                />
              ) : null}
            </section>

            <section>
              <p>{message.text}</p>
              {message.displayName ? <span>{message.displayName}</span> : null}
              <br />
              {message.createdAt?.seconds ? (
                <span>
                  {formatRelative(
                    new Date(message.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
            </section>
          </li>
        ))}
      </ul>
      <section ref={dummySpace}></section>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit" disabled={!newMessage}>
          Send
        </button>
      </form>
    </main>
  );
}
