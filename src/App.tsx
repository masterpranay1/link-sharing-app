import { Routes, Route } from "react-router-dom"
import { Home, Preview, Dashboard } from "./ui/page/"

function App() {

  return (
    <>
      <Routes>
        <Route path="/home?" element={<Home />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
