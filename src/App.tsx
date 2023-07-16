import { Routes, Route } from "react-router-dom"
import { Home, Preview, Dashboard } from "./ui/page/"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
