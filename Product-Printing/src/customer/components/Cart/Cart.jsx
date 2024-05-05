// import React, { useEffect } from "react";
// import Cartitem from "./Cartitem";
// import { Button } from "@mui/material";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { getCart } from "../../../State/Cart/Action";


// // const handlecheckout = 
// const Cart = () => {
// const navigate = useNavigate();
// const {cart} = useSelector(Store=>Store)
// const dispatch = useDispatch();
// const handlecheckout = ()=>{
//   navigate('/checkout?step=2')
// }

// useEffect(() => {
//   dispatch(getCart());
// }, []);

// useEffect(()=>{
//   dispatch(getCart())
// },[cart.updateCartItem,cart.deleteCartItem])
//   return (
//     <div>
//       <div className="lg:grid grid-cols-3 lg:px-16 relative">
//         <div className="col-span-2">
//           {cart.cart?.cartItems.map((items)=><Cartitem items={items}/>)}
          

//         </div>
//         <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
//           <div className="border">
//             <p className="uppercase font-bold opacity-60 pb-4">price details</p>
//             <hr/>
//             <div className="space-y-3 font-semibold">
//                 <div className="flex justify-between pt-3 text-black"> 
//                     <span>Price</span>
//                     <span>{cart.cart?.totalPrice}</span>
//                 </div>
//                 <div className="flex justify-between pt-3"> 
//                     <span>Discount </span>
//                     <span className=" text-green-600">{cart.cart?.discounte}</span>
//                 </div>
//                 <div className="flex justify-between pt-3"> 
//                     <span>Delivery Charge</span>
//                     <span className=" text-green-600">Free</span>
//                 </div>
//                 <div className="flex justify-between pt-3 font-bold"> 
//                     <span className=" text-green-600">Total Amount</span>
//                     <span className=" text-green-600">{cart.cart?.totalDiscountedPrice}</span>
//                 </div>
//             </div>
//             <Button
//                   onClick={handlecheckout}
//                   color="secondary"
//                   variant="contained" 
//                   className="w-full mt-5"
//                   sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}
//                 >
//                   Checkout
//                 </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// Cart.js
import React, { useEffect } from "react";
import Cartitem from "./Cartitem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItem, cart.deleteCartItem]);

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {cart.cart?.cartItems.map((items) => (
            <Cartitem key={items.id} items={items} />
          ))}
        </div>

        
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-4">price details</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>{cart.cart?.totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Discount </span>
                <span className="text-green-600">{cart.cart?.discounte}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Delivery Charge</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-3 font-bold">
                <span className="text-green-600">Total Amount</span>
                <span className="text-green-600">
                  {cart.cart?.totalDiscountedPrice}
                </span>
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              color="secondary"
              variant="contained"
              className="w-full mt-5"
              sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
