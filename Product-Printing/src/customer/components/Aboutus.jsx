import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Aboutus = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-3xl px-4 py-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to our t-shirt printing store! We are a team of passionate
          individuals dedicated to providing high-quality custom t-shirt
          printing services.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Our mission is to help you express yourself through personalized
          apparel. Whether it's for a special event, a sports team, a business,
          or just for fun, we've got you covered!
        </p>
        <p className="text-lg text-gray-700 mb-6">
          At our store, you'll find a wide range of t-shirts, hoodies, and
          other apparel options, along with various printing techniques to suit
          your needs. From screen printing to direct-to-garment printing, we
          ensure that your designs come out looking vibrant and long-lasting.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          We believe in providing excellent customer service, so if you have any
          questions or special requests, feel free to reach out to us. Our
          friendly team is here to assist you every step of the way.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for choosing us for your custom printing needs. Let's create
          something amazing together!
        </p>
        <div className="text-center">
          <Link
            to="/Contactus"
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Contact Us
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
