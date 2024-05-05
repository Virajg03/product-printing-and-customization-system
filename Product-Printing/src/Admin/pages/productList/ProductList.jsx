// import "./productList.css";
// import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function ProductList() {
//   const [data, setData] = useState(productRows);

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "product",
//       headerName: "Product",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="productListItem">
//             <img className="productListImg" src={params.row.img} alt="" />
//             {params.row.name}
//           </div>
//         );
//       },
//     },
//     { field: "stock", headerName: "Stock", width: 200 },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 120,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       width: 160,
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <>
//             {/* <Link to={"/admin/product/" + params.row.id}>
//               <button className="productListEdit">Edit</button>
//             </Link> */}
//             <DeleteOutline
//               className="productListDelete"
//               onClick={() => handleDelete(params.row.id)}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="productList">
//       <DataGrid
//         rows={data}
//         disableSelectionOnClick
//         columns={columns}
//         pageSize={8}
//         checkboxSelection
//       />
//     </div>
//   );
// }

// import { Fragment, useContext, useState } from "react";
// import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";

// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { findProducts } from "../../../State/Product/Action";
// import { api } from "../../../Config/apiconfig";
// import {
//   ProductsContext,
//   ProductsDispatchContext,
// } from "../../../Context/ProductsContext";
// import { Link } from "react-router-dom";
// import ProductCard from "../productList/ProductCard";

// const sortOptions = [
//   { name: "Price: Low to High", href: "#", current: false },
//   { name: "Price: High to Low", href: "#", current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductList() {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const param = useParams();
//   const [gotProducts, setGotProducts] = useState();
//   const dispatch = useDispatch();
//   // const { product } = useSelector((Store) => Store);
//   const products = useContext(ProductsContext);
//   const setProducts = useContext(ProductsDispatchContext);

//   const handlePaginationChange = (value) => {
//     const searchParams = new URLSearchParams(location.search);
//     searchParams.set("page", value);
//     const query = searchParams.toString();
//     navigate({ search: `${query}` });
//   };

//   const decodedQueryString = decodeURIComponent(location.search);
//   //search params ka use karke ham sabhi value ko get kar sakte hai
//   const searchParams = new URLSearchParams(decodedQueryString);

//   const colorValue = searchParams.get("color");
//   const sizeValue = searchParams.get("size");
//   const priceValue = searchParams.get("price");
//   const disccount = searchParams.get("disccout");
//   const sortValue = searchParams.get("sort");
//   const pageNumber = searchParams.get("page") || 1;
//   const stock = searchParams.get("stock");

//   const handleFilter = (value, sectionId) => {
//     const searchParams = new URLSearchParams(location.search);

//     let filterValues = searchParams.getAll(sectionId);

//     if (filterValues.length > 0 && filterValues[0].split(",").includes(value)) {
//       filterValues = filterValues[0]
//         .split(",")
//         .filter((item) => item !== value);
//       if (filterValues.length === 0) {
//         searchParams.delete(sectionId);
//       }
//       console.log("includes");
//     } else {
//       // Remove all values for the current section
//       // searchParams.delete(sectionId);
//       filterValues.push(value);
//     }

//     if (filterValues.length > 0)
//       searchParams.set(sectionId, filterValues.join(","));

//     // history.push({ search: searchParams.toString() });
//     const query = searchParams.toString();
//     navigate({ search: `?${query}` });
//   };

//   //useeffect ka use karke find products action dispatch karenge

//   async function getProducts(data) {
//     try {
//       // const jwt = localStorage.getItem("jwt");
//       const response = await api.get(`http://localhost:5454/api/products`, {
//         params: {
//           color: "",
//           size: "",
//           minPrice: data.minPrice,
//           maxPrice: data.maxPrice,
//           minDiscount: 0,
//           category: "",
//           stock: 1,
//           sort: "price_high",
//           pageNumber: data.pageNumber,
//           PageSize: data.pageSize,
//         },
//       });

//       console.log(response.data);

//       setGotProducts(response.data);

//       setProducts(response.data.content);

//       console.log(products);

//       // Response data will be available in response.data
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   }
//   useEffect(() => {
//     const [minPrice, maxPrice] =
//       priceValue === null ? [0, 0] : priceValue.split("-").map(Number);

//     const data = {
//       category: "men",
//       color: "white",
//       size: "xl",
//       minPrice: 0,
//       maxPrice: 10000,
//       minDiscount: 0,
//       sort: "price_high",
//       pageNumber: pageNumber - 1,
//       pageSize: 10,
//       stock: null,
//     };

//     getProducts(data);

//     dispatch(findProducts(data));
//   }, [
//     param.lavelThree,
//     colorValue,
//     sizeValue,
//     priceValue,
//     disccount,
//     sortValue,
//     pageNumber,
//     stock,
//   ]);

//   return (
//     <div className="bg-white">
//       <div>
      

//         <main className="mx-auto  px-4 sm:px-6 lg:px-20">
//           <section aria-labelledby="products-heading" className="pb-24 pt-6">
//             <h2 id="products-heading" className="sr-only">
//               Products
//             </h2>

//             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
//               <div></div>

//               {/* Product grid */}
//               {/* <div className="lg:col-span-4 w-full"> */}
//               {/* <div className="flex flex-wrap justify-center bg-white border py-5 rounded-md "> */}
//               {gotProducts &&
//                 gotProducts?.content?.map((item, idx) => (
//                   <Link to={`/product/${item.id}`}>
//                     <ProductCard product={item} key={idx} />
//                   </Link>
//                 ))}
//               {/* </div> */}
//               {/* </div> */}
//             </div>
//           </section>
//         </main>

//       </div>
//     </div>
//   );
// }



// import "./productList.css";
// import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// // import ProductCard from "../productList/ProductCard";

//   // const [gotProducts, setGotProducts] = useState();
//   // const setProducts = useContext(ProductsDispatchContext);

// export default function ProductList() {
//   const [data, setData] = useState(productRows);

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

  
//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "product",
//       headerName: "Product",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="productListItem">
//             <img className="productListImg" src={params.row.img} alt="" />
//             {params.row.name}
//           </div>
//         );
//       },
//     },
//     { field: "stock", headerName: "Stock", width: 200 },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 120,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       width: 160,
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <>
//             {/* <Link to={"/product/" + params.row.id}>
//               <button className="productListEdit">Edit</button>
//             </Link> */}
//              {/* Product grid */}
//              {/* <div className="lg:col-span-4 w-full">
//                 <div className="flex flex-wrap justify-center bg-white border py-5 rounded-md ">
//                   {gotProducts &&
//                     gotProducts?.content?.map((item, idx) => (
//                       <Link to={`/product/${item.id}`}>
//                         <dummyData product={item} key={idx} />
//                       </Link>
//                     ))}
//                 </div>
//               </div> */}

//             <DeleteOutline
//               className="productListDelete"
//               onClick={() => handleDelete(params.row.id)}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="productList">
//       <DataGrid
//         rows={data}
//         disableSelectionOnClick
//         columns={columns}
//         pageSize={8}
//         checkboxSelection
//       />
//     </div>
//   );
// }


import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Fragment, useContext, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findProducts, deleteProduct } from "../../../State/Product/Action";
import { Store } from "../../../State/Store";
import axios from "axios";
import { api } from "../../../Config/apiconfig";
import { Pagination } from "@mui/material";
import { ProductsContext, ProductsDispatchContext } from "../../../Context/ProductsContext";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const [gotProducts, setGotProducts] = useState();
  const dispatch = useDispatch();
  const { product } = useSelector((Store) => Store);
  const products = useContext(ProductsContext);
  const setProducts = useContext(ProductsDispatchContext);

  const handlePaginationChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);

  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const disccount = searchParams.get("disccout");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;
  const stock = searchParams.get("stock");

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValues = searchParams.getAll(sectionId);

    if (filterValues.length > 0 && filterValues[0].split(",").includes(value)) {
      filterValues = filterValues[0].split(",").filter((item) => item !== value);
      if (filterValues.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValues.push(value);
    }

    if (filterValues.length > 0)
      searchParams.set(sectionId, filterValues.join(","));

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleDeleteProduct = (productId) => {
    console.log("delete product", productId);
    dispatch(deleteProduct(productId));
  };

  async function getProducts(data) {
    try {
      const response = await api.get(`http://localhost:5454/api/products`, {
        params: {
          color: "",
          size: "",
          minPrice: data.minPrice,
          maxPrice: data.maxPrice,
          minDiscount: 0,
          category: "",
          stock: 1,
          sort: "price_high",
          pageNumber: data.pageNumber,
          PageSize: 100,
        },
      });

      console.log(response.data);

      setGotProducts(response.data);

      setProducts(response.data.content);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    const [minPrice, maxPrice] =
      priceValue === null ? [0, 0] : priceValue.split("-").map(Number);

    const data = {
      category: "men",
      color: "white",
      size: "xl",
      minPrice: 0,
      maxPrice: 10000,
      minDiscount: 0,
      sort: "price_high",
      pageNumber: pageNumber - 1,
      pageSize: 10,
      stock: null,
    };

    getProducts(data);

    dispatch(findProducts(data));
  }, [
    param.lavelThree,
    colorValue,
    sizeValue,
    priceValue,
    disccount,
    sortValue,
    pageNumber,
    stock,
    // product.deleteProduct,
  ]);

  return (
    <Box width={"100%"}>
      <Card className="mt-2">
        <CardHeader
          title="Products"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gotProducts &&
                gotProducts?.content?.map((item, idx) => (
                  <TableRow
                    hover
                    product={item}
                    key={idx}
                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  >
                    <TableCell>
                      <Avatar alt={item.title} src={item.imageURL} />
                    </TableCell>
                    <TableCell
                      sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="caption">{item.brand}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.category.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.price}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        variant="text"
                        onClick={() => handleDeleteProduct(item.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={gotProducts?.totalPages} // Corrected
            color="primary"
            className=""
            onChange={handlePaginationChange}
          />
        </div>
      </Card>
    </Box>
  );
}
