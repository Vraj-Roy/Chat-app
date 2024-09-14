import React from "react";

import { signOut, getAuth } from "firebase/auth";
const Navbar = ({ user }) => {
  const auth = getAuth();
  return (
    <div className="sticky bg-gray-100 shadow">
      <div className="flex justify-between text-bold items-center font-semibold text-lg  md:h-[10vh] md:w-[50vw] m-auto px-4 ">
        <div className="text-sm">{user.email}</div>
        <div className="flex gap-x-2">
          <img className="w-8 h-8 rounded-full" src={user.photoURL} />
          <div className="flex-col">
            <div> {user.displayName}</div>
            <button
              className="text-zinc-100 font-semibold bg-red-600 p-1 rounded my-1 text-sm "
              onClick={() => signOut(auth)}
            >
              {" "}
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
