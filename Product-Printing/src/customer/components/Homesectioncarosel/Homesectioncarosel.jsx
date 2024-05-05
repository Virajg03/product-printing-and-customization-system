import React from "react";
import AliceCarousel from "react-alice-carousel";
import Homesectioncard from "../Homesectioncard/Homesectioncard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import { useState } from "react";
// import { men_kurta } from "../../../DATA/men_kurta";

const Homesectioncarosel = ({data,sectionName}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
    500: { items: 2 },
    910: { items: 4 },
  };

  

  const slidePrev=()=>setActiveIndex(activeIndex-1);
  const slideNext=()=>setActiveIndex(activeIndex+1);


    

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data.slice(0,10).map((item) => (
    <Homesectioncard product={item} />
  ));
  return (
    
    <div className="relative px-4 lg:px-8">
      <div className="border  ">
        <h2 className="text-2xl font-extrabold text-gray-800 py-5">{sectionName}</h2>
        <AliceCarousel
          items={items}
          disableButtonsControls
          disableDotsControls
          
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
        { activeIndex !==0&&<Button
          variant="contained"
          className="z-50 bg-white"
          onClick={slideNext}
          sx={{
            position: "absolute",
            top: "8rem",
            left: "-1rem",
            transform: "translateX(-50%) rotate(90deg)",
            bgcolor: "white",
          }}
          aria-label="next"
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(270deg)", color: "black" }}
          />
        </Button>
}
      {activeIndex !== items.length-4 &&
        <Button
          onClick={slidePrev}
          variant="contained"
          className="z-50"
          sx={{
            position: "absolute",
            top: "8rem",
            right: "-3rem",
            transform: "translateY(-50%) rotate(270deg)", // Corrected rotation direction
            bgcolor: "white",
          }}
          aria-label="previus"
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(-90deg)", color: "black" }}
          />{" "}
          {/* Corrected rotation direction */}
        </Button>}
      </div>
    </div>
  );
};

export default Homesectioncarosel;

/////////////////////////////////////////////////

// import AliceCarousel from "react-alice-carousel";
// // import HomeProductCard from "./HomeProductCard";
// // import "./HomeProductSection.css";
// import { Button } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useState } from "react";
// import Homesectioncard from "../Homesectioncard/Homesectioncard";

// const Homesectioncarosel = ({ section, data }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const slidePrev = () => setActiveIndex(activeIndex - 1);
//   const slideNext = () => setActiveIndex(activeIndex + 1);
//   const syncActiveIndex = ({ item }) => setActiveIndex(item);

//   const responsive = {
//     0: {
//       items: 2,
//       itemsFit: "contain",
//     },
//     568: {
//       items: 3,
//       itemsFit: "contain",
//     },
//     1024: {
//       items: 5.5,
//       itemsFit: "contain",
//     },
//   };
//   const items = data?.slice(0, 10).map((item) => (
//     <div className="">
//       {" "}
//       <Homesectioncard product={item} />
//     </div>
//   ));

//   // const slideInFromRight = (t) => {
//   //   return `translateX(${100 - t * 100}%)`;
//   // };

//   return (
//     <div className="relative px-4 sm:px-6 lg:px-8 ">
//       <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
//       <div className="relative border p-5">
//         <AliceCarousel
//           disableButtonsControls
//           disableDotsControls
//           mouseTracking
//           items={items}
//           activeIndex={activeIndex}
//           responsive={responsive}
//           onSlideChanged={syncActiveIndex}
//           animationType="fadeout"
//           animationDuration={2000}
//         />
//         {activeIndex !== items.length - 5 && (
//           <Button
//             onClick={slideNext}
//             variant="contained"
//             className="z-50 bg-[]"
//             sx={{
//               position: "absolute",
//               top: "8rem",
//               right: "0rem",
//               transform: "translateX(50%) rotate(90deg)",
//             }}
//             color="white"
//             aria-label="next"
//           >
//             <ArrowForwardIosIcon
//               className=""
//               sx={{ transform: "rotate(-90deg)" }}
//             />
//           </Button>
//         )}

//         {activeIndex !== 0 && (
//           <Button
//             onClick={slidePrev}
//             variant="contained"
//             className="z-50 bg-[]"
//             color="white"
//             sx={{
//               position: "absolute",
//               top: "8rem",
//               left: "0rem",
//               transform: "translateX(-50%)  rotate(90deg)",
//             }}
//             aria-label="next"
//           >
//             <ArrowForwardIosIcon
//               className=""
//               sx={{ transform: " rotate(90deg)" }}
//             />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Homesectioncarosel;

// import AliceCarousel from "react-alice-carousel";
// import { Button } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useState } from "react";
// import Homesectioncard from "../Homesectioncard/Homesectioncard";

// const Homesectioncarosel = ({ section, data }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const slidePrev = () => setActiveIndex(activeIndex - 1);
//   const slideNext = () => setActiveIndex(activeIndex + 1);

//   const responsive = {
//     0: {
//       items: 2,
//       itemsFit: "contain",
//     },
//     568: {
//       items: 3,
//       itemsFit: "contain",
//     },
//     1024: {
//       items: 5.5,
//       itemsFit: "contain",
//     },
//   };

//   const items = data?.slice(0, 10).map((item, index) => (
//     <div key={index} className="">
//       <Homesectioncard product={item} />
//     </div>
//   ));

//   const handleSlideChanged = ({ item }) => setActiveIndex(item);

//   return (
//     <div className="relative px-4 sm:px-6 lg:px-8 ">
//       <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
//       <div className="relative border p-5">
//         <AliceCarousel
//           disableButtonsControls
//           disableDotsControls
//           mouseTracking
//           items={items}
//           activeIndex={activeIndex}
//           responsive={responsive}
//           onSlideChanged={handleSlideChanged}
//           animationType="fadeout"
//           animationDuration={2000}
//         />
//         {activeIndex !== items.length - 1 && (
//           <Button
//             onClick={slideNext}
//             variant="contained"
//             sx={{
//               position: "absolute",
//               top: "8rem",
//               right: "0rem",
//               transform: "translateX(50%) rotate(90deg)",
//             }}
//             color="primary"
//             aria-label="next"
//           >
//             <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />
//           </Button>
//         )}

//         {activeIndex !== 0 && (
//           <Button
//             onClick={slidePrev}
//             variant="contained"
//             color="primary"
//             sx={{
//               position: "absolute",
//               top: "8rem",
//               left: "0rem",
//               transform: "translateX(-50%)  rotate(90deg)",
//             }}
//             aria-label="previous"
//           >
//             <ArrowForwardIosIcon sx={{ transform: " rotate(90deg)" }} />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Homesectioncarosel;
