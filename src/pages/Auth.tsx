import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "../context/ToastContext"; // Import the useToast hook
import { useTranslation } from "react-i18next";

const Auth = () => {
  const { login, register, signInWithGoogle } = useAuth();
  const { showToast } = useToast(); // Use the useToast hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // New state for the display name
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(email, password, name); // Pass name to the register function
        showToast(t("auth.registerSuccess"), "success");
      } else {
        await login(email, password);
        showToast(t("auth.loginSuccess"), "success");
      }
      navigate("/tasks");
    } catch (error) {
      console.error(
        isRegistering ? "Registration failed" : "Login failed",
        error
      );
      showToast(
        isRegistering ? t("auth.registerFail") : t("auth.loginFail"),
        "error"
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      showToast(t("auth.googleLoginSuccess"), "success");
      navigate("/tasks");
    } catch (error) {
      showToast(t("auth.googleLoginFail"), "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-backAuth dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
          {isRegistering ? t("auth.registerTitle") : t("auth.loginTitle")}
        </h2>
        {isRegistering && (
          <input
            type="text"
            placeholder={t("auth.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-6 border-b border-backAuth dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none"
            required
          />
        )}
        <input
          type="email"
          placeholder={t("auth.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-6 border-b border-backAuth dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder={t("auth.passwordPlaceholder")}
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
            {isRegistering ? t("auth.registerButton") : t("auth.loginButton")}
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex gap-2 items-center bg-gray bg-opacity-25 text-black p-2 rounded hover:bg-opacity-40"
          >
            <FcGoogle size={22} />
            {isRegistering
              ? t("auth.registerWithGoogle")
              : t("auth.loginWithGoogle")}
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray dark:text-gray-300">
          {isRegistering ? t("auth.haveAccount") : t("auth.noAccount")}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-completed-text hover:underline"
          >
            {isRegistering ? t("auth.toggleLogin") : t("auth.toggleRegister")}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;
