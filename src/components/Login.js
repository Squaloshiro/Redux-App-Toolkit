import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../utils/firebase.config";

const Login = () => {
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail.current.value, loginPassword.current.value);
      console.log("------------------------------------");
      console.log(user);
      console.log("------------------------------------");
    } catch (error) {
      console.log("------------------------------------");
      console.log(error.message);
      console.log("------------------------------------");
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Login</h3>
        <form className="form-login" onSubmit={(e) => handleLogin(e)}>
          <input type="email" placeholder="Email" required ref={loginEmail} />
          <input type="password" placeholder="Password" required ref={loginPassword} />
          <input type="submit" value="Login" />
          <span>{error && "This mail or password is incorrect"}</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
