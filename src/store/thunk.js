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
  createCustomerFailure,
  createCustomFeildRequest,
  createCustomFeildSuccess,
  createCustomFeildFailure,
  viewPurchaseRequest,
  viewPurchaseSuccess,
  viewPurchaseFailure,
  createDeliveryChallanRequest,
  createDeliveryChallanSuccess,
  createDeliveryChallanFailure,
  createDeliveryChallanItemRequest,
  createDeliveryChallanItemSuccess,
  createDeliveryChallanItemFailure,
  createPaymentRequest,
  createPaymentSuccess,
  createPaymentFailure,
  getallPaymentRequest,
  getallPaymentSuccess,
  getallPaymentFailure,
  viewPaymentRequest,
  viewPaymentSuccess,
  viewPaymentFailure,
  createSalesinvoiceRequest,
  createSalesinvoiceSuccess,
  createSalesinvoiceFailure,
  createSalesinvoiceItemRequest,
  createSalesinvoiceItemSuccess,
  createSalesinvoiceItemFailure,
  createPurchaseRequest,
  createPrchaseSuccess,
  createPurchaseFailure,
  createPurchaseItemRequest,
  createPrchaseItemSuccess,
  createPurchaseItemFailure,
  createPurchaseBillRequest,
  createPurchaseBillSuccess,
  createPurchaseBillFailure,
  createPurchaseBillItemRequest,
  createPurchaseBillItemSuccess,
  createPurchaseBillItemFailure,
  fetchAllPurchaseRequest,
  fetchAllPurchaseSuccess,
  fetchAllPurchaseFailure,
  createProductRequest,
  createProductFailure,
  createProductSuccess,
  createExpenseRequest,
  createExpenseFailure,
  createExpenseSuccess,
  createExpenseItemRequest,
  createExpenseItemFailure,
  createExpenseItemSuccess
} from './actions';

const token = sessionStorage.getItem('token');
const config = {
  headers: {
    token: token
  }
};

export const fetchQuotationList = () => {
  return async (dispatch) => {
    dispatch(fetchQuotationRequest());
    try {
      // console.log(process.env.REACT_APP_BASE_URL,">>>>>>>>>>>>>>>>>>ENV");
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_quotation`, config);
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
      // console.log('login', response.data);
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      const userData = response.data;
      // console.log("********",userData.message);
      alert(userData.message);
      dispatch(loginSuccess(userData));
      return userData.status;
    } catch (error) {
      dispatch(loginFailure(error.message));
      alert(error.response.data.error);
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

export const createCustomer = (customerData) => {
  return async (dispatch) => {
    dispatch(createCustomerRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_customer`, customerData, config);
      const createdCustomer = response;
      console.log('createdQuotation>>>>', createdCustomer);
      dispatch(createCustomerSuccess(createdCustomer));
      alert('customer crate successfully');
      return createdCustomer;
    } catch (error) {
      dispatch(createCustomerFailure(error.message));
      // alert(error.response.data.message);
      // console.log("@@@@@@@@",error.response.data.message);
      throw error;
    }
  };
};

export const createCustomfeild = (payload) => {
  return async (dispatch) => {
    dispatch(createCustomFeildRequest());
    try {
      // console.log('enter');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_customfeild`, payload, config);
      const createdCustomfeilddata = response;
      // console.log('createdCustomfeilddata>>>>', createdCustomfeilddata);
      dispatch(createCustomFeildSuccess(createdCustomfeilddata));
      return createdCustomfeilddata;
    } catch (error) {
      dispatch(createCustomFeildFailure(error.message));
      // alert(error.response.data.message);
      // console.log("!!!!!!!!!!",error.response.data);
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

export const purchaseview = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchaseRequest());
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_purchase/${id}`, config);
      const data = response.data.data;
      // console.log('data', response.data.data);
      dispatch(viewPurchaseSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchaseFailure(error.message));
    }
  };
};

export const createDeliveryChallan = (ChallanData) => {
  return async (dispatch) => {
    dispatch(createDeliveryChallanRequest());
    try {
      // console.log('enter');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_deliverychallan`, ChallanData, config);
      const createdDeliverychallan = response;
      // console.log('create_deliverychallan>>>>', createdDeliverychallan);
      dispatch(createDeliveryChallanSuccess(createdDeliverychallan));
      return createdDeliverychallan;
    } catch (error) {
      dispatch(createDeliveryChallanFailure(error.message));
    }
  };
};

export const createProduct = (data) => {
  return async (dispatch) => {
    dispatch(createProductRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_product`, data, config);
      const createProductData = response;
      // console.log(response, 'product))))))))))))))))))))))');
      dispatch(createProductSuccess(createProductData));
      alert(createProductData.data.message);
      // console.log(createProductData.data.message);
      return createProductData;
    } catch (error) {
      dispatch(createProductFailure(error.message));
      alert(error.response.data.message);
      // console.log(error.response);
      throw error;
    }
  };
};

export const createDeliveryChallanItem = (payload) => {
  return async (dispatch) => {
    dispatch(createDeliveryChallanItemRequest());
    try {
      // console.log('enter');
      // console.log("payload",payload);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_deliverychallanitem`, payload, config);
      // console.log("enter deli");
      const createdDeliverychallanitems = response;
      // console.log('create_deliverychallan>>>>', createdDeliverychallanitems);
      dispatch(createDeliveryChallanItemSuccess(createdDeliverychallanitems));
      return createdDeliverychallanitems;
    } catch (error) {
      dispatch(createDeliveryChallanItemFailure(error.message));
    }
  };
};

export const createExpense = (data) => {
  return async (dispatch) => {
    // console.log("enter");
    dispatch(createExpenseRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_expense`, data, config);
      const expenceData = response;
      // console.log("respo",response);
      dispatch(createExpenseSuccess(expenceData));
      // alert(expenceData.data.message);
      // console.log("###########",expenceData.data.message);
      return expenceData;
    } catch (error) {
      dispatch(createExpenseFailure(error.message));
      // alert(error.response.data.message);
      // console.log("@@@@@@@@@@@@@@".error.response.data.message);
      throw error;
    }
  };
};

export const createPayment = (paymentData) => {
  return async (dispatch) => {
    dispatch(createPaymentRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_payment`, paymentData, config);
      const createdpayment = response;
      // console.log('createdQuotation>>>>', createdpayment);
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
      // console.log('getallpayment>>>>', getallpayment);
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
      // console.log('data', response.data.data);
      dispatch(viewPaymentSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPaymentFailure(error.message));
    }
  };
};

export const createSalesInvoice = (salesinvoicedata) => {
  return async (dispatch) => {
    dispatch(createSalesinvoiceRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_salesinvoice`, salesinvoicedata, config);
      const cretesalesinvoice = response;
      // console.log('createdQuotation>>>>', cretesalesinvoice);
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
      // console.log('enter');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_salesinvoice_item`, payload, config);
      const createdSalesinvoiceitems = response;
      // console.log('create_Salesinvoice>>>>', createdSalesinvoiceitems);
      dispatch(createSalesinvoiceItemSuccess(createdSalesinvoiceitems));
      return createdSalesinvoiceitems;
    } catch (error) {
      dispatch(createSalesinvoiceItemFailure(error.message));
      throw error;
    }
  };
};

export const createPurchase = (purchaseData) => {
  return async (dispatch) => {
    dispatch(createPurchaseRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_purchase`, purchaseData, config);
      const cretepurchase = response;
      // console.log('createdQuotation>>>>', cretepurchase);
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
      // console.log('enter');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_purchaseitem`, payload, config);
      const createdPurchaseitems = response;
      // console.log('create_Salesinvoice>>>>', createdPurchaseitems);
      dispatch(createPrchaseItemSuccess(createdPurchaseitems));
      return createdPurchaseitems;
    } catch (error) {
      dispatch(createPurchaseItemFailure(error.message));
      throw error;
    }
  };
};

export const createPurchaseBill = (purchasebillData) => {
  return async (dispatch) => {
    dispatch(createPurchaseBillRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_purchasebill`, purchasebillData, config);
      const cretepurchasebill = response;
      // console.log('cretepurchasebill>>>>', cretepurchasebill);
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
      // console.log('enter');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_purchasebill_item`, payload, config);
      const createdPurchaseBillitems = response;
      // console.log('createdPurchaseBillitems>>>>', createdPurchaseBillitems);
      dispatch(createPurchaseBillItemSuccess(createdPurchaseBillitems));
      return createdPurchaseBillitems;
    } catch (error) {
      dispatch(createPurchaseBillItemFailure(error.message));
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