import { Navigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/authSlice";
import { useAppSelector } from "redux/hooks";

interface Props {
  children: JSX.Element;
}

const RequireAuth = (props: Props) => {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
};

export default RequireAuth;
