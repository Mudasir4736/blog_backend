import React, { useEffect, useState } from "react";
import { Logo, TopNavigation, LogoMobile, LoginButton } from "../../Components";
import Banner from "./Banner";
import Latest from "./Latest";
import LatestArticle from "./LatestArticle";
import "../../App.css";
import TopPots from "./TopPsts";


const Home = () => {
  const [renderName, setRenderName] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    setRenderName(userId !== null);
  }, []);

  return (
    <>
      <div className='LMobile'><LogoMobile /></div>
      <div className='LLocal'>
        <Logo />
        <div className="LoginPos"><LoginButton /></div>
        <TopNavigation />
      </div>

      <Banner />
      <Latest />
      <div className="mainContainer">
        <div className="subContainer">
          <div className="homeContainer">
            <LatestArticle />
            <TopPots />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
