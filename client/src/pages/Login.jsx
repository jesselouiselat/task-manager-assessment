import { useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigateTo = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("firstName", res.data.user.firstName);
      localStorage.setItem("username", res.data.user.username);
      navigateTo("/task");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex h-auto min-h-screen items-center justify-center overflow-x-hidden bg-[url('https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/auth/auth-background-2.png')] bg-cover bg-center bg-no-repeat py-10">
      <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-base-100 shadow-base-300/20 z-1 w-full space-y-6 rounded-xl p-6 shadow-md sm:min-w-md lg:p-8">
          <div className="flex items-center gap-3">
            <h2 className="text-base-content text-xl font-bold">
              Task Manager
            </h2>
          </div>
          <div>
            <h3 className="text-base-content mb-1.5 text-2xl font-semibold">
              Sign in to Task Manager
            </h3>
            <p className="text-base-content/80">
              Streamline your workflow and achieve your goals faster.
            </p>
          </div>

          <div className="space-y-4">
            <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="label-text" htmlFor="userEmail">
                  Email address*
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input"
                  id="userEmail"
                  required
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="label-text" htmlFor="userPassword">
                  Password*
                </label>
                <div className="input">
                  <input
                    id="userPassword"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="············"
                    required
                    name="password"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIsPasswordVisible((prevState) => !prevState)
                    }
                    className="block cursor-pointer"
                    aria-label="userPassword"
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button className="btn btn-lg btn-primary btn-gradient btn-block">
                {isLoading ? "Sigining in..." : "Sign in"}
              </button>
            </form>
            <p className="text-base-content/80 mb-4 text-center">
              New on our platform?
              <a
                href="/register"
                className="link link-animated link-primary font-normal"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
