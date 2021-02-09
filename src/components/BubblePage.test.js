import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";

test("Fetches data and renders the bubbles", () => {
  render(<BubblePage />);
});

test("Fetches data and renders the bubbles on mounting", async () => {
  render(<BubblePage />);
});