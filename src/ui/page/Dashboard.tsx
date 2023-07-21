import { useLocation } from "react-router-dom";
import { useGlobal } from "../../services/context";

export default function Dashboard() {
  const { dispatchNavLink, navState } = useGlobal();
  const { pathname } = useLocation();

  if (pathname !== navState.id) {
    dispatchNavLink("dashboard");
  }

  return (
    <>
      <div className="bg-slate-500">Dashboard Page</div>
    </>
  );
}
