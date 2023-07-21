import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import RightArrow from "../../assets/right-arrow.png";
import DPImage from "../../assets/dp.jpeg";
import { NAVLINKSDATA } from "../../datasource/navlinks";
import { useGlobal } from "../../services/context";
import LinkedinIcon from "../../assets/linkedin-icon.png";
import TwitterIcon from "../../assets/twitter-icon.png";
import GithubIcon from "../../assets/github-icon.png";
import { useEffect } from "react";

interface IButtonProps {
  text: string;
  bgcolor: string;
  textColor?: string;
  imageUrl?: string;
}

const Button = ({
  text,
  bgcolor,
  textColor = "text-white",
  imageUrl,
}: IButtonProps) => {
  return (
    <button
      className={`flex flex-row gap-4 items-center justify-center ${bgcolor} ${textColor} px-6 py-4 rounded-lg`}
    >
      <img
        src={imageUrl}
        className="w-8 h-8 rounded-full border border-white"
      />
      <div className="block">{text}</div>
      <img
        width="24"
        height="32"
        src={RightArrow}
        alt="long-arrow-right"
        className="ml-auto"
      />
    </button>
  );
};

export default function Preview() {
  const { navState, dispatchNavLink, userState } = useGlobal();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatchNavLink(navState.previousId);
  };

  useEffect(() => {
    if (pathname.slice(1) !== navState.id) {
      dispatchNavLink("preview");
    }
  }, [])

  useEffect(() => {
    if (userState.id === null) {
      dispatchNavLink("login");
      navigate("/login");
    }
  }, [userState]);

  return (
    <>
      <div className="w-full h-fit">
        <div className="w-full pb-12 md:pb-32 bg-slate-100 p-4">
          <header className="bg-white p-4 rounded-lg flex justify-between">
            <button className="border w-24 md:w-32 border-violet-400 text-violet-400 rounded-lg hover:bg-violet-400 hover:text-white transition-all text-sm">
              <Link
                onClick={handleClick}
                to={(() => {
                  return (
                    NAVLINKSDATA.find((item) => item.id === navState.previousId)
                      ?.url || "/"
                  );
                })()}
                className="px-4 py-2 w-full h-full flex items-center justify-center"
              >
                Back
              </Link>
            </button>
            <button className="bg-blue-600 text-white hover:opacity-60 px-4 py-2 w-24 md:w-32 rounded-lg text-sm">
              Share Link
            </button>
          </header>
        </div>

        <div className="w-full p-4">
          <div className="w-full md:w-96 mx-auto my-4 -translate-y-12 md:-translate-y-24 bg-white shadow-lg px-4 py-8 rounded-lg m-4">
            <figure>
              <img
                src={DPImage}
                alt="profile"
                className="w-24 h-24 lg:w-32 lg:h-32 mx-auto rounded-full border-2 border-slate-400"
              />
            </figure>

            <h2 className="text-lg text-center font-bold my-2 text-slate-600">
              Pranay Raj
            </h2>
            <p className="text-md text-center break-all mx-2 text-slate-600">
              masterpranayraj@gmail.com
            </p>

            <div className="button-wrapper mx-auto w-full flex flex-col gap-4 px-4 py-4 mt-8">
              <Button
                text="Github"
                bgcolor="bg-slate-800"
                imageUrl={GithubIcon}
              />
              <Button
                text="Twitter"
                bgcolor="bg-blue-400"
                imageUrl={TwitterIcon}
              />
              <Button
                text="Linkedin"
                bgcolor="bg-blue-600"
                imageUrl={LinkedinIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
