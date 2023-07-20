import { Header } from "../components";
import { useGlobal } from "../../services/context";

function Login() {
  return <div className="bg-gray-200 text-center">Login</div>;
}

function Register() {
  return <div className="bg-gray-200 text-center">Register</div>;
}

export default function Auth() {
  const { navState } = useGlobal();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {navState.id === "login" && <Login />}
      {navState.id === "register" && <Register />}
    </div>
  );
}
