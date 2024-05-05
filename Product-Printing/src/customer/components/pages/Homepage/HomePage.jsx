import React from "react";
import MainCarosel from "../../HomeCarosel/MainCarosel";
import Homesectioncarosel from "../../Homesectioncarosel/Homesectioncarosel";
import { men_kurta } from "../../../../DATA/men_kurta";

const HomePage = () => {
  return (
    <>
      <div>
        <MainCarosel />
        <div className="space-y-10 py-20 flex flex-col justyfy-center px-5 lg:px-10">
          <Homesectioncarosel  data={men_kurta} sectionName={"mens kurta"}/>
          <Homesectioncarosel  data={men_kurta} sectionName={"mens shoes"}/>
          <Homesectioncarosel  data={men_kurta} sectionName={"mens shirt"}/>
          <Homesectioncarosel  data={men_kurta} sectionName={"womens saree"}/>
          <Homesectioncarosel  data={men_kurta} sectionName={"womens dress"}/>
          
        </div>
      </div>
    </>
  );
};

export default HomePage;
