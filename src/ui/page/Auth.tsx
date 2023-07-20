import { Header } from "../components";
import { useGlobal } from "../../services/context";
import { useNavigate } from "react-router-dom";

function Login() {

  const { dispatchNavLink } = useGlobal();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatchNavLink('register');
    navigate("/register");
  };

  return <div className="bg-white shadow mx-4 sm:mx-0 rounded-lg p-4 h-[80vmax] md:h-[80vmin] flex flex-col items-center">
    <h1 className="font-bold text-slate-600 text-lg mt-8">
      Login
    </h1>

    <div className="w-8 h-1 rounded-full bg-slate-200">
    </div>

    <form className="flex flex-col gap-2 mt-8 w-full max-w-2xl">
      <label htmlFor="email" className="text-slate-500">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="border rounded-lg px-4 py-2 w-full"
      />

      <label htmlFor="password" className="text-slate-500">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="border rounded-lg px-4 py-2 w-full"
      />

      <button className="w-full border rounded-lg px-4 py-2 mt-4 bg-slate-200  hover:bg-white">
        Login
      </button>
    </form>

    <button onClick={handleClick} className="text-slate-600 hover:underline mt-4">
      Register
    </button>
    
  </div>;
}

function Register() {
  const { dispatchNavLink } = useGlobal();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatchNavLink('login');
    navigate("/login");
  };
  return <div className="bg-white shadow mx-4 sm:mx-0 rounded-lg p-4 h-[80vmax] md:h-[80vmin] flex flex-col items-center">
  <h1 className="font-bold text-slate-600 text-lg mt-8">
    Register
  </h1>

  <div className="w-8 h-1 rounded-full bg-slate-200">
  </div>

  <form className="flex flex-col gap-2 mt-8 w-full max-w-2xl">
    <label htmlFor="email" className="text-slate-500">
      Email
    </label>
    <input
      type="email"
      name="email"
      id="email"
      className="border rounded-lg px-4 py-2 w-full"
    />

    <label htmlFor="password" className="text-slate-500">
      Password
    </label>
    <input
      type="password"
      name="password"
      id="password"
      className="border rounded-lg px-4 py-2 w-full"
    />

    <button className="w-full border rounded-lg px-4 py-2 mt-4 bg-slate-200  hover:bg-white">
      Register
    </button>
  </form>

  <button onClick={handleClick} className="text-slate-600 hover:underline mt-4">
    Login
  </button>
  
</div>;
}

export default function Auth() {
  const { navState } = useGlobal();

  return (
    <div className="flex flex-col gap-4 p-0 sm:p-4 bg-slate-100 pb-4">
      <Header />
      {navState.id === "login" && <Login />}
      {navState.id === "register" && <Register />}
    </div>
  );
}
