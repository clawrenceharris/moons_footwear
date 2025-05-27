import React, { useState } from "react";
import "./SignUp.css";
interface SignUpProps {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    data: { name: string; email: string; password: string }
  ) => void;
}
const SignUp = ({ onSubmit }: SignUpProps) => {
  const [inputs, setInputs] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
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
      <h1>Sign Up</h1>
      <p className="description">
        Sign up to access your favorite items, view orders and more!
      </p>
      <form
        aria-describedby="description"
        className="content-body content-centered"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className="text-input"
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="text-input"
            type="email"
            name="email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="text-input"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className=" content-centered button-primary" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
