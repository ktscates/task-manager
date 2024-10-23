import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { login, register, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate("/tasks");
    } catch (error) {
      console.error(
        isRegistering ? "Registration failed" : "Login failed",
        error
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/tasks");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
          {isRegistering ? "Register" : "Login"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-8 border-b dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-10 border-b dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none"
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className={`w-full ${
              isRegistering ? "bg-green-500" : "bg-blue-500"
            } text-white p-2 rounded hover:bg-opacity-90`}
          >
            {isRegistering ? "Register" : "Login"}
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            {isRegistering ? "Register with Google" : "Login with Google"}
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 hover:underline"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;
