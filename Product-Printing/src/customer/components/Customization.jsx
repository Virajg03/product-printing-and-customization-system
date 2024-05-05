// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { useDispatch } from "react-redux";
// // import { addItemToCart } from "../../State/Cart/Action";
// // import { api } from "../../Config/apiconfig";
// // import API_BASE_URL from "../../Config/apiconfig";

// // const token = localStorage.getItem("jwt");

// // const axiosInstance = axios.create({
// //   baseURL: "http://localhost:5454/api/cart",
// //   headers: {
// //     Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
// //   },
// // });
// // const CustomizationPage = () => {
// //   const [products, setProducts] = useState([]);
// //   const [selectedFiles, setSelectedFiles] = useState({});
// //   const [viewedImage, setViewedImage] = useState(null); // State to store viewed image
// //   const [image, setImage] = useState(null);
// //   const [uploadedDesigns, setUploadedDesigns] = useState({});
// //   const [selectedSide, setSelectedSide] = useState(""); // State to store selected side
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get(
// //           `http://localhost:5454/customized/products?color=&size=&minPrice=0&maxPrice=10000&minDiscount=0&category=&stock=null&sort=price_high&pageNumber=0&PageSize=20`
// //         );
// //         setProducts(response.data.content);
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   const handleAddToCart = async (productId) => {
// //     try {
// //       const token = localStorage.getItem("jwt");
// //       const response = await axios.put(
// //         `http://localhost:5454/api/cart/customized/add`,
// //         { productId },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       console.log("Product added to cart:", response.data);
// //       navigate("/cart");
// //     } catch (error) {
// //       console.error("Error adding product to cart:", error);
// //     }
// //   };

// //   const handleFileChange = (productId, event) => {
// //     setImage(event.target.files[0]);
// //     setSelectedFiles({
// //       ...selectedFiles,
// //       [productId]: URL.createObjectURL(event.target.files[0]),
// //     });
// //   };

// //   const handleUploadDesign = async (productId) => {
// //     const file = selectedFiles[productId];
// //     if (!file) {
// //       console.error("Please select a file to upload");
// //       return;
// //     }

// //     try {
// //       const formData = new FormData();
// //       formData.append("image", image);
// //       formData.append("productId", productId);
// //       formData.append("addedAt", new Date().toISOString());
// //       formData.append("filePath", file.name);
// //       formData.append("name", file.name);
// //       formData.append("type", file.type);
// //       formData.append("side", selectedSide); // Add selected side to formData

// //       const response = await axios.post(
// //         `http://localhost:5454/designs/${productId}`,
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );

// //       console.log("Upload successful:", response.data);
// //       setUploadedDesigns({
// //         ...uploadedDesigns,
// //         [productId]: response.data.filePath,
// //       });
// //     } catch (error) {
// //       console.error("Error uploading design:", error);
// //     }
// //   };

// //   const handleViewImage = (image) => {
// //     setViewedImage(image);
// //   };

// //   const handleSideChange = (event) => {
// //     setSelectedSide(event.target.value);
// //   };

// //   return (
// //     <div className="flex flex-wrap justify-around p-6">
// //       <h1 className="text-3xl font-bold mb-8 w-full text-center">
// //         Product Designs
// //       </h1>
// //       {products.map((product) => (
// //         <div
// //           key={product.id}
// //           className="flex w-full justify-between bg-cover rounded-sm border-2 items-start"
// //         >
// //           {/* Product Information */}
// //           <div className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg border-2 bg-white m-4">
// //             <img
// //               src={product.imageUrl}
// //               alt={product.title}
// //               className="w-full max-h-48 object-contain"
// //             />
// //             <div className="px-6 py-4 flex-grow">
// //               <div className="font-bold text-xl mb-2">{product.title}</div>
// //               <p className="text-gray-700 text-base">{product.description}</p>
// //               <p className="text-gray-700 text-base">Price: {product.price}</p>
// //             </div>
// //             <div className="px-6 pt-4 pb-2">
// //               <button
// //                 onClick={() => handleAddToCart(product.id)}
// //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //               >
// //                 Add to Cart
// //               </button>
// //             </div>
// //           </div>

// //           {/* Upload Design Option */}
// //           <div className="flex justify-center items-center">
// //   <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 bg-white m-4">
// //     <div className="px-6 py-4">
// //       <h3 className="text-xl font-bold mb-2">Upload Design</h3>
// //       <input
// //         type="file"
// //         onChange={(event) => handleFileChange(product.id, event)}
// //       />
// //       <select
// //         onChange={handleSideChange}
// //         className="bg-white border border-gray-300 rounded-md px-4 py-2 mt-4 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
// //       >
// //         <option value="">Select side</option>
// //         <option value="front">Front</option>
// //         <option value="back">Back</option>
// //         <option value="sleeve">Sleeve</option>
// //       </select>

// //       <button
// //         onClick={() => handleUploadDesign(product.id)}
// //         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" // Add mt-4 here
// //       >
// //         Upload Design
// //       </button>
// //     </div>
// //     {viewedImage && (
// //       <div className="px-6 py-4">
// //         <h3 className="text-xl font-bold mb-2">Viewed Image</h3>
// //         <img
// //           src={viewedImage}
// //           alt="Viewed Image"
// //           className="w-full"
// //         />
// //       </div>
// //     )}
// //   </div>
// // </div>

// //           {/* Actions */}
// //           <div className="max-w-sm rounded overflow-hidden border-2 shadow-lg bg-white m-4">
// //             <div className="px-6 py-4">
// //               <h3 className="text-xl font-bold mb-2">Design</h3>
// //               {selectedFiles[product.id] && (
// //                 <>
// //                   {/* <p className="text-gray-700 text-base mt-2 animate-bounce">Selected Side: {selectedSide}</p> */}
// //                   <p className="text-blue-700 font-semibold text-lg mt-2 animate-bounce">
// //                     Selected Side: {selectedSide}
// //                   </p>

// //                   <img
// //                     src={selectedFiles[product.id]}
// //                     alt="Selected Image"
// //                     className="w-full max-h-80 object-contain"
// //                     style={{ maxHeight: "160px" }}
// //                   />
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default CustomizationPage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CustomizationPage = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState({});
//   const [viewedImage, setViewedImage] = useState(null);
//   const [image, setImage] = useState(null);
//   const [uploadedDesigns, setUploadedDesigns] = useState({});
//   const [selectedSide, setSelectedSide] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5454/customized/products?color=&size=&minPrice=0&maxPrice=10000&minDiscount=0&category=&stock=null&sort=price_high&pageNumber=0&PageSize=20`
//         );
//         setProducts(response.data.content);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddToCart = async (productId) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5454/api/cart/customized/add`,
//         { productId }
//       );
//       console.log("Product added to cart:", response.data);
//       navigate("/cart");
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//     }
//   };

//   const handleFileChange = (productId, event) => {
//     setImage(event.target.files[0]);
//     setSelectedFiles({
//       ...selectedFiles,
//       [productId]: URL.createObjectURL(event.target.files[0]),
//     });
//   };

//   const handleUploadDesign = async (productId) => {
//     const file = selectedFiles[productId];
//     if (!file) {
//       console.error("Please select a file to upload");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("productId", productId);
//       formData.append("addedAt", new Date().toISOString());
//       formData.append("filePath", file.name);
//       formData.append("name", file.name);
//       formData.append("type", file.type);
//       formData.append("side", selectedSide);

//       const response = await axios.post(
//         `http://localhost:5454/designs/${productId}`,
//         formData
//       );

//       console.log("Upload successful:", response.data);
//       setUploadedDesigns({
//         ...uploadedDesigns,
//         [productId]: response.data.filePath,
//       });
//     } catch (error) {
//       console.error("Error uploading design:", error);
//     }
//   };

//   const handleViewImage = (image) => {
//     setViewedImage(image);
//   };

//   const handleSideChange = (event) => {
//     setSelectedSide(event.target.value);
//   };

//   return (
//     <div className="flex flex-wrap justify-around p-6">
//       <h1 className="text-3xl font-bold mb-8 w-full text-center">
//         Product Designs
//       </h1>
//       {products.map((product, index) => (
//         <div
//           key={product.id}
//           className="customization-product flex w-full justify-between bg-cover rounded-sm border-2 items-start"
//           style={{ animationDelay: `${index * 0.1}s` }}
//         >
//           {/* Product Information */}
//           <div className="product-info flex flex-col max-w-sm rounded overflow-hidden shadow-lg border-2 bg-white m-4">
//             <img
//               src={product.imageUrl}
//               alt={product.title}
//               className="w-full max-h-48 object-contain"
//             />
//             <div className="px-6 py-4 flex-grow">
//               <div className="font-bold text-xl mb-2">{product.title}</div>
//               <p className="text-gray-700 text-base">{product.description}</p>
//               <p className="text-gray-700 text-base">Price: {product.price}</p>
//             </div>
//             <div className="px-6 pt-4 pb-2">
//               <button
//                 onClick={() => handleAddToCart(product.id)}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>

//           {/* Upload Design Option */}
//           <div className="upload-design flex justify-center items-center">
//             <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 bg-white m-4">
//               <div className="px-6 py-4">
//                 <h3 className="text-xl font-bold mb-2">Upload Design</h3>
//                 <input
//                   type="file"
//                   onChange={(event) => handleFileChange(product.id, event)}
//                 />

//                 {/* <select
//                   onChange={handleSideChange}
//                   className="bg-white border border-gray-300 rounded-md px-4 py-2 mt-4 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
//                 >
//                   <option value="">Select side</option>
//                   <option value="front">Front</option>
//                   <option value="back">Back</option>
//                   <option value="sleeve">Sleeve</option>
//                 </select> */}

//                 <select
//                   onChange={handleSideChange}
//                   className="bg-white border border-gray-300 rounded-md px-4 py-2 mt-4 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 relative"
//                 >
//                   <option value="">Select side</option>
//                   <option
//                     value="front"
//                     className="bg-no-repeat bg-right pr-8"
//                     style={{
//                       backgroundImage: `url("file:///C:/Users/AASHISH/Downloads/front.png")`,
//                     }}
//                   >
//                     Front
//                   </option>
//                   <option
//                     value="back"
//                     className="bg-no-repeat bg-right pr-8"
//                     style={{
//                       backgroundImage: `url("/back.png")`,
//                     }}
//                   >
//                     Back
//                   </option>
//                   <option
//                     value="sleeve"
//                     className="bg-no-repeat bg-right pr-8"
//                     style={{
//                       backgroundImage: `url("/sleeve.png")`,
//                     }}
//                   >
//                     Sleeve
//                   </option>
//                 </select>

//                 <button
//                   onClick={() => handleUploadDesign(product.id)}
//                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
//                 >
//                   Upload Design
//                 </button>
//               </div>
//               {viewedImage && (
//                 <div className="px-6 py-4">
//                   <h3 className="text-xl font-bold mb-2">Viewed Image</h3>
//                   <img
//                     src={viewedImage}
//                     alt="Viewed Image"
//                     className="w-full"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="max-w-sm rounded overflow-hidden border-2 shadow-lg bg-white m-4">
//             <div className="px-6 py-4">
//               <h3 className="text-xl font-bold mb-2">Design</h3>
//               {selectedFiles[product.id] && (
//                 <>
//                   <p className="text-blue-700 font-semibold text-lg mt-2 animate-bounce">
//                     Selected Side: {selectedSide}
//                   </p>
//                   <img
//                     src={selectedFiles[product.id]}
//                     alt="Selected Image"
//                     className="w-full max-h-80 object-contain"
//                     style={{ maxHeight: "160px" }}
//                   />
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CustomizationPage;


// // import React from 'react'

// // const Customization = () => {
// //   return (
// //     <div>
// //       <h1>hello how are you i am fine </h1>
// //     </div>
// //   )
// // }

// // export default Customization

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { api } from "../../Config/apiconfig";

// const Customization = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProductId, setSelectedProductId] = useState("");
//   const [designFile, setDesignFile] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [uploadedImage, setUploadedImage] = useState(null);
//   useEffect(() => {
//     const fetchProducts = () => {
//       try {
//         api
//           .get("/api/products", {
//             params: {
//               color: "",
//               size: "",
//               minPrice: 0,
//               maxPrice: 10000,
//               minDiscount: 0,
//               category: "",
//               stock: 1,
//               sort: "price_high",
//               pageNumber: 0,
//               PageSize: 1,
//             },
//           })
//           .then((response) => {
//             setProducts(response.data.content);
//             console.log(products);
//           })
//           .catch((err) => console.log(err));
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleProductSelect = (event) => {
//     setSelectedProductId(event.target.value);
//   };

//   const handleFileChange = (event) => {
//     setDesignFile(event.target.files[0]);
//     setUploadedImage(URL.createObjectURL(event.target.files[0]));
//   };

//   const handleDesignUpload = async () => {
//     if (!designFile || !selectedProductId) {
//       setErrorMessage("Please select a product and upload a design file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", designFile);

//     try {
//       const response = await axios.post(
//         `/designs/${selectedProductId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setUploadMessage(response.data);
//       setErrorMessage("");
//     } catch (error) {
//       console.error("Error uploading design:", error);
//       setUploadMessage("");
//       setErrorMessage("Failed to upload design. Please try again.");
//     }
//   };

//   return (<div className="container mx-auto p-8">
//   <h1 className="text-3xl font-bold mb-8">T-Shirt Printing</h1>
//   <div className="flex">
//     {/* Product Information */}
//     <div className="w-full lg:w-1/2 pr-8">
//       {products &&
//         products.map((product) => (
//           <div key={product.id} className="mb-8">
//             <div className="bg-white rounded-lg shadow-lg overflow-hidden bg-cover w-48">
//               {/* Product Image */}
//               <div className="relative align-center overflow-hidden justify-center">
//                 <img src={product.imageUrl} alt={product.title} className="w-40 h-40 object-contain" />
//               </div>
//               {/* Product Information */}
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
//                 <p className="text-gray-600 mb-2">Price: ${product.price}</p>
//                 <p className="text-gray-600 mb-2">Color: {product.color}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//     {/* Spacer */}
//     {/* <div className=""></div> */}
//     {/* Upload Design Section */}
//     <div className="w-full lg:w-1/2 pl-8">
//       <h2 className="text-2xl font-semibold mb-4">Upload Design:</h2>
//       <input
//         type="file"
//         onChange={handleFileChange}
//         className="mb-2"
//       />
//       <button
//         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//         onClick={handleDesignUpload}
//       >
//         Upload
//       </button>
//       {uploadedImage && (
//         <div className="mt-4">
//           <h2 className="text-xl font-semibold mb-2">Uploaded Image:</h2>
//           <img src={uploadedImage} alt="Uploaded Design" className="max-w-xs" />
//         </div>
//       )}
//     </div>
//   </div>
//   {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//   {uploadMessage && <p className="text-green-500">{uploadMessage}</p>}
// </div>

  
  
  
//   );
// };

// export default Customization;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Customization = () => {
//     const [product, setProduct] = useState(null);
//     const [designFile, setDesignFile] = useState(null);

//     useEffect(() => {
//         // Fetch product details from the API
//         axios.get('http://localhost:5454/customized/products?color=&size=&minPrice=0&maxPrice=10000&minDiscount=0&category=&stock=null&sort=price_high&pageNumber=0&PageSize=10')
//             .then(response => {
//                 // Assuming the response data contains a single product object
//                 setProduct(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching product details:', error);
//             });
//     }, []);

//     const handleDesignUpload = (event) => {
//         // Handle file upload
//         const file = event.target.files[0];
//         setDesignFile(file);
//     };

//     return (
//         <div className="customization-container bg-gray-100 py-8">
//             {product && (
//                 <div className="product-details flex justify-between items-center bg-white shadow-lg rounded-lg p-6">
//                     <div className="left-side flex flex-col justify-center items-center">
//                         <img
//                             src={product.imageUrl}
//                             alt={product.title}
//                             className="rounded-lg mb-4"
//                             style={{ maxWidth: '150px', maxHeight: '150px' }}
//                         />
//                         <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
//                         <p className="text-gray-700 mb-4">{product.description}</p>
//                         <p className="text-blue-700">Price: {product.price}</p>
//                         <p className="text-gray-700">Discounted Price: {product.discountedPrice}</p>
//                         <p className="text-gray-700">Discounted Price: {product.discountedPrice}</p>

//                         {/* Other product details can be displayed here */}
//                     </div>
//                     <div className="right-side flex flex-col justify-center items-center">
//                         <h3 className="text-xl font-bold mb-4">Upload Your Design</h3>
//                         <input type="file" onChange={handleDesignUpload} accept="image/*" className="mb-4" />
//                         {/* Additional design upload options can be added here */}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Customization;
// const response = await axios.get(`http://localhost:5454/customized/products?color=&size=&minPrice=0&maxPrice=10000&minDiscount=0&category=&stock=null&sort=price_high&pageNumber=0&PageSize=10`);

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../State/Cart/Action';
import {api} from '../../Config/apiconfig';
import API_BASE_URL from '../../Config/apiconfig';

// const BASE_URL = '{{BASE_URL}}'; // Replace with your actual base URL
// const jwt = localStorage.getItem("jwt");

const token = localStorage.getItem("jwt");

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5454/api/cart',
  headers: {
    'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
  }
});
const CustomizationPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [viewedImage, setViewedImage] = useState(null); // State to store viewed image
    const navigate = useNavigate();
    const [image, setImage] = useState(null)
    const dispatch = useDispatch();
    const [uploadedDesigns, setUploadedDesigns] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5454/customized/products?color=&size=&minPrice=0&maxPrice=10000&minDiscount=0&category=&stock=null&sort=price_high&pageNumber=0&PageSize=100`);
                setProducts(response.data.content);
                console.log(response.data.content);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // const obj = {
    //     productId,      
    //     size: selectedSize.name,
    //     quantity: cartQuantity
    //   }

    const handleAddToCart = async (productId) => {
        try {
          const token = localStorage.getItem("jwt");
          
          const response = await axios.put(
            `http://localhost:5454/api/cart/customized/add`, // Assuming this is your cart endpoint
            { productId , quantity : 1 },


            
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );
          console.log("Product added to cart:", response.data);
          navigate("/cart"); // Redirect to the cart page after adding the product
        } catch (error) {
          console.error("Error adding product to cart:", error);
        }
      };

    // const handleAddToCart = async () => {
    //     try {
    //         const token = localStorage.getItem("jwt");
    
    //         const response = await axios.put(
    //             `http://localhost:5454/api/cart/customized/add`,
    //             obj, // Include obj in the request body
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             }
    //         );
    //         console.log("Product added to cart:", response.data);
    //         navigate("/cart"); // Redirect to the cart page after adding the product
    //     } catch (error) {
    //         console.error("Error adding product to cart:", error);
    //     }
    // };
    


    const handleFileChange = (productId, event) => {
        setImage(event.target.files[0]);
        setSelectedFiles({
            ...selectedFiles,
            [productId]: URL.createObjectURL(event.target.files[0]) // Store the URL of the selected image
        });
    };

    // const handleUploadDesign = async (productId) => {
    //     const file = selectedFiles[productId];
    //     if (!file) {
    //         console.error("Please select a file to upload");
    //         return;
    //     }
    
    //     try {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         formData.append('productId', productId);
            
    //         const response = await axios.post(`http://localhost:5454/designs/${productId}`, {
    //             params: {
    //                 image: formData 
    //             }
    //         },            {
    //             headers: {
    //               'Authorization': `Bearer ${token}`,
    //               'Content-Type': 'multipart/form-data',
    //             }
    //           });
    //         console.log("Upload successful:", response.data);
    //         setUploadedDesigns({
    //             ...uploadedDesigns,
    //             [productId]: response.data.filePath
    //         });
    //     } catch (error) {
    //         console.error("Error uploading design:", error);
    //     }
    // };

    const handleUploadDesign = async (productId) => {
        const file = selectedFiles[productId];
        if (!file) {
            console.error("Please select a file to upload");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('productId', productId);
            formData.append('addedAt', new Date().toISOString());
            formData.append('filePath', file.name);
            formData.append('name', file.name);
            formData.append('type', file.type);
    
            const response = await axios.post(`http://localhost:5454/designs/productid/${productId}/location/left`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            console.log("Upload successful:", response.data);
            setUploadedDesigns({
                ...uploadedDesigns,
                [productId]: response.data.filePath
            });
        } catch (error) {
            console.error("Error uploading design:", error);
        }
    };
    
    
    
    
    

    const handleViewImage = (image) => {
        setViewedImage(image);
    };

    return (
        <div className="flex flex-wrap justify-around p-6">
            <h1 className="text-3xl font-bold mb-8 w-full text-center">Product Designs</h1>
            {products.map(product => (
                <div key={product.id} className="flex w-full justify-between bg-cover rounded-sm border-2 items-start">
                    {/* Product Information */}
                    <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 bg-white m-4">
                        <img src={product.imageUrl} alt={product.title} className="w-full max-h-48 object-contain" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{product.title}</div>
                            <p className="text-gray-700 text-base">{product.description}</p>
                            <p className="text-gray-700 text-base">Price: {product.price}</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <button onClick={() => handleAddToCart(product.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                    {/* Upload Design Option */}
                    <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 bg-white m-4 flex justify-center">
                        <div className="px-6 py-4">
                            <h3 className="text-xl font-bold mb-2">Upload Design</h3>
                            <input type="file" onChange={(event) => handleFileChange(product.id, event)} />
                            <button onClick={() => handleUploadDesign(product.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
                                Upload Design
                            </button>
                        </div>
                        {viewedImage && (
                            <div className="px-6 py-4">
                                <h3 className="text-xl font-bold mb-2">Viewed Image</h3>
                                <img src={viewedImage} alt="Viewed Image" className="w-full" />
                            </div>
                        )}
                    </div>
                    {/* Actions */}
                    <div className="max-w-sm rounded overflow-hidden border-2 shadow-lg bg-white m-4">
                        <div className="px-6 py-4">
                            <h3 className="text-xl font-bold mb-2">Actions</h3>
                            {selectedFiles[product.id] && (
                                <img src={selectedFiles[product.id]} alt="Selected Image" className="w-full" />
                            )}
                            {/* <button onClick={() => handleViewImage(selectedFiles[product.id])} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
                                View Image
                            </button> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomizationPage;
