import { Routes, Route } from "react-router-dom";
import { Home, Preview, Dashboard, Auth, Link, ProfilePage, UserPreview } from "./ui/page/";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/links" element={<Link />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:id" element={<UserPreview />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
