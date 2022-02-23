import { render, screen } from '@testing-library/react';
import Login from './Login';
import "@testing-library/jest-dom";

describe("Login Form", () => {
  it("should render the basic fields", () => {
    render(<Login/>);
    expect(
      screen.getByRole("heading", { name: /Logg inn/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/e-postadresse/i)).toBeInTheDocument();
    expect(screen.getAllByText(/passord/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/husk meg/i)).toBeInTheDocument();
    expect(screen.getByText(/glemt/i)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /passord?/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /logg inn/i})).toBeInTheDocument();
  });
});