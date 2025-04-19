import { screen, fireEvent, waitFor, render } from "@testing-library/react";
import Login from "../src/pages/Auth/Login";

import { renderWithProviders } from "./render";
import { enqueueSnackbar } from "notistack";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  Link: jest
    .fn()
    .mockImplementation(({ to, children }) => <a href={to}>{children}</a>),
}));

jest.mock("notistack", () => ({
  enqueueSnackbar: jest.fn(),
}));

jest.mock("../src/redux/authSlice", () => ({
  fetchLogin: jest.fn(),
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});
describe("Login component", () => {
  test("should render a login form with email and password fields", () => {
    renderWithProviders(<Login />);
  });
});

test("renders email and password fields", () => {
  renderWithProviders(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("Login button is rendered with text Login", () => {
  renderWithProviders(<Login />);
  const btn = screen.getByRole("button", { name: /login/i });
  expect(btn).toBeInTheDocument();
});

test("renders sign up promt with correct link", () => {
  renderWithProviders(<Login />);
  const paragraph = screen.getByText(/Don't have an account\?/i);
  expect(paragraph).toBeInTheDocument();
  const link = screen.getByText(/sign up/i);
  expect(link).toBeInTheDocument();
});

test("shows error on login failure", async () => {
  const mockLogin = require("../src/redux/authSlice").fetchLogin;

  mockLogin.mockImplementation(
    () => () => Promise.reject("Invalid credentials")
  );

  renderWithProviders(<Login />);
  const emailField = screen.getByLabelText(/email/i);
  const passwordField = screen.getByLabelText(/password/i);
  const loginBtn = screen.getByRole("button", { name: /login/i });
  fireEvent.change(emailField, { target: { value: "test@gmail.com" } });
  fireEvent.change(passwordField, { target: { value: "123456" } });
  fireEvent.click(loginBtn);
  await waitFor(() => {
    expect(enqueueSnackbar).toHaveBeenCalledWith(
      "Invalid credentials",
      expect.objectContaining({ variant: "error" })
    );
  });
});
