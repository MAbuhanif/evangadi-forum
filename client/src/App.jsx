import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import { createContext, useEffect, useState } from "react";
import axios from "./axiosConfig";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AskQuestion from "./pages/AskQuestion";
import Home from "./pages/Home";

import QuestionDetailAndAnswer from "./pages/QuestionDetailAndAnswer";
import Banner from "./components/Banner";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
     
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />

      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/home/:questionid" element={<QuestionDetailAndAnswer />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
