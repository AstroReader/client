import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import logoSvg from "./assets/icons/logo.svg";
const App = () => {
  const [mobileHeight, setMobileHeight] = useState(window.innerHeight);
  return (
    <div id="background" className="bg-dark min-h-screen w-full">
      <div className="pb-20">
        <div className="text-center py-20 md:py-10 xl:py-20">
          <img className="inline w-24" src={logoSvg} alt="" />
          <h1 className="inline text-white text-5xl xl:text-7xl align-middle">
            stro Reader
          </h1>
        </div>
        <form className="py-12 px-9 mx-auto lg:h-128 bg-black/50 w-9/12 lg:w-128 rounded-md flex justify-center flex-col">
          <div>
            <label className="text-2xl text-white">
              Username
              <input
                className="mt-4 mb-6 lg:mb-12 px-4 block w-full bg-gray/50 h-16 rounded-lg outline-none text-2xl"
                type="text"
              />
            </label>
            <label className="text-2xl text-white">
              Password
              <input
                className="mt-4 mb-12 lg:mb-12 px-4 block w-full bg-gray/50 h-16 rounded-lg outline-none text-2xl"
                type="password"
              />
            </label>
            <button className="px-4 block w-full bg-gradient-to-r from-btnGradient1 via-btnGradient2/80 to-btnGradient3 h-16 rounded-lg outline-none text-2xl font-bold text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
