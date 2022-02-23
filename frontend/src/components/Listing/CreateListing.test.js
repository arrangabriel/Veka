import { render, screen } from '@testing-library/react';
import CreateListing from './CreateListing';
import "@testing-library/jest-dom";

describe("CreateListing Form", () => {
  it("should render the basic fields", () => {
    render(<CreateListing />);
    expect(
      screen.getByRole("heading", { name: /Nytt innlegg/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/tittel/i)).toBeInTheDocument();
    expect(screen.getByText(/pris/i)).toBeInTheDocument();
    expect(screen.getByText(/arrangementtype/i)).toBeInTheDocument();
    expect(screen.getByText(/dato/i)).toBeInTheDocument();
    expect(screen.getByText(/sted/i)).toBeInTheDocument();
    expect(screen.getByText(/mer om arrangementet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /publiser/i})).toBeInTheDocument();
    
  });
});