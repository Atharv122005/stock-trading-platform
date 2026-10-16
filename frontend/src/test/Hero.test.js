import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../landing_page/home/Hero";

describe("Hero Component", () => {
  test("renders hero image", () => {
    render(<Hero />);
    const heroImage = screen.getByAltText("hero");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "media/images/homeHero.png");
  });

  test("renders heading and description", () => {
    render(<Hero />);
    expect(screen.getByText("Invest in everything")).toBeInTheDocument();
    expect(screen.getByText(/Online platform to invest/i)).toBeInTheDocument();
  });

  test("renders sign up button", () => {
    render(<Hero />);
    expect(
      screen.getByRole("button", { name: /sign up for free/i })
    ).toBeInTheDocument();
  });
});

