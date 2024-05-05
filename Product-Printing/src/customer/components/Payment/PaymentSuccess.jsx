// import { Alert } from "@material-tailwind/react";
// import { AlertTitle, Grid } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import Ordertracker from "../Order/Ordertracker";
// import { updatePayment } from "../../../State/Payment/Action";
// import { getOrderById } from "../../../State/Order/Action";
// import Addresscard from "../Addreescard/Addresscard";

// const PaymentSuccess = () => {
//   const [paymentId, setPaymentId] = useState("");
//   const [referenceId, setReferenceId] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState("");
//   const { orderId } = useParams();

//   const dispatch = useDispatch();
//   const { order } = useSelector((store1) => store1);
//   // console.log("orderId", orderId);
//   console.log("order =", order.orderId);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     setPaymentId(urlParams.get("razorpay_payment_id"));
//     setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
//   });

//   useEffect(() => {
//     if (paymentId) {
//       const data = { orderId, paymentId };
//       dispatch(getOrderById(orderId));
//       dispatch(updatePayment(data));
//     }
//   }, [orderId, paymentId]);

//   return (
//     <div className="px-2 lg:px-36">
//       <div className="flex flex-col justify-center items-center">
//         <Alert
//           variant="filled"
//           severity="success"
//           sx={{ mb: 6, width: "fit-content" }}
//         >
//           <AlertTitle>Payment Success</AlertTitle>
//           Congratulation Your Order Get Placed
//         </Alert>
//       </div>

//       <Ordertracker activeStep={1} />

//       <Grid
//         container
//         item
//         className="shadow-xl rounded-md p-5"
//         sx={{ alignItems: "center", justifyContent: "space-between" }}
//       >
//         {order.order?.orderItems.map((item) => (
//           <React.Fragment key={item.id}>
//             <Grid item xs={6}>
//               <div className="flex items-center">
//                 {item.product && (
//                   <img
//                     className="w-[5rem] h-[5rem] object-cover object-top"
//                     src={item.product.imageUrl}
//                     alt=""
//                   />
//                 )}
//                 <div className="ml-5 space-y-2">
//                   <p>{item.product?.title}</p>
//                   <div className="opacity-50 text-xs font-semibold space-x-5">
//                     <span>Color: pink</span>
//                     <span>Size: {item.size}</span>
//                   </div>
//                   <p>Seller: {item.product?.brand}</p>
//                   <p>₹{item.price}</p>
//                 </div>
//               </div>
//             </Grid>
//           </React.Fragment>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default PaymentSuccess;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../../../State/Payment/Action";

import { Alert, AlertTitle, Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import { getOrderById } from "../../../State/Order/Action";
import Ordertracker from "../Order/Ordertracker";
import Addresscard from "../Addreescard/Addresscard";

import { useParams } from "react-router-dom";

export const PaymentSuccess = () => {
  // razorpay_payment_link_reference_id
  // razorpay_payment_id
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const {orderId}=useParams();

  

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { order } = useSelector((Store) => Store);

  useEffect(() => {
    console.log("orderId",orderId)
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      const data = { orderId, paymentId, jwt };
      dispatch(updatePayment(data));
      dispatch(getOrderById(orderId));
    }
  }, [orderId, paymentId]);

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulation Your Order Get Placed
        </Alert>
      </div>

      <Ordertracker activeStep={1}/>

      <Grid container className="space-y-5 py-5 pt-20">
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
                  src={item?.product?.imageUrl}
                  alt=""
                />
                <div className="ml-5 space-y-2">
                  <p className="">{item?.product?.title}</p>
                  <p className="opacity-50 text-xs font-semibold space-x-5">
                   <span>Size: {item.size}</span>
                  </p>
                  <p>Seller: {item?.product?.brand}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
  <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
    <Addresscard address={order.order?.shippingAddress} />
  </div>
</Grid>

          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PaymentSuccess;
