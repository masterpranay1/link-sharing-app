import { Routes, Route } from "react-router-dom";

import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <div className="bg-slate-100 sm:p-4">
        <Header />
        <Routes>
          <Route path="/links" element={<h1>Links</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Routes>
      </div>
    </>
  );
}
