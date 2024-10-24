import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "../context/ToastContext"; // Import the useToast hook

const Auth = () => {
  const { login, register, signInWithGoogle } = useAuth();
  const { showToast } = useToast(); // Use the useToast hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // New state for the display name
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(email, password, name); // Pass name to the register function
        showToast("Registration successful!", "success"); // Success message for registration
      } else {
        await login(email, password);
        showToast("Login successful!", "success"); // Success message for login
      }
      navigate("/tasks");
    } catch (error) {
      console.error(
        isRegistering ? "Registration failed" : "Login failed",
        error
      );
      showToast(
        isRegistering
          ? "Registration failed. Please try again."
          : "Login failed. Please check your credentials.",
        "error" // Error message for failure
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      showToast("Google login successful!", "success"); // Success message for Google login
      navigate("/tasks");
    } catch (error) {
      console.error("Google login failed", error);
      showToast("Google login failed. Please try again.", "error"); // Error message for Google login failure
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-backAuth dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
          {isRegistering ? "Register" : "Login"}
        </h2>
        {isRegistering && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-6 border-b border-backAuth dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-6 border-b border-backAuth dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-10 border-b border-backAuth dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none"
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-completed-text text-white p-2 rounded hover:text-completed-text hover:bg-completed-bg"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex gap-2 items-center bg-gray bg-opacity-25 text-black p-2 rounded hover:bg-opacity-40"
          >
            <FcGoogle size={22} />
            {isRegistering ? "Register with Google" : "Login with Google"}
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray dark:text-gray-300">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-completed-text hover:underline"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;
