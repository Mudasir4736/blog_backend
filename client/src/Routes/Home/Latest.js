import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../Components";
import { DateExt } from "../../Components";
import "../../App.css";
import axios from "axios";
import { AllData } from "../../constants/ApiList";

const API = AllData;

const Latest = () => {
  const [data, setData] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        const [latestData] = res.data;
        setData(latestData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleImage = (d) => {
    if (localStorage.getItem("token")) {
      navi(`/${d.cat}/${d.id}`, { state: d });
    } else {
      navi("/signup");
    }
  };

  return (
    <div className="mainContainer">
      <div className="subContainer">
        <Header headerText={"The Latest"} />
        <div className="theLatest">
          {data
            .filter((item) => item.sp === "home-latest")
            .map((d) => (
              <div key={d.id} className="theLatestbox">
                <img
                  onClick={() => handleImage(d)}
                  alt="No Network"
                  src={d.img}
                  className="TheLatestImg hov"
                />
                <div className="flexProperty cHeight">
                  <div className="bannerContent">
                    <h2 className="TheH2" onClick={() => handleImage(d)}>
                      {d.title}
                    </h2>
                    <p className="bannerMainContent">{d.Overview}</p>
                    <p className="endPara">
                      <span className="genericDateTravel">{d.cat}</span>
                      <DateExt dateExt={`  / ${d.date} `} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Latest;
