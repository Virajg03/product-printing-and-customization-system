import React, { useEffect } from 'react'
import Addresscard from '../Addreescard/Addresscard'
import { Button } from '@mui/material'
import Cartitem from '../Cart/Cartitem'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../State/Order/Action'
import { useLocation } from 'react-router-dom'
import { Store } from '../../../State/Store'
import { createPayment } from '../../../State/Payment/Action'

// import { UseSelector } from 'react-redux'

const   Ordersummarry = () => {
  const dispatch = useDispatch();
  const {order} = useSelector((store1)=>store1)
  //id kese nikaluga woh 
  const location = useLocation();
 const searchParams= new URLSearchParams(location.search);
 const orderId = searchParams.get("order_id")

 

  useEffect(() => {
    dispatch(getOrderById(orderId))
  },[orderId])

  const handleCheckout = () => {
    // const data={orderId:order.order?.id}
    // dispatch(createPayment(data))
    dispatch(createPayment(orderId))

  }

  // const handleCheckout = () => {
  //   const data = { orderId: order.order?.id };
  //   dispatch(createPayment(data))
  //     .then(() => {
  //       // After creating payment, check if payment link URL is available
  //       if (order.paymentLinkUrl) {
  //         // Redirect to the payment link URL
  //         window.location.href = order.paymentLinkUrl;
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error creating payment:", error);
  //       // Handle error if necessary
  //     });
  // };
  
  

  return (
    <div>
      <div className='p-5 shadow-large rounded-s-md'>
            <Addresscard Address={order.order?.shippingAddress}/>
      </div>

      <div>
      <div className="lg:grid grid-cols-3  relative">
        <div className="col-span-2">
          {/* {order.order?.orderItems.map((item)=><Cartitem item={item} />)} */}
          {/* <div className="col-span-2">
          {cart.cart?.cartItems.map((items) => (
            <Cartitem key={items.id} items={items} />
          ))}
        </div> */}
         {/* {order.order?.orderItems.map((item) => (
              <>
                <Cartitem item={item} showButton={false}/>
              </>
            ))} */}

        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-4">price details</p>
            <hr/>
            <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black"> 
            
                    <span>Price</span>
                    <span>{order.order?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3"> 
                    <span>Discount </span>
                    <span className=" text-green-600">{order.order?.discounte}</span>
                </div>
                <div className="flex justify-between pt-3"> 
                    <span>Delivery Charge</span>
                    <span className=" text-green-600">Free</span>
                </div>
                <div className="flex justify-between pt-3 font-bold"> 
                    <span className=" text-green-600">Total Amount</span>
                    <span className=" text-green-600">{order.order?.totalDiscountedPrice}</span>
                </div>
            </div>
            <Button
                  color="secondary"
                  variant="contained" 
                  className="w-full mt-5"
                  sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}
                  onClick={handleCheckout}
                >
                  Payment
                </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Ordersummarry
