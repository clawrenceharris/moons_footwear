import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context";
import { AccessDenied, ProgressIndicator } from "../";

const PrivateRoute = () => {
  const auth = useAuth();

  const { user: currentUser, error, loading, isAuthenticated } = auth;
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
  if (isAuthenticated && currentUser) {
    return <Outlet context={auth} />;
  } else if (!isAuthenticated || !currentUser) {
    return <Navigate to={"/auth/signin"} state={{ from: location }} replace />;
  } else {
    return <AccessDenied />;
  }
};

export default PrivateRoute;
