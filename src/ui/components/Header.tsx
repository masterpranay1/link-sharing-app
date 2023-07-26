import { useNavigate } from "react-router-dom";

import Logo from "@/assets/logo.png";
import ProfileIcon from "@/assets/profile.png";
import PreviewIcon from "@/assets/preview.png";
import LinksIcon from "@/assets/link.png";
import { NAVLINKSDATA } from "@/datasource/navlinks";
import { useGlobal } from "@/services/context";

const Nav = () => {
  const { navState, dispatchNavLink, userState } = useGlobal();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    dispatchNavLink(id);
    const navLink = NAVLINKSDATA.find((item) => item.id == id);
    navigate(navLink?.url as string);
  };

  return (
    <nav className="w-full flex flex-row items-center gap-2">
      {userState.id !== null && (
        <>
          <button
            className={`px-4 py-2 rounded-lg ml-auto flex items-center gap-2 ${
              NAVLINKSDATA[0]?.id == navState?.id
                ? "bg-violet-100 text-violet-400"
                : ""
            }`}
            onClick={() => handleClick(NAVLINKSDATA[0].id)}
          >
            <img src={LinksIcon} alt="Links" className="w-6 h-6" />
            <span className="hidden sm:block">Links</span>
          </button>
          <button
            className={`px-3 py-1 rounded-lg flex items-center gap-2 ${
              NAVLINKSDATA[1]?.id == navState?.id
                ? "bg-violet-100 text-violet-400"
                : ""
            }`}
            onClick={() => handleClick(NAVLINKSDATA[1].id)}
          >
            <img src={ProfileIcon} alt="Profile" className="w-8 h-8" />
            <span className="hidden sm:block">Profile Details</span>
          </button>
          <button
            className={`ml-auto border border-violet-200 px-4 py-2 rounded-lg gap-2 ${
              NAVLINKSDATA[2]?.id == navState?.id
                ? "bg-violet-100 text-violet-400"
                : ""
            }`}
            onClick={() => handleClick(NAVLINKSDATA[2].id)}
          >
            <img
              src={PreviewIcon}
              alt="preview"
              className="w-6 h-6 sm:hidden"
            />
            <span className="hidden sm:block">Preview</span>
          </button>
        </>
      )}

      {userState.id === null && (
        <>
          <button
            className={`px-4 py-2 rounded-lg ml-auto ${
              NAVLINKSDATA[3]?.id == navState?.id
                ? "bg-violet-100 text-violet-400"
                : ""
            }`}
            onClick={() => handleClick(NAVLINKSDATA[3].id)}
          >
            <span className="">Login</span>
          </button>
        </>
      )}
    </nav>
  );
};

export default function Header() {
  const { dispatchNavLink } = useGlobal();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatchNavLink("home");
    navigate("/");
  };

  return (
    <header className="bg-white flex flex-row gap-4 p-4 shadow sm:rounded-lg">
      <div className="logo flex items-center gap-2 w-fit">
        <img src={Logo} className="w-8 h-8" alt="devlinks" />
        <h1 className="hidden sm:block text-2xl font-bold cursor-pointer" onClick={handleClick}>devlinks</h1>
      </div>

      <Nav />
    </header>
  );
}
