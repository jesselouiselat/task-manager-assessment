import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigateTo = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ firstName: "", username: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const firstName = localStorage.getItem("firstName");
    const username = localStorage.getItem("username");
    setUser({ firstName, username });

    if (token) setIsLoggedIn(true);
  }, []);

  async function logOut() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.removeItem("username");
      navigateTo("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="border-base-content/20 bg-base-100 fixed top-0 z-10 w-full border-b ">
      <div className="flex px-10 py-6">
        <div className="navbar-start items-center justify-between ">
          <a
            className="text-base-content flex items-center gap-3 text-xl font-bold"
            href="/"
          >
            <img
              src="https://cdn.flyonui.com/fy-assets/logo/logo.png"
              className="size-8"
              alt="brand-logo"
            />
            Task Manager
          </a>
        </div>
        <div
          id="navbar-block-4"
          className="lg:navbar-center transition-height collapse grow font-medium duration-300 lg:flex"
        >
          <div className="flex items-center">
            <a href="/task" className="hover:text-primary">
              Tasks
            </a>
          </div>
        </div>
        <div className="flex gap-5">
          {isLoggedIn ? (
            <>
              <div className="flex items-center">
                <p className="hover:text-primary">
                  Hi <span className=" font-bold">{user.firstName} </span>
                  {"! "}
                </p>
              </div>
              <button onClick={logOut} className="btn btn-primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="btn btn-primary">
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
