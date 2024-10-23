import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("RootLayout", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
