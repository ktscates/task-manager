// src/__tests__/Auth.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router for useNavigate
import Auth from "../pages/Auth";
import { useAuth } from "../hooks/useAuth";

// Mock the useAuth hook
jest.mock("../hooks/useAuth");

const mockLogin = jest.fn();
const mockRegister = jest.fn();
const mockSignInWithGoogle = jest.fn();

(useAuth as jest.Mock).mockReturnValue({
  login: mockLogin,
  register: mockRegister,
  signInWithGoogle: mockSignInWithGoogle,
});

describe("Auth Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  it("should render login form by default", () => {
    render(
      <Router>
        <Auth />
      </Router>
    );

    // Check that the heading is rendered
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    // Check that the email and password inputs are rendered
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    // Check that the login button is rendered
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should call login function when form is submitted", async () => {
    render(
      <Router>
        <Auth />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password");
    });
  });

  it("should call register function when form is submitted", async () => {
    render(
      <Router>
        <Auth />
      </Router>
    );

    // First, toggle to the registration form
    fireEvent.click(screen.getByText("Register")); // Switch to Register form

    // Fill in the registration form
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    // Submit the registration form
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    // Check that the register function was called
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("new@example.com", "password");
    });
  });

  it("should call signInWithGoogle function when Google login button is clicked", async () => {
    render(
      <Router>
        <Auth />
      </Router>
    );

    fireEvent.click(screen.getByText("Login with Google"));

    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled();
    });
  });

  it("should toggle between login and register", () => {
    render(
      <Router>
        <Auth />
      </Router>
    );

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Register" }));
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });
});
