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
  fetchAllCustomersCashRequest,
  fetchAllCustomersCashSuccess,
  fetchAllCustomersCashFailure,
  fetchAllCustomersRequest,
  fetchAllCustomersSuccess,
  fetchAllCustomersFailure,
  createCustomerRequest,
  createCustomerSuccess,
  createCustomerFailure,
  // PRODUCT ++++++++++++++++++++++++++++++++++
  fetchAllProdutscashRequest,
  fetchAllProdutscashSuccess,
  fetchAllProdutrscashFailure,
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
  getAllDeliverychallanRequest,
  getAllDeliverychallanSuccess,
  getAllDeliverychallanFailure,
  viewDeliverychallanRequest,
  viewDeliverychallanSuccess,
  viewDeliverychallanFailure,
  updateDileverychallanRequest,
  updateDileverychallanFailure,
  updateDileverychallanSuccess,
  deleteDileverychallanItemRequest,
  deleteDileverychallanItemFailure,
  deleteDileverychallanItemSuccess,
  //  PAYMENT CASH +++++++++++++++++++++++++++
  createPaymentCashRequest,
  createPaymentCashSuccess,
  createPaymentCashFailure,
  updatePaymentCashRequest,
  updatePaymentCashFailure,
  updatePaymentCashSuccess,
  getallPaymentCashRequest,
  getallPaymentCashSuccess,
  getallPaymentCashFailure,
  viewPaymentCashRequest,
  viewPaymentCashSuccess,
  viewPaymentCashFailure,
  deletePaymentCashRequest,
  deletePaymentCashSuccess,
  deletePaymentCashFailure,
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
  //  SALESINVOICE ++++++++++++++++++++++
  createSalesinvoicecashRequest,
  createSalesinvoicecashSuccess,
  createSalesinvoicecashFailure,
  deleteSalesinvoicecashRequest,
  deleteSalesinvoicecashSuccess,
  deleteSalesinvoicecashFailure,
  updateSalesinvoicecashRequest,
  updateSalesinvoicecashSuccess,
  updateSalesinvoicecashFailure,
  getAllSalesinvoicecashRequest,
  getAllSalesinvoicecashSuccess,
  getAllSalesinvoicecashFailure,
  viewSalesinvoicecashRequest,
  viewSalesinvoicecashSuccess,
  viewSalesinvoicecashFailure,
  // PURCHASE INVOICE +++++++++++++++
  createPurchaseinvoiceRequest,
  createPurchaseinvoiceSuccess,
  createPurchaseinvoiceFailure,
  updatePurchaseinvoiceRequest,
  updatePurchaseinvoiceSuccess,
  updatePurchaseinvoiceFailure,
  getAllPurchaseinvoiceRequest,
  getAllPurchaseinvoiceSuccess,
  getAllPurchaseinvoiceFailure,
  viewPurchaseinvoiceRequest,
  viewPurchaseinvoiceSuccess,
  viewPurchaseinvoiceFailure,
  deletePurchaseinvoiceRequest,
  deletePurchaseinvoiceSuccess,
  deletePurchaseinvoiceFailure,
  // PURCHASE INVOICE CASH +++++++++++
  createPurchaseinvoiceCashRequest,
  createPurchaseinvoiceCashSuccess,
  createPurchaseinvoiceCashFailure,
  getAllPurchaseinvoiceCashRequest,
  getAllPurchaseinvoiceCashSuccess,
  getAllPurchaseinvoiceCashFailure,
  viewPurchaseinvoiceCashRequest,
  viewPurchaseinvoiceCashSuccess,
  viewPurchaseinvoiceCashFailure,
  updatePurchaseinvoiceCashRequest,
  updatePurchaseinvoiceCashSuccess,
  updatePurchaseinvoiceCashFailure,
  deletePurchaseinvoiceCashRequest,
  deletePurchaseinvoiceCashSuccess,
  deletePurchaseinvoiceCashFailure,
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
  fetchAllVendorsCashRequest,
  fetchAllVendorsCashSuccess,
  fetchAllVendorsCashFailure,
  fetchAllVendorsRequest,
  fetchAllVendorsSuccess,
  fetchAllVendorsFailure,
  //  COMPANY ++++++++++++++++++++++++
  fetchAllCompanyRequest,
  fetchAllCompanySuccess,
  fetchAllCompanyFailure,
  // DEBIT NOTE+++++++++++++++++++++
  createDebitnoteRequest,
  createDebitnoteSuccess,
  createDebitnoteFailure,
  getAllDebitnoteRequest,
  getAllDebitnoteSuccess,
  getAllDebitnoteFailure,
  viewDebitnoteRequest,
  viewDebitnoteSuccess,
  viewDebitnoteFailure,
  updateDebitnoteRequest,
  updateDebitnoteSuccess,
  updateDebitnoteFailure,
  deleteDebitnoteRequest,
  deleteDebitnoteSuccess,
  deleteDebitnoteFailure,
  // Credit NOTE+++++++++++++++++++++
  createCreditnoteRequest,
  createCreditnoteSuccess,
  createCreditnoteFailure,
  getAllCreditnoteRequest,
  getAllCreditnoteSuccess,
  getAllCreditnoteFailure,
  viewCreditnoteRequest,
  viewCreditnoteSuccess,
  viewCreditnoteFailure,
  updateCreditnoteRequest,
  updateCreditnoteSuccess,
  updateCreditnoteFailure,
  deleteCreditnoteRequest,
  deleteCreditnoteSuccess,
  deleteCreditnoteFailure,
  // ECIEVE CASH +++++++++++++
  createRecieveCashRequest,
  createRecieveCashSuccess,
  createRecieveCashFailure,
  getAllRecieveCashRequest,
  getAllRecieveCashSuccess,
  getAllRecieveCashFailure,
  viewRecieveCashRequest,
  viewRecieveCashSuccess,
  viewRecieveCashFailure,
  updateRecieveCashRequest,
  updateRecieveCashSuccess,
  updateRecieveCashFailure,
  deleteRecieveCashRequest,
  deleteRecieveCashSuccess,
  deleteRecieveCashFailure,
  // VENDOR LEDGER +++++++++++
  getAllvendorLedgerRequest,
  getAllvendorLedgerSuccess,
  getAllvendorLedgerFailure,
  // CUSTOMER LEDGER +++++++++++
  getAllcustomerLedgerRequest,
  getAllcustomerLedgerSuccess,
  getAllcustomerLedgerFailure,
  // USER CLAIM +++++++++++
  getAllclaimuserRequest,
  getAllclaimuserSuccess,
  getAllclaimuserFailure,
  createClaimCashRequest,
  createClaimCashSuccess,
  createClaimCashFailure,
  viewClaimCashRequest,
  viewClaimCashSuccess,
  viewClaimCashFailure,
  updateClaimCashRequest,
  updateClaimCashSuccess,
  updateClaimCashFailure,
  deleteClaimCashRequest,
  deleteClaimCashSuccess,
  deleteClaimCashFailure,
  viewsingleClaimCashRequest,
  viewsingleClaimCashSuccess,
  viewsingleClaimCashFailure,
  viewRecieveClaimCashRequest,
  viewRecieveClaimCashSuccess,
  viewRecieveClaimCashFailure,
  // CLAIMCASH LEDGER ++++++++++
  fetchAllclaimcashledgerRequest,
  fetchAllclaimcashledgerSuccess,
  fetchAllclaimcashledgerFailure
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
      const userId = decodedToken.userId;
      sessionStorage.setItem('userId', userId);
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
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
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
export const deleteDileveryChallan = (id) => {
  return async (dispatch) => {
    dispatch(deleteDileverychallanItemRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_deliverychallan/${id}`, config);
      const deleteChallanItem = response;
      dispatch(deleteDileverychallanItemSuccess(deleteChallanItem));
      window.location.reload();
      return deleteChallanItem;
    } catch (error) {
      dispatch(deleteDileverychallanItemFailure(error.message));
      throw error;
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CUSTOMER ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const fetchAllCustomersCash = () => {
  return async (dispatch) => {
    dispatch(fetchAllCustomersCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_get_all_customer`, config);
      const data = response.data.data;
      dispatch(fetchAllCustomersCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCustomersCashFailure(error.message));
    }
  };
};
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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PRODUCT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const fetchAllProductsCash = () => {
  return async (dispatch) => {
    dispatch(fetchAllProdutscashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_get_all_product`, config);
      const data = response.data.data;
      dispatch(fetchAllProdutscashSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllProdutrscashFailure(error.message));
    }
  };
};
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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT CASH++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPaymentCash = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(createPaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/C_create_paymentCash`, formData, config);
      const createdpayment = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentcashlist');
        }
      });
      dispatch(createPaymentCashSuccess(createdpayment));
      return createdpayment;
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(createPaymentCashFailure(error.message));
      throw error;
    }
  };
};
export const getallPaymentCash = () => {
  return async (dispatch) => {
    dispatch(getallPaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_get_all_paymentCash`, config);
      const getallpaymentCash = response.data;
      dispatch(getallPaymentCashSuccess(getallpaymentCash));
      return getallpaymentCash;
    } catch (error) {
      dispatch(getallPaymentCashFailure(error.message));
      throw error;
    }
  };
};
export const paymentCashview = (id) => {
  return async (dispatch) => {
    dispatch(viewPaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_view_paymentCash/${id}`, config);
      const data = response.data.data;
      dispatch(viewPaymentCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPaymentCashFailure(error.message));
    }
  };
};
export const updatePaymentCash = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updatePaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/C_update_paymentCash/${id}`, formData, config);
      const upadtePaymentCashData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentcashlist');
        }
      });
      dispatch(updatePaymentCashSuccess(upadtePaymentCashData));
      return upadtePaymentCashData;
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(updatePaymentCashFailure(error.message));
    }
  };
};
export const paymentCashDelete = (id) => {
  return async (dispatch) => {
    dispatch(deletePaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/C_delete_paymentCash/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      window.location.reload();
      dispatch(deletePaymentCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(deletePaymentCashFailure(error.message));
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALESINVOICE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createSalesInvoiceCash = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/C_create_salesinvoice`, payload, config);
      const cretesalesinvoicecash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/salescashlist');
        }
      });
      dispatch(createSalesinvoicecashSuccess(cretesalesinvoicecash));
      return cretesalesinvoicecash;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(createSalesinvoicecashFailure(error.message));
      throw error;
    }
  };
};
export const getallSalesInvoiceCash = () => {
  return async (dispatch) => {
    dispatch(getAllSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_get_all_salesInvoice`, config);
      const getallSalesinvoiceCash = response.data;
      dispatch(getAllSalesinvoicecashSuccess(getallSalesinvoiceCash));
      return getallSalesinvoiceCash;
    } catch (error) {
      dispatch(getAllSalesinvoicecashFailure(error.message));
    }
  };
};
export const SalesInvoiceCashview = (id) => {
  return async (dispatch) => {
    dispatch(viewSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_view_salesInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewSalesinvoicecashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewSalesinvoicecashFailure(error.message));
    }
  };
};
export const updateSalesinvoiceCash = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/C_update_salesinvoice/${id}`, payload, config);
      const updateSalesinvoiceCashData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/salescashlist');
        }
      });
      dispatch(updateSalesinvoicecashSuccess(updateSalesinvoiceCashData));
      return updateSalesinvoiceCashData;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(updateSalesinvoicecashFailure(error.message));
      throw error;
    }
  };
};
export const deleteSalesinvoicecash = (id) => {
  return async (dispatch) => {
    dispatch(deleteSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/C_delete_salesInvoice/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      window.location.reload();
      dispatch(deleteSalesinvoicecashSuccess());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(deleteSalesinvoicecashFailure());
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEBIT NOTE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createDebitnote = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_debitNote`, payload, config);
      const createDebitnote = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/debitnotelist');
        }
      });
      dispatch(createDebitnoteSuccess(createDebitnote));
      return createDebitnote;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(createDebitnoteFailure(error.message));
    }
  };
};
export const getallDebitnote = () => {
  return async (dispatch) => {
    dispatch(getAllDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_debitNote`, config);
      const getallDebitnote = response.data.data;
      dispatch(getAllDebitnoteSuccess(getallDebitnote));
      return getallDebitnote;
    } catch (error) {
      dispatch(getAllDebitnoteFailure(error.message));
    }
  };
};
export const Debitnoteviewdata = (id) => {
  return async (dispatch) => {
    dispatch(viewDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_single_debitNote/${id}`, config);
      const data = response.data.data;
      dispatch(viewDebitnoteSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewDebitnoteFailure(error.message));
    }
  };
};
export const updateDebitnote = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_debitNote/${id}`, payload, config);
      const updateDebitnoteData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/debitnotelist');
        }
      });
      dispatch(updateDebitnoteSuccess(updateDebitnoteData));
      return updateDebitnoteData;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(updateDebitnoteFailure(error.message));
    }
  };
};
export const deleteDebitnote = (id) => {
  return async (dispatch) => {
    dispatch(deleteDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_debitNote/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      window.location.reload();
      dispatch(deleteDebitnoteSuccess());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(deleteDebitnoteFailure());
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CREDIT NOTE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createCreditnote = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_creditNote`, payload, config);
      const createCreditnote = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/creditnotelist');
        }
      });
      dispatch(createCreditnoteSuccess(createCreditnote));
      return createCreditnote;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(createCreditnoteFailure(error.message));
    }
  };
};
export const getallCreditnote = () => {
  return async (dispatch) => {
    dispatch(getAllCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_creditNote`, config);
      const getallCreditnote = response.data.data;
      dispatch(getAllCreditnoteSuccess(getallCreditnote));
      return getallCreditnote;
    } catch (error) {
      dispatch(getAllCreditnoteFailure(error.message));
    }
  };
};
export const Creditnoteviewdata = (id) => {
  return async (dispatch) => {
    dispatch(viewCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_single_creditNote/${id}`, config);
      const data = response.data.data;
      dispatch(viewCreditnoteSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewCreditnoteFailure(error.message));
    }
  };
};
export const updateCreditnote = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_creditNote/${id}`, payload, config);
      const updateCreditnoteData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/creditnotelist');
        }
      });
      dispatch(updateCreditnoteSuccess(updateCreditnoteData));
      return updateCreditnoteData;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(updateCreditnoteFailure(error.message));
    }
  };
};
export const deleteCreditnote = (id) => {
  return async (dispatch) => {
    dispatch(deleteCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_creditNote/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      window.location.reload();
      dispatch(deleteCreditnoteSuccess());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(deleteCreditnoteFailure());
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
export const createPurchaseinvoice = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createPurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_purchaseInvoice`, payload, config);
      const cretepurchasebill = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 900,
        onClose: () => {
          navigate('/purchaseinvoiceList');
        }
      });
      dispatch(createPurchaseinvoiceSuccess(cretepurchasebill));
      return cretepurchasebill;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(createPurchaseinvoiceFailure(error.message));
    }
  };
};
export const getallPurchaseinvoice = () => {
  return async (dispatch) => {
    dispatch(getAllPurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_purchaseInvoice`, config);
      const getallPurchasebill = response.data;
      dispatch(getAllPurchaseinvoiceSuccess(getallPurchasebill));
      return getallPurchasebill;
    } catch (error) {
      dispatch(getAllPurchaseinvoiceFailure(error.message));
    }
  };
};
export const viewPurchaseinvoice = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_purchaseInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchaseinvoiceSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchaseinvoiceFailure(error.message));
    }
  };
};
export const updatePurchaseinvoice = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updatePurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_purchaseInvoice/${id}`, payload, config);
      const updatePurchasebillData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 900,
        onClose: () => {
          navigate('/purchaseinvoiceList');
        }
      });
      dispatch(updatePurchaseinvoiceSuccess(updatePurchasebillData));
      return updatePurchasebillData;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(updatePurchaseinvoiceFailure(error.message));
    }
  };
};
export const deletePurchaseinvoice = (id) => {
  return async (dispatch) => {
    dispatch(deletePurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_purchaseInvoice/${id}`, config);
      const deletePurchasebillData = response;
      dispatch(deletePurchaseinvoiceSuccess(deletePurchasebillData));
      window.location.reload();
      return deletePurchasebillData;
    } catch (error) {
      dispatch(deletePurchaseinvoiceFailure(error.message));
      throw error;
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE INVOICE CASH++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPurchaseInvoiceCash = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createPurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/C_create_purchaseCash
      `,
        payload,
        config
      );
      const cretepurchasebillcash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 900,
        onClose: () => {
          navigate('/purchaseinvoicecashList');
        }
      });
      dispatch(createPurchaseinvoiceCashSuccess(cretepurchasebillcash));
      return cretepurchasebillcash;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(createPurchaseinvoiceCashFailure(error.message));
    }
  };
};
export const getallPurchaseInvoiceCash = () => {
  return async (dispatch) => {
    dispatch(getAllPurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_get_all_purchaseCash`, config);
      const getallPurchasebillcash = response.data;
      dispatch(getAllPurchaseinvoiceCashSuccess(getallPurchasebillcash));
      return getallPurchasebillcash;
    } catch (error) {
      dispatch(getAllPurchaseinvoiceCashFailure(error.message));
    }
  };
};
export const PurchaseInvoiceviewCash = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_view_purchaseCash/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchaseinvoiceCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchaseinvoiceCashFailure(error.message));
    }
  };
};
export const updatePurchaseInvoiceCash = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updatePurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/C_update_purchaseCash/${id}`, payload, config);
      const updatePurchasebillData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 900,
        onClose: () => {
          navigate('/purchaseinvoicecashList');
        }
      });
      dispatch(updatePurchaseinvoiceCashSuccess(updatePurchasebillData));
      return updatePurchasebillData;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(updatePurchaseinvoiceCashFailure(error.message));
    }
  };
};
export const deletePurchaseInvoiceCash = (id) => {
  return async (dispatch) => {
    dispatch(deletePurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/C_delete_purchaseCash/${id}`, config);
      const deletePurchasebillData = response;
      dispatch(deletePurchaseinvoiceCashSuccess(deletePurchasebillData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      window.location.reload();
      return deletePurchasebillData;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(deletePurchaseinvoiceCashFailure(error.message));
      throw error;
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
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
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
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
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
export const fetchAllVendorsCash = () => {
  return async (dispatch) => {
    dispatch(fetchAllVendorsCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_get_all_vandor`, config);
      const data = response.data.data;
      dispatch(fetchAllVendorsCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllVendorsCashFailure(error.message));
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
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT RECIEVE CASH +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createRecievecash = (data, navigate) => {
  return async (dispatch) => {
    dispatch(createRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/C_create_receiveCash`, data, config);
      const Recievedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentrecieveList');
        }
      });
      dispatch(createRecieveCashSuccess(Recievedata));
      return Recievedata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(createRecieveCashFailure(error.message));
      throw error;
    }
  };
};
export const getallRecieveCash = () => {
  return async (dispatch) => {
    dispatch(getAllRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_get_all_receiveCash`, config);
      const getallRecievecash = response.data.data;
      dispatch(getAllRecieveCashSuccess(getallRecievecash));
      return getallRecievecash;
    } catch (error) {
      dispatch(getAllRecieveCashFailure(error.message));
    }
  };
};
export const viewRecieveCash = (id) => {
  return async (dispatch) => {
    dispatch(viewRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/C_view_receiveCash/${id}`, config);
      const data = response.data.data;
      dispatch(viewRecieveCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewRecieveCashFailure(error.message));
    }
  };
};
export const updateRecieveCash = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/C_update_receiveCash/${id}`, formData, config);
      const updatRecievecashdata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentrecieveList');
        }
      });
      dispatch(updateRecieveCashSuccess(updatRecievecashdata));
      return updatRecievecashdata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(updateRecieveCashFailure(error.message));
      throw error;
    }
  };
};
export const deleteRecieveCash = (id) => {
  return async (dispatch) => {
    dispatch(deleteRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/C_delete_receiveCash/${id}`, config);
      const deleteRecievecash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteRecieveCashSuccess(deleteRecievecash));
      window.location.reload();
      return deleteRecievecash;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(deleteRecieveCashFailure(error.message));
      throw error;
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ VENDOR LEDGER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallVendorledger = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllvendorLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/C_get_vendorLedger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallvendorledgerlist = response.data;
      dispatch(getAllvendorLedgerSuccess(getallvendorledgerlist));
      return getallvendorledgerlist;
    } catch (error) {
      dispatch(getAllvendorLedgerFailure(error.message));
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ VENDOR LEDGER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallCustomerledger = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllcustomerLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/C_get_customerLedger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallcustomerledgerlist = response.data;
      dispatch(getAllcustomerLedgerSuccess(getallcustomerledgerlist));
      return getallcustomerledgerlist;
    } catch (error) {
      dispatch(getAllcustomerLedgerFailure(error.message));
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ CALAIM+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallclaimuser = () => {
  return async (dispatch) => {
    dispatch(getAllclaimuserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_ClaimUser`, config);
      const getallclaimuserlist = response.data.data;
      dispatch(getAllclaimuserSuccess(getallclaimuserlist));
      return getallclaimuserlist;
    } catch (error) {
      dispatch(getAllclaimuserFailure(error.message));
    }
  };
};
export const createClaimcash = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(createClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_claim`, formData, config);
      const Cliamdata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/claimcashlist');
        }
      });
      dispatch(createClaimCashSuccess(Cliamdata));
      return Cliamdata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(createClaimCashFailure(error.message));
      throw error;
    }
  };
};
export const viewClaimCash = () => {
  return async (dispatch) => {
    dispatch(viewClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_myclaim`, config);
      const data = response.data.data;
      dispatch(viewClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewClaimCashFailure(error.message));
    }
  };
};
export const viewSingleclaimCash = (id) => {
  return async (dispatch) => {
    dispatch(viewsingleClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_single_claim/${id}`, config);
      const data = response.data.data;
      dispatch(viewsingleClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewsingleClaimCashFailure(error.message));
    }
  };
};
export const updateClaimCash = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_claim/${id}`, formData, config);
      const updatClaimcashdata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/claimcashlist');
        }
      });
      dispatch(updateClaimCashSuccess(updatClaimcashdata));
      return updatClaimcashdata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(updateClaimCashFailure(error.message));
      throw error;
    }
  };
};
export const deleteClaimCash = (id) => {
  return async (dispatch) => {
    dispatch(deleteClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_claim/${id}`, config);
      const deleteClaimcash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteClaimCashSuccess(deleteClaimcash));
      window.location.reload();
      return deleteClaimcash;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(deleteClaimCashFailure(error.message));
      throw error;
    }
  };
};
export const viewRecieveClaimCash = () => {
  return async (dispatch) => {
    dispatch(viewRecieveClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_reciveclaim`, config);
      const data = response.data.data;
      dispatch(viewRecieveClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewRecieveClaimCashFailure(error.message));
    }
  };
};
export const IsStatusclaimCash = (id, toUserId, isApproved) => {
  return async (dispatch) => {
    dispatch(viewsingleClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/isapproved_claim/${id}`, { toUserId, isApproved }, config);
      const data = response.data.data;
      dispatch(viewsingleClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewsingleClaimCashFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllClaimcashLedger = (formDate, toDate) => {
  return async (dispatch) => {
    dispatch(fetchAllclaimcashledgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_claim_ledger?fromDate=${formDate}&toDate=${toDate}`, config);
      const data = response.data.data;
      dispatch(fetchAllclaimcashledgerSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllclaimcashledgerFailure(error.message));
    }
  };
};
