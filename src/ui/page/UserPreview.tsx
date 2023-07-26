import RightArrow from "@/assets/right-arrow.png";
import LinkedinIcon from "@/assets/linkedin-icon.png";
import TwitterIcon from "@/assets/twitter-icon.png";
import GithubIcon from "@/assets/github-icon.png";

import LinkIcon from "@/assets/link.png";

import { useEffect, useState } from "react";

import { useUserPreviewService } from "@/services/userPreviewAdapter";

interface IButtonProps {
  text: string;
  bgcolor: string;
  textColor?: string;
  imageUrl?: string;
  url?: string;
}

const Button = ({
  text,
  bgcolor,
  textColor = "text-white",
  imageUrl,
  url,
}: IButtonProps) => {
  return (
    <a
      href={url}
      target="_blank"
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
    </a>
  );
};

export default function UserPreview() {
  const { id } = useParams();

  const { getUserPreview } = useUserPreviewService()

  const [userInfo, setUserInfo] = useState({
    firstname: "Pranay",
    lastname: "Raj",
    profilepicture: "https://via.placeholder.com/250",
  });

  const [links, setLinks] = useState<
    {
      id: string;
      platform: string;
      url: string;
    }[]
  >([]);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [bgColors, setBgColors] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getUserPreview(id as string)
      if(!res) return;
      setUserInfo((prev) => {
        return {
          firstname: res.firstName,
          lastname: res.lastName,
          profilepicture: res.profileImage
        }
      })

      setLinks(res.links)
    }

    getData()
  }, [])

  useEffect(() => {
    setImageUrls(
      links.map((link) => {
        if (link.platform === "Github") return GithubIcon as string;
        if (link.platform === "Twitter") return TwitterIcon as string;
        if (link.platform === "Linkedin") return LinkedinIcon as string;

        return LinkIcon as string;
      })
    );

    setBgColors(
      links.map((link) => {
        if (link.platform === "Github") return "bg-slate-800";
        if (link.platform === "Twitter") return "bg-blue-400";
        if (link.platform === "Linkedin") return "bg-blue-600";

        return "bg-slate-600";
      })
    );
  }, [links]);

  return (
    <>
      <div className="w-full h-fit min-h-screen bg-slate-100">
        <div className="w-full p-4">
          <div className="w-full md:w-96 mx-auto my-4 bg-white shadow-lg px-4 py-8 rounded-lg m-4">
            <figure>
              <img
                src={userInfo.profilepicture}
                alt="profile"
                className="w-24 h-24 lg:w-32 lg:h-32 mx-auto rounded-full border-2 border-slate-400"
              />
            </figure>

            {userInfo.firstname && userInfo.lastname && (
              <h2 className="text-lg text-center font-bold my-2 text-slate-600">
                {userInfo.firstname} {userInfo.lastname}
              </h2>
            )}
            {/* <p className="text-md text-center break-all mx-2 text-slate-600">
              {userInfo.email}
            </p> */}

            <div className="button-wrapper mx-auto w-full flex flex-col gap-4 px-4 py-4 mt-8">
              {links.map((link) => (
                <Button
                  key={link.id}
                  text={link.platform}
                  url={link.url}
                  bgcolor={bgColors[links.indexOf(link)]}
                  imageUrl={imageUrls[links.indexOf(link)]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
