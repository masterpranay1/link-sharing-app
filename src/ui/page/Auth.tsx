import { Header } from "../components";
import { useGlobal } from "../../services/context";
import { useLocation, useNavigate } from "react-router-dom";

import {
  useCreateUser,
  useEmailLoginUser,
} from "../../application/useUserAuth";
import { User } from "../../domain/user";
import { useState, useEffect } from "react";

function Login() {
  const { dispatchNavLink, dispatchUser } = useGlobal();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });

  const emailLoginUser = useEmailLoginUser();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userId = await emailLoginUser(formData);

    if (userId) {
      dispatchNavLink("links");
      dispatchUser(userId);
      navigate("/links");
    }
  };

  const handleClick = () => {
    dispatchNavLink("register");
    navigate("/register");
  };

  return (
    <div className="bg-white shadow mx-4 sm:mx-0 rounded-lg p-4 h-[80vmax] md:h-[80vmin] flex flex-col items-center">
      <h1 className="font-bold text-slate-600 text-lg mt-8">Login</h1>

      <div className="w-8 h-1 rounded-full bg-slate-200"></div>

      <form
        className="flex flex-col gap-2 mt-8 w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="text-slate-500">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-full"
        />

        <label htmlFor="password" className="text-slate-500">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-full"
        />

        <button className="w-full border rounded-lg px-4 py-2 mt-4 bg-slate-200  hover:bg-white">
          Login
        </button>
      </form>

      <button
        onClick={handleClick}
        className="text-slate-600 hover:underline mt-4"
      >
        Register
      </button>
    </div>
  );
}

function Register() {
  const { dispatchNavLink, dispatchUser } = useGlobal();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });

  const createUser = useCreateUser();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userId = await createUser(formData);

    if (userId) {
      dispatchNavLink("links");
      dispatchUser(userId);
      navigate("/links");
    }
  };

  const handleClick = () => {
    dispatchNavLink("login");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow mx-4 sm:mx-0 rounded-lg p-4 h-[80vmax] md:h-[80vmin] flex flex-col items-center">
      <h1 className="font-bold text-slate-600 text-lg mt-8">Register</h1>

      <div className="w-8 h-1 rounded-full bg-slate-200"></div>

      <form
        className="flex flex-col gap-2 mt-8 w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="text-slate-500">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-full"
        />

        <label htmlFor="password" className="text-slate-500">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-full"
        />

        <button
          type="submit"
          className="w-full border rounded-lg px-4 py-2 mt-4 bg-slate-200  hover:bg-white"
        >
          Register
        </button>
      </form>

      <button
        onClick={handleClick}
        className="text-slate-600 hover:underline mt-4"
      >
        Login
      </button>
    </div>
  );
}

export default function Auth() {
  const { navState, userState, dispatchNavLink } = useGlobal();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.slice(1) !== navState.id) {
      dispatchNavLink(pathname.slice(1));
    }
    if (userState.id) {
      navigate("/links");
      dispatchNavLink("links");
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 p-0 sm:p-4 bg-slate-100 pb-4">
      <Header />
      {navState.id === "login" && <Login />}
      {navState.id === "register" && <Register />}
    </div>
  );
}
