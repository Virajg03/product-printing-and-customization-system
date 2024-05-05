// import React from "react";
// import { Button, IconButton } from "@mui/material";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// // import ControlPointIcon from '@mui/icons-material/ControlPoint';333
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import { useDispatch } from "react-redux";
// import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";
// // import {products} from "../../../State/Product/Action"
// // import Button from "@mui/material";
// // import { useNavigate } from 'react-router-dom';

// const Cartitem = (props) => {
//   const { items } = props; // Destructure items from props
//   const dispatch = useDispatch();

//   const handleUpdateCartItem = (num) => {
//     const data = {
//       data: { quantity: items.quantity + num },
//       cartItemId: items?.id,
//     };
//     dispatch(updateCartItem(data));
//   };

//   const handleRemoveCartItem = () => {
//     dispatch(removeCartItem(items.id));
//   };
//   return (
//     <div className="p-5 shadow-lg border rounded-md">
//       <div className="flex items-center">
//         <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
//           <img
//             className=" w-full h-full object-cover object-top "
//             src={items.product ? items.product.imageUrl : ""}
//             alt=""
//           ></img>
//         </div>

//         {/*  content of the product  */}
//         <div className="ml-5 space-y-1">
//           {/* cart.cart?.discounte */}
//           <p className="font-semibold ">{items.product.title} </p>
//           <p className="opacity-70">Size : {items.size}</p>
//           <p className="opacity-70 mt-2">Seller: {items.product.brand}</p>

//           <div className="flex space-x-5 items-center  text-gray-900 mt-10">
//             <p className="font-semibold">Price :{items.product.price}</p>
//             <p className="opacity-50 line-through">{items.discountedPrice}</p>
//             <p className="text-green-600 font-semibold">
//               {items.product.discountPersent} % Off
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="lg:flex items-center lg:space-x-10 pt-4">
//         <div className="flex items-center space-x-2">
//           <IconButton
//             onClick={() => handleUpdateCartItem(-1)}
//             disabled={items.quantity <= 1}
//           >
//             <RemoveCircleOutlineIcon />
//           </IconButton>
//           <span className="py-1 px-7 border rounded-sm"> {items.quantity}</span>
//           <IconButton
//             onClick={() => handleUpdateCartItem(1)}
//             sx={{ color: "RGB(145,85,253)" }}
//           >
//             <AddCircleOutlineIcon />
//           </IconButton>
//         </div>
//         <div>
//           <Button
//             onClick={handleRemoveCartItem}
//             sx={{ color: "RGB(145,85,253)" }}
//           >
//             {" "}
//             Remove{" "}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cartitem;

import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";
// import {customizedProductsDetails} from ""
// import {CustomizedProductDetails} from "../../../customer/components/CustomizedProductDetails"
// Product-Printing\src\customer\components\CustomizedProductDetails.jsx
const   Cartitem = (props) => {
  const { items } = props;

  const dispatch = useDispatch();
  // console.log(items);

  // Initialize quantity state with items.quantity or 1 if not provided
  const [quantity, setQuantity] = useState(items.quantity || 1);
  const [customizedProduct, setCustomizedProduct] = useState(
    items.customizedProduct
  );
  const [loading, setLoading] = useState(true);

  // console.log(customizedProduct);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5454/customized/products/id/${productid}');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setCustomizedProduct(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Function to handle updating the cart item quantity
  // const handleUpdateCartItem = (num) => {
  //   const newQuantity = quantity + num;
  //   if (newQuantity >= 1) { // Ensure quantity doesn't go below 1
  //     setQuantity(newQuantity);
  //     const data = {
  //       data: { quantity: newQuantity },
  //       cartItemId: items.id,
  //     };
  //     dispatch(updateCartItem(data));

  //   }
  // };

  // Function to handle removing the cart item
  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(items.id));
  };
  return customizedProduct !== null ? (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
      <div className="space-x-4 lg:space-x-8">
  <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] transition-transform transform hover:scale-105 inline-block">
    <img
      className="w-full h-full object-cover object-top"
      src={customizedProduct ? customizedProduct.imageUrl : ""}
      alt=""
    />
  </div>
  {/* <div><p></div> */}
  <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] transition-transform transform hover:scale-105 inline-block">
    <img
      className="w-full h-full object-cover object-top"
      src="https://m.media-amazon.com/images/I/514vA5CPK5S.jpg"
      alt=""
    />
  </div>
</div>

        {/* <p><strong>Title:</strong> {customizedProduct.title}</p> */}

        <div className="ml-5 space-y-1">
          <p className="font-semibold ">
            {/* {items.product.title}  */}
            {customizedProduct ? customizedProduct.title : ""}
          </p>

          <p className="opacity-70">Size : {items.size}</p>
          <p className="opacity-70 mt-2">
            Seller:
            {/* {items.product.brand} */}
            {customizedProduct ? customizedProduct.brand : ""}
          </p>
          <div className="flex space-x-5 items-center  text-gray-900 mt-10">
            <p className="font-semibold">
              Price :{/* {customizedProduct.price} */}
              {customizedProduct ? customizedProduct.price : ""}
              {/* {totalPrice} */}
            </p>{" "}
            {/* Display total price */}
            <p className="opacity-50 line-through">
              {/* {customizedProduct.discountedPrice} */}
              {customizedProduct ? customizedProduct.discountedPrice : ""}
            </p>
            <p className="text-green-600 font-semibold">
              {/* {customizedProduct.discountPersent} % Off */}
              {customizedProduct ? customizedProduct.discountPersent : ""} % Off
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div>
          <Button
            onClick={handleRemoveCartItem}
            sx={{ color: "RGB(145,85,253)" }}
          >
            {" "}
            Remove{" "}
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className=" w-full h-full object-cover object-top "
            src={items.product ? items.product.imageUrl : ""}
            alt=""
          ></img>
        </div>
        {/* <p><strong>Title:</strong> {customizedProduct.title}</p> */}

        <div className="ml-5 space-y-1">
          <p className="font-semibold ">
            {/* {items.product.title}  */}
            {items.product ? items.product.title : ""}
          </p>

          <p className="opacity-70">Size : {items.size}</p>
          <p className="opacity-70 mt-2">
            Seller: 
            {/* {items.product.brand} */}
            {items.product ? items.product.brand : ""}
          </p>
          <p className="opacity-70 mt-2">
          Quantity: 
            {/* {items.product.brand} */}
            {items.quantity}
          </p>
          <div className="flex space-x-5 items-center  text-gray-900 mt-10">
            <p className="font-semibold">
              Price :{/* {items.product.price} */}
              {items.product ? items.product.price : ""}
              {/* {totalPrice} */}
            </p>{" "}
            {/* Display total price */}
            <p className="opacity-50 line-through">
              {/* {items.product.discountedPrice} */}
              {items.product ? items.product.discountedPrice : ""}
            </p>
            <p className="text-green-600 font-semibold">
              {/* {items.product.discountPersent} % Off */}
              {items.product ? items.product.discountPersent : ""} % Off
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div>
          <Button
            onClick={handleRemoveCartItem}
            sx={{ color: "RGB(145,85,253)" }}
          >
            {" "}
            Remove{" "}
          </Button>
        </div>
      </div>
    </div>
  );  
};

export default Cartitem;
