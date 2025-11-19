import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditTask from "./pages/EditTask";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}