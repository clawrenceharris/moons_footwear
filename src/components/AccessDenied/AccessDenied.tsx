/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Location, useNavigate } from "react-router-dom";

const AccessDenied = ({ from }: { from: Location<any> }) => {
  const navigate = useNavigate();
  return (
    <div className="content-centered-absolute ">
      <h2>Access Denied</h2>
      <p style={{ fontSize: "1em" }}>
        Please sign in or make an account to see this content
      </p>

      <div className="margin-y content-row">
        <button
          className="button-primary"
          onClick={() => navigate(`/auth/signin`, { state: { from } })}
        >
          Sign in
        </button>
        <button
          className="button-secondary"
          onClick={() => navigate(`/auth/signup`, { state: { from } })}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
