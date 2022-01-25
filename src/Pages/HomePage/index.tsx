// For the route "/"
// If not authenticated, redirect to login
// else redirect to dashboard

import { Navigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/authSlice";
import { useAppSelector } from "redux/hooks";

const HomePage = () => {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default HomePage;
