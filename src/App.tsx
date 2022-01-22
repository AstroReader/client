import { useState } from "react";
import { Outlet } from "react-router-dom";
import logoSvg from "./assets/icons/logo.svg";
const App = () => {
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

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
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

export default App;
