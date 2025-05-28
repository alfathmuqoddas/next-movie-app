import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react"; // Import useEffect
import useAuthStore from "../store/useAuthStore";
import { auth } from "../lib/firebase";

const AuthButton = () => {
  const { setUserData, userData } = useAuthStore();
  const provider = new GoogleAuthProvider();

  // Add onAuthStateChanged to listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUserData(user);
      } else {
        // User is signed out
        setUserData(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [setUserData]); // Re-run effect if setUserData changes (though it's stable)

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // setUserData is already handled by onAuthStateChanged
        alert("Successfully logged in!");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  const handleSignOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      auth
        .signOut()
        .then(() => {
          // setUserData(null) is already handled by onAuthStateChanged
          alert("Successfully logged out!");
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
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
        className="btn btn-sm bg-[#094FC3] text-white hover:bg-blue-600 m-1"
      >
        Login
      </button>
    );
  }
};

export default AuthButton;
