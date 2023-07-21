import { Header, LinkForm, MockupPreview } from "../components";
import { useGlobal } from "../../services/context";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const LinksView = () => {
  return (
    <div className="flex flex-row gap-4 mt-4 p-4 sm:p-0">
      <div className="hidden md:flex md:w-1/3 relative">
        <MockupPreview className="w-full h-[calc(100vh-2rem)] sticky top-4" />
      </div>
      <LinkForm className="w-full md:w-2/3" />
    </div>
  );
};

export default function Links() {
  const { dispatchNavLink, navState } = useGlobal();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.slice(1) !== navState.id) {
      dispatchNavLink("links");
    }
  }, []);

  return (
    <>
      <div className="bg-slate-100 sm:p-4">
        <Header />
        <LinksView />
      </div>
    </>
  );
}
