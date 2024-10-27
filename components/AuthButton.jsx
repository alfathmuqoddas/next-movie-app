"use client";

import { useEffect } from "react";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import useAuthStore from "../store/useAuthStore";
import { auth } from "../lib/firebase";

const AuthButton = () => {
  const { setUserData, userData } = useAuthStore();
  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    signInWithRedirect(auth, provider).catch((error) => {
      console.log(error);
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          setUserData(result.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      auth.signOut();
      setUserData(null);
    } else {
      return;
    }
  };

  const handleClick = () => {
    if (userData) {
      handleSignOut();
    } else {
      handleSignIn();
    }
  };

  console.log({ userData });

  if (userData) {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-sm m-1">
          {userData.displayName}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a onClick={handleClick}>Logout</a>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <button
        onClick={handleClick}
        className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 m-1"
      >
        Login
      </button>
    );
  }
};

export default AuthButton;
