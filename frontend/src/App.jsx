import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    <Navbar />
    </>
  );
}

export default App;
