import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ProgressIndicator from "../ProgressIndicator";
import { useAuth } from "../../context";
import AccessDenied from "../AccessDenied";

const AdminRoute = () => {
  const auth = useAuth();

  const { user, error, loading, isAuthenticated } = auth;
  const location = useLocation();

  if (loading) {
    return (
      <div className="content-centered-absolute">
        <ProgressIndicator />
      </div>
    );
  }
  if (error) {
    return (
      <div className="content-centered-absolute">
        <h1>Sorry, an error occured</h1>
      </div>
    );
  }
  if (!isAuthenticated || !user) {
    return <Navigate to={"/auth/signin"} state={{ from: location }} replace />;
  } else if (!user.isAdmin) {
    return <AccessDenied from={location} />;
  } else {
    return <Outlet context={auth} />;
  }
};

export default AdminRoute;
