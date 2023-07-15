import { Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import LinkForm from "../components/LinksForm";

export default function Home() {
  return (
    <>
      <div className="bg-slate-100 sm:p-4">
        <Header />
        <Routes>
          <Route path="/links" element={<LinkForm />} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Routes>
      </div>
    </>
  );
}
