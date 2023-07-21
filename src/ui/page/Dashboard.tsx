import { useLocation } from "react-router-dom";
import { useGlobal } from "../../services/context";
import { useEffect } from "react";

export default function Dashboard() {
  const { dispatchNavLink, navState } = useGlobal();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== navState.id) {
      dispatchNavLink("dashboard");
    }
  })

  return (
    <>
      <div className="bg-slate-500">Dashboard Page</div>
    </>
  );
}
