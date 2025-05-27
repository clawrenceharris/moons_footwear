import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { SignIn, SignUp } from "../../components";
import { useAuth } from "../../context";

const AuthPage = () => {
  const { authType } = useParams<{ authType: "signin" | "signup" }>();
  const [error, setError] = useState("");
  const { signin, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const isSignUp = authType === "signup";
  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>,
    data: { name: string; email: string; password: string }
  ) => {
    e.preventDefault();
    setError("");

    const result = await signup(data);
    if (result.success) {
      // Navigate to the 'from' path, replacing the login page in history
      navigate(from, { replace: true });
    } else {
      console.error(e);
      setError(
        result.error || "Please check your credentials or contact support."
      );
    }
  };
  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>,
    data: { email: string; password: string }
  ) => {
    e.preventDefault();
    setError("");

    const result = await signin(data);
    if (result.success) {
      // Navigate to the 'from' path, replacing the login page in history
      navigate(from, { replace: true });
    } else {
      setError(result.error || "Please check your credentials.");
    }
  };
  return (
    <div>
      {isSignUp ? (
        <SignUp onSubmit={handleSignUp} />
      ) : (
        <SignIn onSubmit={handleSignIn} />
      )}
      <div className="content-centered align-center">
        <p className="margin-y">
          Or{" "}
          {isSignUp ? (
            <Link to={"/auth/signin"}>sign in</Link>
          ) : (
            <Link to={"/auth/signup"}>sign up</Link>
          )}{" "}
          instead.
        </p>
        {error && (
          <p className=" margin-y error">
            {" "}
            {(isSignUp ? "Sign up failed: " : "Sign in failed: ") + error}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
