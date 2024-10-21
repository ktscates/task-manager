import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("RootLayout", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
