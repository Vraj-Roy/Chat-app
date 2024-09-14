// components/Login.js
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during sign in", error);
    }
  };

  return (
    <div className="flex h-[100vh] w-full justify-center  items-center bg-gray-100">
      <GoogleButton onClick={signInWithGoogle}>
        Sign in with Google
      </GoogleButton>
    </div>
  );
};

export default Login;
