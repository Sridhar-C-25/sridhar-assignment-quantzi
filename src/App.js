import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import { getCookie } from "./services/cookie";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getCookie("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
