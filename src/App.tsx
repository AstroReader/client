import { gql, useQuery } from "@apollo/client";
import RequireAuth from "components/RequireAuth";
import DashboardPage from "Pages/Dashboard";
import HomePage from "Pages/HomePage";
import LoginPage from "Pages/Login";
import { Route, Routes } from "react-router-dom";
import { setUser } from "redux/features/auth/authSlice";
import { useAppDispatch } from "redux/hooks";
const GET_USER = gql`
  query Query {
    user {
      id
      username
    }
  }
`;
const App = () => {
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(GET_USER);
  if (loading)
    return <div className="w-screen h-screen bg-dark">Loading...</div>;
  if (error) {
    console.error(error);
    return <div>{`Error: ${error.message}`}</div>;
  }
  console.log(data, "the data");
  const user = data?.user;

  if (user?.id && user?.username) {
    dispatch(setUser({ id: user.id, username: user.username }));
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
