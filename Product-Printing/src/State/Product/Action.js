import axios from "axios";

import {
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,

} from "./Actiontype";
import { api } from "../../Config/apiconfig";

export const findProducts = (reqData) => async (dispatch) => {

  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    dispatch({ type: FIND_PRODUCTS_REQUEST });

    // const { data } = await api.get(
    //   `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    // );

    console.log("get product by category - ", data);
    dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data});
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_FAILURE,
      payload:error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};


export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
    const {productId} = reqData;
    // console.log("product id",productId)

  try {
        const {data} =  await api.get(`/api/products/id/${productId}`);

    console.log("get product by category - ", data);
    dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS, payload:data});
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload:error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};

export const addToCartApi = (obj) => async (dispatch) => {
  console.log('calling..............');
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });
    const { data } = await api.put('/api/cart/add', obj);
    console.log(data);
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAILURE, payload: error.message });
  }
}

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { data } = await api.post(
      `http://localhost:5454/api/admin/products/`,
      product.data
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    console.log("created product ", data);
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const { data } = await api.put(
      `${API_BASE_URL}/api/admin/products/${product.productId}`,
      product
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  console.log("delete product action",productId)
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    let {data}=await api.delete(`/api/admin/products/${productId}/delete`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    });

    console.log("product delte ",data)
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




// export const findProductById = (reqData) => async (dispatch) => {
//   try {
//     dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

//     const { data } = await api.get(`/api/products/id/${reqData.productId}`);

//     console.log("products by  id : ", data);
//     dispatch({
//       type: FIND_PRODUCT_BY_ID_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FIND_PRODUCT_BY_ID_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const createProduct = (product) => async (dispatch) => {
//   try {
//     dispatch({ type: CREATE_PRODUCT_REQUEST });

//     const { data } = await api.post(
//       `${API_BASE_URL}/api/admin/products/`,
//       product.data
//     );

//     dispatch({
//       type: CREATE_PRODUCT_SUCCESS,
//       payload: data,
//     });

//     console.log("created product ", data);
//   } catch (error) {
//     dispatch({
//       type: CREATE_PRODUCT_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const updateProduct = (product) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PRODUCT_REQUEST });

//     const { data } = await api.put(
//       `${API_BASE_URL}/api/admin/products/${product.productId}`,
//       product
//     );

//     dispatch({
//       type: UPDATE_PRODUCT_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PRODUCT_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const deleteProduct = (productId) => async (dispatch) => {
//   console.log("delete product action",productId)
//   try {
//     dispatch({ type: DELETE_PRODUCT_REQUEST });

//     let {data}=await api.delete(`/api/admin/products/${productId}/delete`);

//     dispatch({
//       type: DELETE_PRODUCT_SUCCESS,
//       payload: data,
//     });

//     console.log("product delte ",data)
//   } catch (error) {
//     console.log("catch error ",error)
//     dispatch({
//       type: DELETE_PRODUCT_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
