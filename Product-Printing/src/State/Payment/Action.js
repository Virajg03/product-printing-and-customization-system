import API_BASE_URL from "../../Config/apiconfig";
import { api } from "../../Config/apiconfig";

import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
} from "./Actiontype";

// import axios from 'axios';

export const createPayment = (orderId) => async (dispatch) => {
  // console.log("create payment reqData ",reqData)
  console.log(orderId)
  dispatch({
    type: CREATE_PAYMENT_REQUEST,
  });
  try {
    const { data } = await api.post(`/api/payments/${orderId}`, {});

    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${reqData.jwt}`,
    //   },
    // };
    // const { data } = await axios.post(`${API_BASE_URL}/api/payments/${reqData.orderId}`,reqData, config);
    // console.log("datta",data)
    // dispatch({
    //   type: CREATE_PAYMENT_SUCCESS,
    //   payload: data,
    // });
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload: error.message,
    });
  }
};

export const updatePayment = (reqData) => async (dispatch) => {
  // console.log("create payment reqData ",reqData)
  dispatch({
    type: UPDATE_PAYMENT_REQUEST,
  });
  try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${reqData.jwt}`,
    //     },
    //   };

    const { data } = await api.get(
      `/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`
    );
    // if(data.payment_link_url){
    //   window.location.href=data.payment_link_url;
    // }
    //     dispatch({
    //       type: CREATE_PAYMENT_SUCCESS,
    //       payload: data,
    //     });
    console.log("update", data);
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload: error.message,
    });
  }
};
