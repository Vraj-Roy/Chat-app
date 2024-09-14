"use client";
// pages/index.js
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Login from "../app/components/Login";
import Chat from "../app/components/Chat";

const Home = () => {
  const [user] = useAuthState(auth);

  return <div>{user ? <Chat user={user} /> : <Login />}</div>;
};

export default Home;
