import { gql, useMutation } from "@apollo/client";
import logoSvg from "assets/icons/logo.svg";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { selectUser, setUser } from "redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { SERVER_URL } from "index";

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const initialFormData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const handleOnChange: React.ChangeEventHandler = (e) => {
    const regex = /[\\<>*=]/g;

    const target = e.target as HTMLInputElement;
    const text = target.value;

    setFormData({
      ...formData,
      [target.name]: text.replaceAll(regex, ""),
    });
  };

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser({
      variables: formData,
      onCompleted: async (data) => {
        // Sets user in Redux auth state
        if (data?.loginUser) {
          const user = data.loginUser;
          dispatch(setUser({ id: user.id, username: user.username }));
        }

        // Creates httponly cookie
        if (data?.loginUser?.token !== undefined) {
          await fetch(`${SERVER_URL}/cookie`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ token: data.loginUser.token }),
          });
          navigate("/dashboard", { replace: true });
        }
      },
    });
  };

  if (loading)
    return <div className="w-screen h-screen bg-dark">Loading...</div>;

  if (error) {
    console.log(error);
    return <div>{`There is an error: ${error}`}</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div id="background" className="w-full min-h-screen bg-dark">
      <div className="pb-20">
        <div className="py-20 mr-2 text-center md:py-10 xl:py-20">
          <img className="inline w-24" src={logoSvg} alt="" />
          <h1 className="inline text-5xl text-white align-middle xl:text-7xl">
            stro Reader
          </h1>
        </div>
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col justify-center w-9/12 py-12 mx-auto px-9 lg:h-128 bg-black/50 lg:w-128 rounded-md"
        >
          <div>
            <label htmlFor="username" className="text-2xl text-white">
              Username
              <input
                id="username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleOnChange}
                className="block w-full h-16 px-4 mt-4 mb-6 text-2xl rounded-lg outline-none lg:mb-12 bg-gray/50"
                type="text"
              />
            </label>
            <label htmlFor="password" className="text-2xl text-white">
              Password
              <input
                autoComplete="current-password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                className="block w-full h-16 px-4 mt-4 mb-12 text-2xl rounded-lg outline-none lg:mb-12 bg-gray/50"
                type="password"
              />
            </label>
            <button className="block w-full h-16 px-4 text-2xl font-bold text-white rounded-lg outline-none bg-gradient-to-r from-btnGradient1 via-btnGradient2/80 to-btnGradient3">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
