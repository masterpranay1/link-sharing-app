import { Header } from "../components";
import { useGlobal } from "../../services/context";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { dispatchNavLink } = useGlobal();
  const navigate = useNavigate()

  const handleClick = () => {
    dispatchNavLink("login");
    navigate("/login");
  };

  return (
    <div className="bg-white px-4 py-12 shadow rounded-lg mt-4 flex flex-col gap-4 md:gap-8 items-center justify-center mx-4 sm:mx-0 h-[80vh]">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl max-w-md lg:max-w-lg text-slate-500 font-extrabold text-center">
        Showcase you Important <span className="text-blue-400">Links.</span>
      </h1>
      <p className="text-center text-sm sm:text-base lg:text-lg max-w-sm text-slate-400">
        <span className="text-blue-">Devlinks</span> is a tool for connecting
        your audience to all of your content with just one link.
      </p>

      <button
        onClick={handleClick}
        className="border rounded-lg px-4 py-2 mt-8 hover:bg-slate-200"
      >
        Get Started
      </button>
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-slate-100 sm:p-4 min-h-screen">
      <Header />
      <Hero />
    </div>
  );
}
