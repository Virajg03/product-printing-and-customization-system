// import React from 'react'
// import Addresscard from '../Addreescard/Addresscard'
// import Ordertracker from './Ordertracker'
// import { Grid } from '@mui/material'
// import StarBorderIcon from '@mui/icons-material/StarBorder'
// import { Box } from '@mui/material'

// const Orderdetails = () => {
//   return (
//     <div className='px-5 lg:px-20'>
//         <div>
//         <h1 className='font-bold text-xl py-7'>Delievery Address</h1>
//       <Addresscard/>
//         </div>
//         <div className='py-20'>
//             <Ordertracker activeStep={3}/>
//         </div>
//         <Grid  className="space-y-5" container>

//         {[1,1,1,1,1].map((item)=>
//          <Grid item container className="shadow-xl rounded-md p-5 border" 
//             sx={{alignItems:"center",justifycontent:"space-between"}}>

                
//                 <Grid item xs={6}>
//                     <div className='flex item-center space-x-4'>
//                         <img className='w-[5rem] h-[5rem] object-cover object-top' src='https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/i/v/x/xxl-br-ad-kt-105-adwyn-peter-original-imagj4zyd2q7t6cg.jpeg?q=70' alt=''>
//                         </img>
//                     </div>
//                     <div>
//                         <p className='font-semibold '>men slim white shirt</p>
//                         <p className='space-y-2 opacity-50 text-xs font-semibold'>
//                             <span>color:pink</span>
//                             <span>size:m</span>
//                         </p>
//                         <p>Seller:linear</p>
//                         <p>999</p>
//                     </div>
//                 </Grid>
// {/* rating */}
//                 <Grid item>
//                         <Box sx={{color:"RGB(145,85,253)"}}>
//                             <StarBorderIcon sx={{fontSize:"2rem"}} className='px-2 text-5xl'/>
//                             <span>
//                                 Rate and review product
//                             </span>
//                         </Box>
//                 </Grid>
//             </Grid>)}


           
//         </Grid>
//     </div>
//   )
// }

// export default Orderdetails


import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import Ordertracker from "./Ordertracker";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import Addresscard from "../Addreescard/Addresscard";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../../../State/Order/Action";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);

  console.log("order", order.order);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, []);

  const navigate = useNavigate();
  return (
    <div className=" px-2 lg:px-36 space-y-7 ">
      <Grid container className="p-3 shadow-lg">
        <Grid xs={12}>
          <p className="font-bold text-lg py-2">Delivery Address</p>
        </Grid>
        <Grid item xs={6}>
          <AddressCard address={order.order?.shippingAddress} />
        </Grid>
      </Grid>
      <Box className="p-5 shadow-lg border rounded-md">
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item xs={9}>
            <OrderTraker
              activeStep={
                order.order?.orderStatus === "PLACED"
                  ? 1
                  : order.order?.orderStatus === "CONFIRMED"
                  ? 2
                  : order.order?.orderStatus === "SHIPPED"
                  ? 3
                  : 5
              }
            />
          </Grid>
          <Grid item>
           {order.order?.orderStatus==="DELIVERED" && <Button sx={{ color: ""}} color="error" variant="text" >
              RETURN
            </Button>}

            {order.order?.orderStatus!=="DELIVERED" && <Button sx={{ color: deepPurple[500] }} variant="text">
              cancel order
            </Button>}
          </Grid>
        </Grid>
      </Box>

    

      <Grid container className="space-y-5">
        {order.order?.orderItems.map((item) => (
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              {" "}
              <div className="flex  items-center ">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item?.product.imageUrl}
                  alt=""
                />
                <div className="ml-5 space-y-2">
                  <p className="">{item.product.title}</p>
                  <p className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color: pink</span> <span>Size: {item.size}</span>
                  </p>
                  <p>Seller: {item.product.brand}</p>
                  <p>₹{item.price} </p>
                </div>
              </div>
            </Grid>
            <Grid item>
              {
                <Box
                  sx={{ color: deepPurple[500] }}
                  onClick={() => navigate(`/account/rate/${item.product.id}`)}
                  className="flex items-center cursor-pointer"
                >
                  <StarIcon
                    sx={{ fontSize: "2rem" }}
                    className="px-2 text-5xl"
                  />
                  <span>Rate & Review Product</span>
                </Box>
              }
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
// sx={{width:"10px",height:"10px"}}
export default OrderDetails;
