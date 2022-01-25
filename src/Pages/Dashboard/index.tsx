import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
const GET_USER = gql`
  query Query {
    user {
      username
    }
  }
`;
const DashboardPage = () => {
  const { loading, error, data } = useQuery(GET_USER);
  const navigate = useNavigate();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error: ${error.message}`}</div>;
  if (!data?.user?.username) {
    // navigate("/");
    return <div>You are not logged in</div>;
  }

  return (
    <div>
      <button>logout</button>
    </div>
  );
};

export default DashboardPage;
