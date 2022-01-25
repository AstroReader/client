import { SERVER_URL } from "index";
import { logout } from "redux/features/auth/authSlice";
import { useAppDispatch } from "redux/hooks";

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = async () => {
    await fetch(`${SERVER_URL}/cookie`, {
      method: "DELETE",
      credentials: "include",
    });

    dispatch(logout());
  };

  return (
    <div className="w-screen h-screen bg-dark ">
      <button
        className="px-12 py-4 font-bold text-white bg-gradient-to-r from-btnGradient1 via-btnGradient2/80 to-btnGradient3"
        onClick={handleOnClick}
      >
        logout
      </button>
    </div>
  );
};

export default DashboardPage;
