import { render, screen } from '@testing-library/react';
import SignUp from './SignUp';
import "@testing-library/jest-dom";

describe("Signup Form", () => {
  it("should render the basic fields", () => {
    render(<SignUp/>);
    expect(
      screen.getByRole("heading", { name: /Registrer bruker/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/e-postadresse/i)).toBeInTheDocument();
    expect(screen.getAllByText(/passord/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/brukernavn/i)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /logg inn/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /registrer meg/i})).toBeInTheDocument();
  });
});