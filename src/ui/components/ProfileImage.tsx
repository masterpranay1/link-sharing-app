import { useEffect, useState } from "react";
import ImageLoader from "./ImageLoader";

const ProfileImage = ({
  userInfo,
  classname
}: {
  classname: string;
  userInfo: {
    profilepicture: string;
  };
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const image = new Image();

  useEffect(() => {
    image.onload = () => setIsImageLoaded(true);
    image.src = userInfo.profilepicture;

    return () => {
      image.onload = null;
    };
  }, [userInfo.profilepicture]);

  return (
    <div
    className={classname}
    >
      {!isImageLoaded ? (
        <ImageLoader />
      ) : (
        <img
          src={userInfo.profilepicture}
          alt="profile"
          loading="lazy"
          className={classname}
        />
      )}
    </div>
  );
};

export default ProfileImage;
