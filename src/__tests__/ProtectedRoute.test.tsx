import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

// Mocking the useAuth hook
jest.mock("../hooks/useAuth");

describe("ProtectedRoute", () => {
  const mockUseAuth = useAuth as jest.Mock;

  it("should render components only if the user is authenticated", () => {
    mockUseAuth.mockReturnValue({ user: { email: "test@example.com" } });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("should redirect to auth if the user is not authenticated", () => {
    mockUseAuth.mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<div>Auth Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Auth Page")).toBeInTheDocument();
  });
});
