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
  // QUOTATION ++++++++++++++++++++++++++++++
  fetchQuotationRequest,
  fetchQuotationSuccess,
  fetchQuotationFailure,
  createQuotationRequest,
  createQuotationSuccess,
  createQuotationFailure,
  createQuotationItemRequest,
  createQuotationItemSuccess,
  createQuotationItemFailure,
  deleteQuotationItemRequest,
  deleteQuotationItemSuccess,
  deleteQuotationItemFailure,
  updateQuotationRequst,
  updateQuotationsuccess,
  updateQuotationfailure,
  updateQuotationItemRequst,
  updateQuotationItemsuccess,
  updateQuotationItemfailure,
  viewQuotationRequest,
  viewQuotationSuccess,
  viewQuotationFailure,
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
  createSalesinvoiceItemRequest,
  createSalesinvoiceItemSuccess,
  createSalesinvoiceItemFailure,
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
  updatePermissionsFailure
} from './actions';

const token = sessionStorage.getItem('token');
const config = {
  headers: {
    token: token
  }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIN ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const loginAdmin = (credentials, navigate) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin_login`, credentials);
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      const userData = response.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/dashboard');
        }
      });
      dispatch(loginSuccess(userData));
      return userData.status;
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error(error.response.data.error, { autoClose: 1000 });
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++  QOUTATION  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const fetchQuotationList = () => {
  return async (dispatch) => {
    dispatch(fetchQuotationRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_quotation`, config);
      const data = await response.data.data;
      dispatch(fetchQuotationSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchQuotationFailure(error));
      throw error;
    }
  };
};
export const createQuotation = (quotationData) => {
  return async (dispatch) => {
    dispatch(createQuotationRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_quotation`, quotationData, config);
      const createdQuotation = response.data.data;
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_quatationItem`, payload, config);
      const createdQuotationitemdata = response;
      dispatch(createQuotationItemSuccess(createdQuotationitemdata));
      return createdQuotationitemdata;
    } catch (error) {
      dispatch(createQuotationItemFailure(error.message));
      throw error;
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
export const Quotationview = (id) => {
  return async (dispatch) => {
    dispatch(viewQuotationRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_quotation/${id}`, config);
      const data = response.data.data;
      dispatch(viewQuotationSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewQuotationFailure(error.message));
    }
  };
};
export const updateQutation = (id, formData) => {
  return async (dispatch) => {
    dispatch(updateQuotationRequst());
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_quotation/${id}`, formData, config);
      const updateQuotationData = response;
      dispatch(updateQuotationsuccess(updateQuotationData));
      // console.log(updateQuotationData.data.data.id);
      return updateQuotationData;
    } catch (error) {
      dispatch(updateQuotationfailure(error.message));
    }
  };
};
export const updateQuotationItem = (itemid, updateItemData) => {
  return async (dispatch) => {
    dispatch(updateQuotationItemRequst());
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_quotationItem/${itemid}`, updateItemData, config);
      const updateQuotationItemData = response;
      dispatch(updateQuotationItemsuccess(updateQuotationItemData));
      return updateQuotationItemData;
    } catch (error) {
      dispatch(updateQuotationItemfailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DELIVERYCHALLAN ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallDeliverychallan = () => {
  return async (dispatch) => {
    dispatch(getAllDeliverychallanRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_deliverychallan`, config);
      const getallDeliverychallan = response.data;
      dispatch(getAllDeliverychallanSuccess(getallDeliverychallan));
      return getallDeliverychallan;
    } catch (error) {
      dispatch(getAllDeliverychallanFailure(error.message));
    }
  };
};
export const createDeliveryChallan = (ChallanData) => {
  return async (dispatch) => {
    dispatch(createDeliveryChallanRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_deliverychallan`, ChallanData, config);
      const createdDeliverychallan = response;
      dispatch(createDeliveryChallanSuccess(createdDeliverychallan));
      return createdDeliverychallan;
    } catch (error) {
      dispatch(createDeliveryChallanFailure(error.message));
    }
  };
};
export const Deliverychallanview = (id) => {
  return async (dispatch) => {
    dispatch(viewDeliverychallanRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_deliverychallan/${id}`, config);
      const data = response.data.data;
      dispatch(viewDeliverychallanSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewDeliverychallanFailure(error.message));
    }
  };
};
export const updateDileveryChallan = (id, ChallanData) => {
  return async (dispatch) => {
    dispatch(updateDileverychallanRequest());
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_deliverychallan/${id}`, ChallanData, config);

      const updateChallanData = response;
      dispatch(updateDileverychallanSuccess(updateChallanData));
      return updateChallanData;
    } catch (error) {
      dispatch(updateDileverychallanFailure(error.message));
      throw error;
    }
  };
};
export const updateDileveryChallanItem = (id, payload) => {
  return async (dispatch) => {
    dispatch(updateDileverychallanItemRequest());
    try {
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_customer`, customerData, config);
      const createdCustomer = response;
      dispatch(createCustomerSuccess(createdCustomer));
      alert('customer crate successfully');
      return createdCustomer;
    } catch (error) {
      dispatch(createCustomerFailure(error.message));
      throw error;
    }
  };
};
export const createCustomfeild = (payload) => {
  return async (dispatch) => {
    dispatch(createCustomFeildRequest());
    try {
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
    dispatch(deleteQuotationItemRequest());
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_customfeild/${id}`, config);
      console.log('response', response);
      dispatch(deleteQuotationItemSuccess());
    } catch (error) {
      console.error('Error deleting quotation:', error);
      dispatch(deleteQuotationItemFailure());
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PRODUCT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const fetchAllProducts = () => {
  return async (dispatch) => {
    dispatch(fetchAllProdutsRequest());
    try {
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_product`, data, config);
      const createProductData = response;
      dispatch(createProductSuccess(createProductData));
      alert(createProductData.data.message);
      return createProductData;
    } catch (error) {
      dispatch(createProductFailure(error.message));
      alert(error.response.data.message);
      throw error;
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPayment = (formData) => {
  return async (dispatch) => {
    dispatch(createPaymentRequest());
    try {
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
export const createSalesInvoice = (salesinvoicedata) => {
  return async (dispatch) => {
    dispatch(createSalesinvoiceRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_salesinvoice`, salesinvoicedata, config);
      const cretesalesinvoice = response;
      dispatch(createSalesinvoiceSuccess(cretesalesinvoice));
      return cretesalesinvoice;
    } catch (error) {
      dispatch(createSalesinvoiceFailure(error.message));
      throw error;
    }
  };
};
export const createSalesinvoiceItem = (payload) => {
  return async (dispatch) => {
    dispatch(createSalesinvoiceItemRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_salesinvoice_item`, payload, config);
      const createdSalesinvoiceitems = response;
      dispatch(createSalesinvoiceItemSuccess(createdSalesinvoiceitems));
      return createdSalesinvoiceitems;
    } catch (error) {
      dispatch(createSalesinvoiceItemFailure(error.message));
      throw error;
    }
  };
};
export const getallSalesInvoice = () => {
  return async (dispatch) => {
    dispatch(getAllSalesinvoiceRequest());
    try {
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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_salesInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewSalesinvoiceSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewSalesinvoiceFailure(error.message));
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPurchase = (purchaseData) => {
  return async (dispatch) => {
    dispatch(createPurchaseRequest());
    try {
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
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_permissions`, data);
      const updatePermissionData = response.data;
      dispatch(updatePermissionsSuccess(updatePermissionData));
      return updatePermissionData;
    } catch (error) {
      dispatch(updatePermissionsFailure(error.message));
      throw error;
    }
  };
};
