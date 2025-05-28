import React, { useState } from "react";
import "./SignIn.css";
interface SignInProps {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    data: { email: string; password: string }
  ) => void;
}

const SignIn = ({ onSubmit }: SignInProps) => {
  const [inputs, setInputs] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e, inputs);
  };
  return (
    <div>
      <h1>Log In</h1>
      <p className="description">
        Sign in to access your favorite items, view orders and more!
      </p>
      <form
        aria-describedby="description"
        className="content-body content-centered"
        onSubmit={handleSubmit}
      >
        <div>
          <label>Email:</label>
          <input
            className="input"
            type="email"
            name="email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="input"
            type="password"
            name="password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className=" content-centered button-primary" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
