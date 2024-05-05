import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../customer/components/pages/Homepage/HomePage";
import Cart from "../customer/components/Cart/Cart";
import Navigation from "../customer/components/Navigation/Navigation";
import Footer from "../customer/components/Footer/Footer";
import Product from "../customer/components/Product/Product";
import Productdetails from "../customer/components/Productdetails/Productdetails";
import Checkout from "../customer/components/Checkout/Checkout";
import Order from "../customer/components/Order/Order";
import Orderdetails from "../customer/components/Order/Orderdetails";
import PaymentSuccess from "../customer/components/Payment/PaymentSuccess";
import Customization from "../customer/components/Customization";
import Contactus from "../customer/components/Contactus";
import Aboutus from "../customer/components/Aboutus";
const CustomerRouters = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/login" element={<HomePage />} />
        <Route path="/register" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:lavelone/:laveltwo/:lavelthree" element={<Product />} />
        <Route path="/product/:productId" element={<Productdetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/order" element={<Order />} />

        <Route path="/account/order:/orderId" element={<Orderdetails />} />

        <Route path="/payment/:orderId" element={<PaymentSuccess />} />
        <Route path="/payment" element={<PaymentSuccess />} />

        <Route path="/customization" element={<Customization />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
