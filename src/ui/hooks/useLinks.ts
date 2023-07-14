import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IuseLinks {
  activeLinksStatus: {
    isLinksActive: boolean;
    isProfileActive: boolean;
    isPreviewActive: boolean;
  };
  handleFunctions: {
    handleLinksClick: () => void;
    handleProfileClick: () => void;
    handlePreviewClick: () => void;
  };
}

export default function useLinks(): IuseLinks {
  const navigate = useNavigate();

  const [isLinksActive, setIsLinksActive] = useState<boolean>(false);
  const [isProfileActive, setIsProfileActive] = useState<boolean>(false);
  const [isPreviewActive, setIsPreviewActive] = useState<boolean>(true);

  const handleLinksClick = () => {
    setIsLinksActive(true);
    setIsProfileActive(false);
    setIsPreviewActive(false);

    navigate("/home/links");
  };

  const handleProfileClick = () => {
    setIsLinksActive(false);
    setIsProfileActive(true);
    setIsPreviewActive(false);

    navigate("/home/profile");
  };

  const handlePreviewClick = () => {
    setIsLinksActive(false);
    setIsProfileActive(false);
    setIsPreviewActive(true);

    navigate("/preview");
  };

  return {
    activeLinksStatus: {
      isLinksActive,
      isProfileActive,
      isPreviewActive,
    },
    handleFunctions: {
      handleLinksClick,
      handleProfileClick,
      handlePreviewClick,
    }
  };
}
