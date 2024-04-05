// thunks.js
import axios from 'axios';
import {
  fetchQuotationRequest,
  fetchQuotationSuccess,
  fetchQuotationFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  createQuotationRequest,
  createQuotationSuccess,
  createQuotationFailure,
  fetchAllCustomersRequest,
  fetchAllCustomersSuccess,
  fetchAllCustomersFailure,
  fetchAllProdutsRequest,
  fetchAllProdutsSuccess,
  fetchAllProdutrsFailure,
  createQuotationItemRequest,
  createQuotationItemSuccess,
  createQuotationItemFailure,
  deleteQuotationItemRequest,
  deleteQuotationItemSuccess,
  deleteQuotationItemFailure,
  createCustomerRequest,
  createCustomerSuccess,
  createCustomerFailure
} from './actions';

const token = sessionStorage.getItem('token');
const config = {
  headers: {
    token: token
  }
};

export const fetchQuotationList = (token) => {
  return async (dispatch) => {
    dispatch(fetchQuotationRequest());
    try {
      // console.log(process.env.REACT_APP_BASE_URL,">>>>>>>>>>>>>>>>>>ENV");
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_quotation`, {
        headers: {
          token: token,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.data.data;
      // console.log(data, 'data>>>>>>>>>>>>>');
      dispatch(fetchQuotationSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchQuotationFailure(error));
      throw error;
    }
  };
};

export const loginAdmin = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin_login`, credentials);
      console.log('login', response.data);
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      alert('Admin login successfully');
      const userData = response.data;
      dispatch(loginSuccess(userData));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const createQuotation = (quotationData) => {
  return async (dispatch) => {
    dispatch(createQuotationRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_quotation`, quotationData, config);
      const createdQuotation = response.data.data;
      console.log('createdQuotation>>>>', createdQuotation);
      dispatch(createQuotationSuccess(createdQuotation));
      return createdQuotation;
    } catch (error) {
      dispatch(createQuotationFailure(error.message));
      throw error;
    }
  };
};

export const createQuotationItem = (payload) => {
  return async (dispatch) => {
    dispatch(createQuotationItemRequest());
    try {
      console.log('enter');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_quatationItem`, payload, config);
      const createdQuotationitemdata = response;
      // console.log('createdQuotationitemdata>>>>', createdQuotationitemdata);
      dispatch(createQuotationItemSuccess(createdQuotationitemdata));
      return createdQuotationitemdata;
    } catch (error) {
      dispatch(createQuotationItemFailure(error.message));
      throw error;
    }
  };
};

export const fetchAllCustomers = () => {
  return async (dispatch) => {
    dispatch(fetchAllCustomersRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_customer`, config);
      const data = response.data.data;
      // console.log('data', response.data.data[0].shortname);
      dispatch(fetchAllCustomersSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCustomersFailure(error.message));
    }
  };
};

export const fetchAllProducts = () => {
  return async (dispatch) => {
    dispatch(fetchAllProdutsRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_product`, config);
      const data = response.data.data;
      // console.log('data', response.data.data[0].productname);
      dispatch(fetchAllProdutsSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllProdutrsFailure(error.message));
    }
  };
};

export const deleteQuotationItem = (id) => {
  return async (dispatch) => {
    dispatch(deleteQuotationItemRequest());
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_quotationitem/${id}`, config);
      console.log('response', response);
      dispatch(deleteQuotationItemSuccess());
    } catch (error) {
      console.error('Error deleting quotation:', error);
      dispatch(deleteQuotationItemFailure());
    }
  };
};

export const createCustomer = (formData) => {
  return async (dispatch) => {
    dispatch(createCustomerRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_customer`, formData, config);
      const createdCustomer = response;
      console.log('createdQuotation>>>>', createdCustomer);
      dispatch(createCustomerSuccess(createdCustomer));
      return createdCustomer;
    } catch (error) {
      dispatch(createCustomerFailure(error.message));
      throw error;
    }
  };
};
