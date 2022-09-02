import React from "react";
import Header from "../components/Header";
import LoginPage from "../components/LoginPage";
import Contact from "../components/Contact";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = (props) => {
  const [language, setLanguage] = useState(false);
  const navigate = useNavigate();

  localStorage.setItem("language", language);
  //Switching between language
  const changeLanguage = () => {
    var newLanguage = !language;
    setLanguage(newLanguage);
    localStorage.setItem("language", language);
  };

  const navigateAdmin = () => {
    navigate("/admin-login")
  }
  return (
    <div>
      <Header
        item1=""
        item1_id=""
        item2=""
        item3=""
        item4="ഉദ്യോഗസ്ഥ ലോഗിൻ"
        item4Click = {navigateAdmin}
        waterauthority="കേരള വാട്ടർ അതോറിറ്റി" 
      />
      <LoginPage
        logText= "അക്കൗണ്ടിൽ ലോഗിൻ ചെയ്യുക!" 
        page="/home"
        language={language}
        admId="ഉപഭോക്തൃ നമ്പർ"
      />
      <Contact />
    </div>
  );
};

export default Login;
