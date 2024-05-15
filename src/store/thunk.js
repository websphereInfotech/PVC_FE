// thunks.js
import axios from 'axios';
// import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  // LOGIN
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  // QUOTATION ++++++++++++++++++++++++++++++
  fetchProformainvoiceRequest,
  fetchProformainvoiceSuccess,
  fetchProformainvoiceFailure,
  createProformainvoiceRequest,
  createProformainvoiceSuccess,
  createProformainvoiceFailure,
  deleteProformainvoiceItemRequest,
  deleteProformainvoiceItemSuccess,
  deleteProformainvoiceItemFailure,
  deleteProformainvoiceRequest,
  deleteProformainvoiceSuccess,
  deleteProformainvoiceFailure,
  updateProformainvoiceRequst,
  updateProformainvoicesuccess,
  updateProformainvoicefailure,
  viewProformainvoiceRequest,
  viewProformainvoiceSuccess,
  viewProformainvoiceFailure,
  // CUSTOMER +++++++++++++++++++++++++++++++++++++
  fetchAllCustomersRequest,
  fetchAllCustomersSuccess,
  fetchAllCustomersFailure,
  createCustomerRequest,
  createCustomerSuccess,
  createCustomerFailure,
  createCustomFeildRequest,
  createCustomFeildSuccess,
  createCustomFeildFailure,
  // PRODUCT ++++++++++++++++++++++++++++++++++
  fetchAllProdutsRequest,
  fetchAllProdutsSuccess,
  fetchAllProdutrsFailure,
  createProductRequest,
  createProductFailure,
  createProductSuccess,
  // PURCHASE +++++++++++++++++++++++++++++++
  viewPurchaseRequest,
  viewPurchaseSuccess,
  viewPurchaseFailure,
  createPurchaseRequest,
  createPrchaseSuccess,
  createPurchaseFailure,
  createPurchaseItemRequest,
  createPrchaseItemSuccess,
  createPurchaseItemFailure,
  fetchAllPurchaseRequest,
  fetchAllPurchaseSuccess,
  fetchAllPurchaseFailure,
  updatePurchaseRequst,
  updatePurchasefailure,
  updatePurchasesuccess,
  updatePurchaseItemRequst,
  updatePurchaseItemfailure,
  updatePurchaseItemsuccess,
  deletePurchaseItemRequest,
  deletePurchaseItemFailure,
  deletePurchaseItemSuccess,
  //  DELIVERYCHALLAN +++++++++++++++++++++++
  createDeliveryChallanRequest,
  createDeliveryChallanSuccess,
  createDeliveryChallanFailure,
  createDeliveryChallanItemRequest,
  createDeliveryChallanItemSuccess,
  createDeliveryChallanItemFailure,
  getAllDeliverychallanRequest,
  getAllDeliverychallanSuccess,
  getAllDeliverychallanFailure,
  viewDeliverychallanRequest,
  viewDeliverychallanSuccess,
  viewDeliverychallanFailure,
  updateDileverychallanRequest,
  updateDileverychallanFailure,
  updateDileverychallanSuccess,
  updateDileverychallanItemRequest,
  updateDileverychallanItemFailure,
  updateDileverychallanItemSuccess,
  deleteDileverychallanItemRequest,
  deleteDileverychallanItemFailure,
  deleteDileverychallanItemSuccess,
  //  PAYMENTS +++++++++++++++++++++++++++
  createPaymentRequest,
  createPaymentSuccess,
  createPaymentFailure,
  updatePaymentRequest,
  updatePaymentFailure,
  updatePaymentSuccess,
  getallPaymentRequest,
  getallPaymentSuccess,
  getallPaymentFailure,
  viewPaymentRequest,
  viewPaymentSuccess,
  viewPaymentFailure,
  //  SALESINVOICE ++++++++++++++++++++++
  getAllSalesinvoiceRequest,
  getAllSalesinvoiceSuccess,
  getAllSalesinvoiceFailure,
  viewSalesinvoiceRequest,
  viewSalesinvoiceSuccess,
  viewSalesinvoiceFailure,
  createSalesinvoiceRequest,
  createSalesinvoiceSuccess,
  createSalesinvoiceFailure,
  updateSalesinvoiceRequest,
  updateSalesinvoiceSuccess,
  updateSalesinvoiceFailure,
  deleteSalesinvoiceRequest,
  deleteSalesinvoiceSuccess,
  deleteSalesinvoiceFailure,
  // PURCHASE BILL +++++++++++++++
  createPurchaseBillRequest,
  createPurchaseBillSuccess,
  createPurchaseBillFailure,
  createPurchaseBillItemRequest,
  createPurchaseBillItemSuccess,
  createPurchaseBillItemFailure,
  getAllPurchasebillRequest,
  getAllPurchasebillSuccess,
  getAllPurchasebillFailure,
  viewPurchasebillRequest,
  viewPurchasebillSuccess,
  viewPurchasebillFailure,
  // EXPENSE +++++++++++++++++++++++++
  createExpenseRequest,
  createExpenseFailure,
  createExpenseSuccess,
  createExpenseItemRequest,
  createExpenseItemFailure,
  createExpenseItemSuccess,
  getAllExpenseRequest,
  getAllExpenseSuccess,
  getAllExpenseFailure,
  viewExpenseRequest,
  viewExpenseSuccess,
  viewExpenseFailure,
  updateExpenseRequest,
  updateExpenseSuccess,
  updateExpenseFailure,
  updateExpenseItemSuccess,
  updateExpenseItemRequest,
  updateExpenseItemFailure,
  deleteExpenseItemRequest,
  deleteExpenseItemSuccess,
  deleteExpenseItemFailure,
  // PURCHASE RETURN +++++++++++++++++++
  getAllPurchasereturnRequest,
  getAllPurchasereturnSuccess,
  getAllPurchasereturnFailure,
  viewPurchasereturnRequest,
  viewPurchasereturnSuccess,
  viewPurchasereturnFailure,
  // PERMISSION ++++++++++++++++++++++
  getAllPermissionsRequest,
  getAllPermissionsSuccess,
  getAllPermissionsFailure,
  updatePermissionsRequest,
  updatePermissionsSuccess,
  updatePermissionsFailure,
  // USER ++++++++++++++++++++++++
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  getallUserRequest,
  getallUserSuccess,
  getallUserFailure,
  viewUserRequest,
  viewUserSuccess,
  viewUserFailure,
  UpdateUserRequest,
  UpdateUserSuccess,
  UpdateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  // VENDOR ++++++++++++++++++++++++++
  createVendorRequest,
  createVendorSuccess,
  createVendorFailure,
  fetchAllVendorsRequest,
  fetchAllVendorsSuccess,
  fetchAllVendorsFailure,
  //  COMPANY ++++++++++++++++++++++++
  fetchAllCompanyRequest,
  fetchAllCompanySuccess,
  fetchAllCompanyFailure
} from './actions';
import { jwtDecode } from 'jwt-decode';

const createConfig = () => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      token: token,
      'ngrok-skip-browser-warning': '69420'
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIN ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const loginAdmin = (credentials, navigate) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user_login`, credentials);
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      const tokentype = decodedToken.type;
      sessionStorage.setItem('type', tokentype);
      const roletype = decodedToken.role;
      sessionStorage.setItem('role', roletype);
      const username = decodedToken.username;
      sessionStorage.setItem('username', username);
      const userData = response.data;
      sessionStorage.setItem('user', JSON.stringify(userData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/dashboard');
          // window.location.reload();
        }
      });
      dispatch(loginSuccess(userData));
      return userData;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      console.log(error);
      dispatch(loginFailure(error.message));
    }
  };
};
export const logoutAdmin = (navigate) => {
  return async (dispatch) => {
    dispatch(logoutRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user_logout`, {}, config);

      const userData = response.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/');
        }
      });
      dispatch(logoutSuccess(userData));
      return userData;
    } catch (error) {
      toast.error(error.response.data.error, { autoClose: 1000 });
      dispatch(logoutFailure(error.message));
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++  QOUTATION  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const fetchproformainvoiceList = () => {
  return async (dispatch) => {
    dispatch(fetchProformainvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_ProFormaInvoice`, config);
      const data = await response.data.data;
      dispatch(fetchProformainvoiceSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchProformainvoiceFailure(error));
      throw error;
    }
  };
};
export const createProformainvoice = (quotationData, navigate) => {
  return async (dispatch) => {
    dispatch(createProformainvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_ProFormaInvoice`, quotationData, config);
      const createdQuotation = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/proformainvoiceList');
        }
      });
      dispatch(createProformainvoiceSuccess(createdQuotation));
      return createdQuotation;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(createProformainvoiceFailure(error.message));
      throw error;
    }
  };
};
export const updateProformainvoice = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateProformainvoiceRequst());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_ProFormaInvoice/${id}`, formData, config);
      const updateQuotationData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/proformainvoiceList');
        }
      });
      dispatch(updateProformainvoicesuccess(updateQuotationData));
      return updateQuotationData;
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(updateProformainvoicefailure(error.message));
    }
  };
};
export const deleteProformainvoiceItem = (id) => {
  return async (dispatch) => {
    dispatch(deleteProformainvoiceItemRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_ProFormaInvoiceItem/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteProformainvoiceItemSuccess());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(deleteProformainvoiceItemFailure());
    }
  };
};
export const Proformainvoiceview = (id) => {
  return async (dispatch) => {
    dispatch(viewProformainvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_single_ProFormaInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewProformainvoiceSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(viewProformainvoiceFailure(error.message));
    }
  };
};
export const deleteProformainvoice = (id) => {
  return async (dispatch) => {
    dispatch(deleteProformainvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_ProFormaInvoice/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      window.location.reload();
      dispatch(deleteProformainvoiceSuccess());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(deleteProformainvoiceFailure());
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DELIVERYCHALLAN ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallDeliverychallan = () => {
  return async (dispatch) => {
    dispatch(getAllDeliverychallanRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_deliverychallan`, config);
      const getallDeliverychallan = response.data.data;
      dispatch(getAllDeliverychallanSuccess(getallDeliverychallan));
      return getallDeliverychallan;
    } catch (error) {
      dispatch(getAllDeliverychallanFailure(error.message));
    }
  };
};
export const createDeliveryChallan = (ChallanData, navigate) => {
  return async (dispatch) => {
    dispatch(createDeliveryChallanRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_deliverychallan`, ChallanData, config);
      const createdDeliverychallan = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/deliverychallanlist');
        }
      });
      console.log(response);
      dispatch(createDeliveryChallanSuccess(createdDeliverychallan));
      return createdDeliverychallan;
    } catch (error) {
      // toast.error(error.response.data.message,{
      //   autoClose: 1000
      // });
      dispatch(createDeliveryChallanFailure(error.message));
    }
  };
};
export const Deliverychallanview = (id) => {
  return async (dispatch) => {
    dispatch(viewDeliverychallanRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_deliverychallan/${id}`, config);
      const data = response.data.data;
      dispatch(viewDeliverychallanSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewDeliverychallanFailure(error.message));
    }
  };
};
export const updateDileveryChallan = (id, ChallanData, navigate) => {
  return async (dispatch) => {
    dispatch(updateDileverychallanRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_deliverychallan/${id}`, ChallanData, config);
      const updateChallanData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/deliverychallanlist');
        }
      });
      dispatch(updateDileverychallanSuccess(updateChallanData));
      return updateChallanData;
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(updateDileverychallanFailure(error.message));
    }
  };
};
export const updateDileveryChallanItem = (id, payload) => {
  return async (dispatch) => {
    dispatch(updateDileverychallanItemRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_deliverychallanitem/${id}`, payload, config);
      const updateChallanItem = response;
      dispatch(updateDileverychallanItemSuccess(updateChallanItem));
      return updateChallanItem;
    } catch (error) {
      dispatch(updateDileverychallanItemFailure(error.message));
      throw error;
    }
  };
};
export const deleteDileveryChallan = (id) => {
  return async (dispatch) => {
    dispatch(deleteDileverychallanItemRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_deliverychallanitem/${id}`, config);
      const deleteChallanItem = response;
      dispatch(deleteDileverychallanItemSuccess(deleteChallanItem));
      return deleteChallanItem;
    } catch (error) {
      dispatch(deleteDileverychallanItemFailure(error.message));
      throw error;
    }
  };
};
export const createDeliveryChallanItem = (payload) => {
  return async (dispatch) => {
    dispatch(createDeliveryChallanItemRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_deliverychallanitem`, payload, config);
      const createdDeliverychallanitems = response;
      dispatch(createDeliveryChallanItemSuccess(createdDeliverychallanitems));
      return createdDeliverychallanitems;
    } catch (error) {
      dispatch(createDeliveryChallanItemFailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CUSTOMER ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const fetchAllCustomers = () => {
  return async (dispatch) => {
    dispatch(fetchAllCustomersRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_customer`, config);
      const data = response.data.data;
      dispatch(fetchAllCustomersSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCustomersFailure(error.message));
    }
  };
};
export const createCustomer = (customerData) => {
  return async (dispatch) => {
    dispatch(createCustomerRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_customer`, customerData, config);
      const createdCustomer = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(createCustomerSuccess(createdCustomer));
      window.location.reload();
      return createdCustomer;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(createCustomerFailure(error.message));
      throw error;
    }
  };
};
export const createCustomfeild = (payload) => {
  return async (dispatch) => {
    dispatch(createCustomFeildRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_customfeild`, payload, config);
      const createdCustomfeilddata = response;
      dispatch(createCustomFeildSuccess(createdCustomfeilddata));
      return createdCustomfeilddata;
    } catch (error) {
      dispatch(createCustomFeildFailure(error.message));
      throw error;
    }
  };
};
export const deleteCustomFeild = (id) => {
  return async (dispatch) => {
    dispatch(deleteProformainvoiceItemRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_customfeild/${id}`, config);
      console.log('response', response);
      dispatch(deleteProformainvoiceItemSuccess());
    } catch (error) {
      console.error('Error deleting quotation:', error);
      dispatch(deleteProformainvoiceItemFailure());
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PRODUCT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const fetchAllProducts = () => {
  return async (dispatch) => {
    dispatch(fetchAllProdutsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_product`, config);
      const data = response.data.data;
      dispatch(fetchAllProdutsSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllProdutrsFailure(error.message));
    }
  };
};
export const createProduct = (data) => {
  return async (dispatch) => {
    dispatch(createProductRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_product`, data, config);
      const createProductData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(createProductSuccess(createProductData));
      window.location.reload();
      return createProductData;
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(createProductFailure(error.message));
      throw error;
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPayment = (formData) => {
  return async (dispatch) => {
    dispatch(createPaymentRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_payment`, formData, config);
      const createdpayment = response;
      dispatch(createPaymentSuccess(createdpayment));
      return createdpayment;
    } catch (error) {
      dispatch(createPaymentFailure(error.message));
      throw error;
    }
  };
};
export const getallPayment = () => {
  return async (dispatch) => {
    dispatch(getallPaymentRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_payment`, config);
      const getallpayment = response.data;
      dispatch(getallPaymentSuccess(getallpayment));
      return getallpayment;
    } catch (error) {
      dispatch(getallPaymentFailure(error.message));
      throw error;
    }
  };
};
export const paymentview = (id) => {
  return async (dispatch) => {
    dispatch(viewPaymentRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_payment/${id}`, config);
      const data = response.data.data;
      dispatch(viewPaymentSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPaymentFailure(error.message));
    }
  };
};
export const updatePayment = (id, formData) => {
  return async (dispatch) => {
    dispatch(updatePaymentRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_payment/${id}`, formData, config);
      const upadtePaymentData = response;
      dispatch(updatePaymentSuccess(upadtePaymentData));
      return upadtePaymentData;
    } catch (error) {
      dispatch(updatePaymentFailure(error.message));
      throw error;
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALESINVOICE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createSalesInvoice = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_salesinvoice`, payload, config);
      const cretesalesinvoice = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/salesinvoicelist');
        }
      });
      dispatch(createSalesinvoiceSuccess(cretesalesinvoice));
      return cretesalesinvoice;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(createSalesinvoiceFailure(error.message));
      throw error;
    }
  };
};
export const getallSalesInvoice = () => {
  return async (dispatch) => {
    dispatch(getAllSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_salesInvoice`, config);
      const getallSalesinvoice = response.data;
      dispatch(getAllSalesinvoiceSuccess(getallSalesinvoice));
      return getallSalesinvoice;
    } catch (error) {
      dispatch(getAllSalesinvoiceFailure(error.message));
    }
  };
};
export const SalesInvoiceview = (id) => {
  return async (dispatch) => {
    dispatch(viewSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_salesInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewSalesinvoiceSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewSalesinvoiceFailure(error.message));
    }
  };
};
export const updateSalesinvoice = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_salesInvoice/${id}`, payload, config);
      const updateSalesinvoiceData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/salesinvoicelist');
        }
      });
      dispatch(updateSalesinvoiceSuccess(updateSalesinvoiceData));
      return updateSalesinvoiceData;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(updateSalesinvoiceFailure(error.message));
      throw error;
    }
  };
};
export const deleteSalesinvoice = (id) => {
  return async (dispatch) => {
    dispatch(deleteSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_salesInvoice/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      window.location.reload();
      dispatch(deleteSalesinvoiceSuccess());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(deleteSalesinvoiceFailure());
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPurchase = (purchaseData) => {
  return async (dispatch) => {
    dispatch(createPurchaseRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_purchase`, purchaseData, config);
      const cretepurchase = response;
      dispatch(createPrchaseSuccess(cretepurchase));
      return cretepurchase;
    } catch (error) {
      dispatch(createPurchaseFailure(error.message));
      throw error;
    }
  };
};
export const createPurchaseItem = (payload) => {
  return async (dispatch) => {
    dispatch(createPurchaseItemRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_purchaseitem`, payload, config);
      const createdPurchaseitems = response;
      dispatch(createPrchaseItemSuccess(createdPurchaseitems));
      return createdPurchaseitems;
    } catch (error) {
      dispatch(createPurchaseItemFailure(error.message));
      throw error;
    }
  };
};
export const updatePurchase = (id, formData) => {
  return async (dispatch) => {
    dispatch(updatePurchaseRequst());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_purchase/${id}`, formData, config);
      const updatePurchaseData = response;
      dispatch(updatePurchasesuccess(updatePurchaseData));
      return updatePurchaseData;
    } catch (error) {
      dispatch(updatePurchasefailure(error.message));
      throw error;
    }
  };
};
export const updatePurchaseItem = (itemid, updateItemData) => {
  return async (dispatch) => {
    dispatch(updatePurchaseItemRequst());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_purchaseitem/${itemid}`, updateItemData, config);
      const updatePurchaseItemData = response;
      dispatch(updatePurchaseItemsuccess(updatePurchaseItemData));
      return updatePurchaseItemData;
    } catch (error) {
      dispatch(updatePurchaseItemfailure(error.message));
      throw error;
    }
  };
};
export const deletePurchaseItem = (id) => {
  return async (dispatch) => {
    dispatch(deletePurchaseItemRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_purchaseitem/${id}`, config);
      const deletePurchaseItemData = response;
      dispatch(deletePurchaseItemSuccess(deletePurchaseItemData));
      return deletePurchaseItemData;
    } catch (error) {
      dispatch(deletePurchaseItemFailure(error.message));
      throw error;
    }
  };
};
export const getallPurchase = () => {
  return async (dispatch) => {
    dispatch(fetchAllPurchaseRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_purchase`, config);
      const getallpayment = response.data;
      dispatch(fetchAllPurchaseSuccess(getallpayment));
      return getallpayment;
    } catch (error) {
      dispatch(fetchAllPurchaseFailure(error.message));
    }
  };
};
export const purchaseview = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchaseRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_purchase/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchaseSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchaseFailure(error.message));
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE BILL ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPurchaseBill = (purchasebillData) => {
  return async (dispatch) => {
    dispatch(createPurchaseBillRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_purchasebill`, purchasebillData, config);
      const cretepurchasebill = response;
      dispatch(createPurchaseBillSuccess(cretepurchasebill));
      return cretepurchasebill;
    } catch (error) {
      dispatch(createPurchaseBillFailure(error.message));
      throw error;
    }
  };
};
export const createPurchaseBillItem = (payload) => {
  return async (dispatch) => {
    dispatch(createPurchaseBillItemRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_purchasebill_item`, payload, config);
      const createdPurchaseBillitems = response;
      dispatch(createPurchaseBillItemSuccess(createdPurchaseBillitems));
      return createdPurchaseBillitems;
    } catch (error) {
      dispatch(createPurchaseBillItemFailure(error.message));
      throw error;
    }
  };
};
export const getallPurchaseBill = () => {
  return async (dispatch) => {
    dispatch(getAllPurchasebillRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_purchasebill`, config);
      const getallPurchasebill = response.data;
      dispatch(getAllPurchasebillSuccess(getallPurchasebill));
      return getallPurchasebill;
    } catch (error) {
      dispatch(getAllPurchasebillFailure(error.message));
    }
  };
};
export const PurchaseBillview = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchasebillRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_purchasebill/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchasebillSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchasebillFailure(error.message));
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ EXPENSE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createExpenseItem = (payload) => {
  return async (dispatch) => {
    dispatch(createExpenseItemRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_expenseItem`, payload, config);
      const expenceItem = response;
      dispatch(createExpenseItemSuccess(expenceItem));
      return expenceItem;
    } catch (error) {
      dispatch(createExpenseItemFailure(error.message));
      throw error;
    }
  };
};
export const getallExpense = () => {
  return async (dispatch) => {
    dispatch(getAllExpenseRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_expense`, config);
      const getallExpense = response.data;
      dispatch(getAllExpenseSuccess(getallExpense));
      return getallExpense;
    } catch (error) {
      dispatch(getAllExpenseFailure(error.message));
    }
  };
};
export const Expenseview = (id) => {
  return async (dispatch) => {
    dispatch(viewExpenseRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_expense/${id}`, config);
      const data = response.data.data;
      dispatch(viewExpenseSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewExpenseFailure(error.message));
    }
  };
};
export const updateExpense = (id, formData) => {
  return async (dispatch) => {
    dispatch(updateExpenseRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_expense/${id}`, formData, config);
      const updateExpenseData = response;
      dispatch(updateExpenseSuccess(updateExpenseData));
      return updateExpenseData;
    } catch (error) {
      dispatch(updateExpenseFailure(error.message));
      throw error;
    }
  };
};
export const updateExpenseItem = (id, updateData) => {
  return async (dispatch) => {
    dispatch(updateExpenseItemRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_expenseItem/${id}`, updateData, config);
      const updateExpenseItemData = response;
      dispatch(updateExpenseItemSuccess(updateExpenseItemData));
      return updateExpenseItemData;
    } catch (error) {
      dispatch(updateExpenseItemFailure(error.message));
      throw error;
    }
  };
};
export const deleteExpense = (id) => {
  return async (dispatch) => {
    dispatch(deleteExpenseItemRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_expenseItem/${id}`, config);
      const deleteExpenseItem = response;
      dispatch(deleteExpenseItemSuccess(deleteExpenseItem));
      return deleteExpenseItem;
    } catch (error) {
      dispatch(deleteExpenseItemFailure(error.message));
      throw error;
    }
  };
};
export const createExpense = (data) => {
  return async (dispatch) => {
    dispatch(createExpenseRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_expense`, data, config);
      const expenceData = response;
      dispatch(createExpenseSuccess(expenceData));
      return expenceData;
    } catch (error) {
      dispatch(createExpenseFailure(error.message));
      throw error;
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE RETURN +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallPurchaseReturn = () => {
  return async (dispatch) => {
    dispatch(getAllPurchasereturnRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_purchaseReturn`, config);
      const getallPurchasereturn = response.data.data;
      dispatch(getAllPurchasereturnSuccess(getallPurchasereturn));
      return getallPurchasereturn;
    } catch (error) {
      dispatch(getAllPurchasereturnFailure(error.message));
    }
  };
};
export const PurchaseReturnview = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchasereturnRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_purchaseReturn/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchasereturnSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchasereturnFailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PERMISSION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallPermissions = () => {
  return async (dispatch) => {
    dispatch(getAllPermissionsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_permissions`, config);
      // console.log(token);
      const getallPermission = response.data.data;
      dispatch(getAllPermissionsSuccess(getallPermission));
      return getallPermission;
    } catch (error) {
      dispatch(getAllPermissionsFailure(error.message));
    }
  };
};
export const updatePermission = (data) => {
  return async (dispatch) => {
    dispatch(updatePermissionsRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_permissions`, data, config);
      const updatePermissionData = response.data.data;
      dispatch(updatePermissionsSuccess(updatePermissionData));
      return updatePermissionData;
    } catch (error) {
      dispatch(updatePermissionsFailure(error.message));
      throw error;
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ User +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createuser = (data, navigate) => {
  return async (dispatch) => {
    dispatch(createUserRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_user`, data, config);
      const userData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/userlist');
        }
      });
      dispatch(createUserSuccess(userData));
      return userData;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(createUserFailure(error.message));
      throw error;
    }
  };
};
export const getallusers = () => {
  return async (dispatch) => {
    dispatch(getallUserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_user`, config);
      const getallUsers = response.data.data;
      dispatch(getallUserSuccess(getallUsers));
      return getallUsers;
    } catch (error) {
      dispatch(getallUserFailure(error.message));
    }
  };
};
export const Userview = (id) => {
  return async (dispatch) => {
    dispatch(viewUserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_user/${id}`, config);
      const data = response.data.data;
      dispatch(viewUserSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(viewUserFailure(error.message));
    }
  };
};
export const updateUser = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateUserRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_user/${id}`, formData, config);
      const updateUserData = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/userlist');
        }
      });
      dispatch(UpdateUserSuccess(updateUserData));
      return updateUserData;
    } catch (error) {
      dispatch(UpdateUserFailure(error.message));
      throw error;
    }
  };
};
export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch(deleteUserRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_user/${id}`, config);
      const deleteUser = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteUserSuccess(deleteUser));
      window.location.reload();
      return deleteUser;
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      throw error;
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ VENDOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createVendor = (vendorData) => {
  return async (dispatch) => {
    dispatch(createVendorRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_vendor`, vendorData, config);
      const createdVendor = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(createVendorSuccess(createdVendor));
      window.location.reload();
      return createdVendor;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(createVendorFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllVendors = () => {
  return async (dispatch) => {
    dispatch(fetchAllVendorsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_vandor`, config);
      const data = response.data.data;
      dispatch(fetchAllVendorsSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllVendorsFailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const fetchAllCompany = () => {
  return async (dispatch) => {
    dispatch(fetchAllCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_company`, config);
      const data = response.data.data;
      dispatch(fetchAllCompanySuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCompanyFailure(error.message));
    }
  };
};
