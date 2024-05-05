// import React from 'react'
// import { Grid } from '@mui/material'
// import AdjustIcon from '@mui/icons-material/Adjust';

// const Ordercard = () => {
//   return (
//     <div className='p-5 shadow-md shadow-black hover:shadow-2xl'>
//       <Grid container spacing={2} sx={{justifyContent:"space-between mt-5"}}>
//             <Grid item xs={6}>
//                 <div className='flex cursor-pointer '>
//                     <img className='w-[5rem] h-[5rem] object-cover object-top' src='https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/i/v/x/xxl-br-ad-kt-105-adwyn-peter-original-imagj4zyd2q7t6cg.jpeg?q=70' alt=''>
//                     </img>
//                     <div className='ml-5'>
//                         <p className='ml-5 space-y-2'>men slim mid rise black</p>
//                         <p className='opacity-70 text-xs font-semibold'>  size : m                        </p>
//                         <p  className='opacity-70 text-xs font-semibold'>Color: black</p>
//                     </div>
//                 </div>
//             </Grid>
//             <Grid item xs={2}>
//                 <p>$1099</p>
//             </Grid>
//             <Grid item xs={4}>
//                 {true && <div>
//                     <p>
//                     <AdjustIcon xs={{width:15,height:15}} className='text-green-600 mr-2  text-sm'/>
//                 <span>
//                     delivered on march 03
//                 </span>
//                 <p className='text-xs'>your item has been delivered</p>
//                 </p>
//                     </div>}
//                 {false && <p>
//                     <span>
//                     delivered on march 03 
//                     </span>
//                 </p>}

//             </Grid>
//       </Grid>
//     </div>
//   )
// }

// export default Ordercard


import { Box, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();
  console.log("items ", item,order,order.orderStatus);
  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border ">
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div
            onClick={() => navigate(`/account/order/${order?.id}`)}
            className="flex cursor-pointer"
          >
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.product.imageUrl}
              alt=""
            />
            <div className="ml-5">
              <p className="mb-2">{item?.product.title}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>Size: {item?.size}</span>
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>₹{item?.price}</p>
        </Grid>
        <Grid item xs={4}>
          <p className="space-y-2 font-semibold">
            {order?.orderStatus === "DELIVERED"? (
             <>
             <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Delivered On Mar 03</span>

            </>
            ):  <>
               
                <AdjustIcon
                sx={{ width: "15px", height: "15px" }}
                className="text-green-600 p-0 mr-2 text-sm"
              />
              <span>Expected Delivery On Mar 03</span>
              </>}
            
          </p>
          <p className="text-xs">Your Item Has Been Delivered</p>
          {item.orderStatus === "DELIVERED" && (
            <div
              onClick={() => navigate(`/account/rate/{id}`)}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
              <span>Rate & Review Product</span>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
