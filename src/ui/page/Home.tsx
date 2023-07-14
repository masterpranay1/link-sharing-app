import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

import Logo from "../../assets/logo.png";
import ProfileIcon from "../../assets/profile.png";
import PreviewIcon from "../../assets/preview.png";
import LinksIcon from "../../assets/link.png";

const Header = () => {
  const navigate = useNavigate();

  const [isLinksActive, setIsLinksActive] = useState<boolean>(false);
  const [isProfileActive, setIsProfileActive] = useState<boolean>(false);
  const [isPreviewActive, setIsPreviewActive] = useState<boolean>(true);

  const handleLinksClick = () => {
    setIsLinksActive(true);
    setIsProfileActive(false);
    setIsPreviewActive(false);

    navigate("/home/links");
  }

  const handleProfileClick = () => {
    setIsLinksActive(false);
    setIsProfileActive(true);
    setIsPreviewActive(false);

    navigate("/home/profile");
  }

  const handlePreviewClick = () => {
    setIsLinksActive(false);
    setIsProfileActive(false);
    setIsPreviewActive(true);

    navigate("/preview");
  }

  return (
    <header className="bg-white flex flex-row gap-4 p-4 shadow sm:rounded-lg">
      <div className="logo flex items-center gap-2 w-fit">
        <img src={Logo} className="w-8 h-8" alt="devlinks" />
        <h1 className="hidden sm:block text-2xl font-bold">devlinks</h1>
      </div>

      <nav className="w-full flex flex-row items-center gap-2">
        <button 
          className={`px-4 py-2 rounded-lg ml-auto flex items-center gap-2 ${isLinksActive ? 'bg-violet-100 text-violet-400' : ''}`}
          onClick={handleLinksClick}
        >
          <img src={LinksIcon} alt="Links" className="w-6 h-6" />
          <span className="hidden sm:block">Links</span>
        </button>
        <button 
          className={`px-3 py-1 rounded-lg flex items-center gap-2 ${isProfileActive ? 'bg-violet-100 text-violet-400' : ''}`}
          onClick={handleProfileClick}
        >
          <img src={ProfileIcon} alt="Profile" className="w-8 h-8" />
          <span className="hidden sm:block">Profile Details</span>
        </button>
        <button 
          className={`ml-auto border border-violet-200 px-4 py-2 rounded-lg gap-2 ${isPreviewActive ? 'bg-violet-100 text-violet-400' : ''}`}
          onClick={handlePreviewClick}
        >
          <img src={PreviewIcon} alt="preview" className="w-6 h-6 sm:hidden" />
          <span className="hidden sm:block">Preview</span>
        </button>
      </nav>
    </header>
  );
};

export default function Home() {
  return (
    <>
      <div className="bg-slate-100 sm:p-4">
        <Header />
        <Routes>
          <Route path="/home/links" element={<h1>Links</h1>} />
          <Route path="/home/profile" element={<h1>Profile</h1>} />
        </Routes>
      </div>
    </>
  );
}
