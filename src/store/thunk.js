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
  deleteCustomerRequest,
  deleteCustomerSuccess,
  deleteCustomerFailure,
  viewCustomerRequest,
  viewCustomerSuccess,
  viewCustomerFailure,
  updateCustomerRequest,
  updateCustomerSuccess,
  updateCustomerFailure,
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
  deleteProductSuccess,
  deleteProductRequest,
  deleteProductFailure,
  viewProductRequest,
  viewProductSuccess,
  viewProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
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
  getUserBalanceRequest,
  getUserBalanceSuccess,
  getUserBalanceFailure,
  CheckUserRequest,
  CheckUserSuccess,
  CheckUserFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
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
  deleteVendorRequest,
  deleteVendorSuccess,
  deleteVendorFailure,
  viewVendorRequest,
  viewVendorSuccess,
  viewVendorFailure,
  updateVendorRequest,
  updateVendorSuccess,
  updateVendorFailure,
  //  COMPANY ++++++++++++++++++++++++
  CreateCompanyRequest,
  CreateCompanySuccess,
  CreateCompanyFailure,
  ViewCompanyRequest,
  ViewCompanySuccess,
  ViewCompanyFailure,
  UpdateCompanyRequest,
  UpdateCompanySuccess,
  UpdateCompanyFailure,
  DeleteCompanyRequest,
  DeleteCompanySuccess,
  DeleteCompanyFailure,
  fetchAllCompanyRequest,
  fetchAllCompanySuccess,
  fetchAllCompanyFailure,
  setDefaultCompanyRequest,
  setDefaultCompanySuccess,
  setDefaultCompanyFailure,
  CompanyBankBalanceRequest,
  CompanyBankBalanceSuccess,
  CompanyBankBalanceFailure,
  CompanyCashBalanceRequest,
  CompanyCashBalanceSuccess,
  CompanyCashBalanceFailure,
  //  COMPANY BANK ++++++++++++++++++++++++
  CreateCompanyBankRequest,
  CreateCompanyBankSuccess,
  CreateCompanyBankFailure,
  ViewCompanyBankRequest,
  ViewCompanyBankSuccess,
  ViewCompanyBankFailure,
  UpdateCompanyBankRequest,
  UpdateCompanyBankSuccess,
  UpdateCompanyBankFailure,
  DeleteCompanyBankRequest,
  DeleteCompanyBankSuccess,
  DeleteCompanyBankFailure,
  fetchAllCompanyBankRequest,
  fetchAllCompanyBankSuccess,
  fetchAllCompanyBankFailure,
  CompanyBankLedgerRequest,
  CompanyBankLedgerSuccess,
  CompanyBankLedgerFailure,
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
  fetchAllclaimcashledgerFailure,
  // PAYMENT BANK +++++++++++++
  createPaymentbankRequest,
  createPaymentbankSuccess,
  createPaymentbankFailure,
  ViewsinglepaymentbankRequest,
  ViewsinglepaymentbankSuccess,
  ViewsinglepaymentbankFailure,
  updatepaymentbankRequest,
  updatepaymentbankSuccess,
  updatepaymentbankFailure,
  deletepaymentbankRequest,
  deletepaymentbankSuccess,
  deletepaymentbankFailure,
  fetchallpaymentbankRequest,
  fetchallpaymentbankSuccess,
  fetchallpaymentbankFailure,
  PaymentBankLedgerRequest,
  PaymentBankLedgerSuccess,
  PaymentBankLedgerFailure,
  //  PAYMENT RECIEVE BANK +++++++++++++++
  createPaymentRecievebankRequest,
  createPaymentRecievebankSuccess,
  createPaymentRecievebankFailure,
  ViewsinglepaymentrecievebankRequest,
  ViewsinglepaymentrecievebankSuccess,
  ViewsinglepaymentrecievebankFailure,
  updatepaymentrecievebankRequest,
  updatepaymentrecievebankSuccess,
  updatepaymentrecievebankFailure,
  deletepaymentrecievebankRequest,
  deletepaymentrecievebankSuccess,
  deletepaymentrecievebankFailure,
  fetchallpaymentrecievebankRequest,
  fetchallpaymentrecievebankSuccess,
  fetchallpaymentrecievebankFailure,
  PaymentrecieveBankLedgerRequest,
  PaymentrecieveBankLedgerSuccess,
  PaymentrecieveBankLedgerFailure,
  // BILL OF MATERIAL ++++++++++++++
  getAllBomRequest,
  getAllBomSuccess,
  getAllBomFailure,
  createBomRequest,
  createBomSuccess,
  createBomFailure,
  viewBomRequest,
  viewBomSuccess,
  viewBomFailure,
  updateBomRequest,
  updateBomSuccess,
  updateBomFailure,
  deleteBomRequest,
  deleteBomSuccess,
  deleteBomFailure,
  // STOKE ++++++++++++++++++++++++++
  getAllStokeRequest,
  getAllStokeSuccess,
  getAllStokeFailure,
  viewStokeRequest,
  viewStokeSuccess,
  viewStokeFailure,
  updateStokeRequest,
  updateStokeSuccess,
  updateStokeFailure,
  getAllStokeCashRequest,
  getAllStokeCashSuccess,
  getAllStokeCashFailure,
  viewStokeCashRequest,
  viewStokeCashSuccess,
  viewStokeCashFailure,
  updateStokeCashRequest,
  updateStokeCashSuccess,
  updateStokeCashFailure,
  // Notification ++++++++++
  getAllNotificationRequest,
  getAllNotificationSuccess,
  getAllNotificationFailure,
  getAllRawMaterialStokeRequest,
  getAllRawMaterialStokeSuccess,
  getAllRawMaterialStokeFailure,
  viewRawStokeRequest,
  viewRawStokeSuccess,
  viewRawStokeFailure,
  updateRawStokeRequest,
  updateRawStokeSuccess,
  updateRawStokeFailure,
  getAllRawCashStokeRequest,
  getAllRawCashStokeSuccess,
  getAllRawCashStokeFailure,
  viewRawCashStokeSuccess,
  viewRawCashStokeRequest,
  viewRawCashStokeFailure,
  updateRawCashStokeRequest,
  updateRawCashStokeSuccess,
  updateRawCashStokeFailure,
  getTotalRawStokeRequest,
  getTotalRawStokeSuccess,
  getTotalRawStokeFailure,
  getTotalProductStokeSuccess,
  getTotalProductStokeFailure,
  getTotalProductStokeRequest,
  // EMPLOYEE ++++++++++++++++++
  getAllEmployeesalaryRequest,
  getAllEmployeesalarySuccess,
  getAllEmployeesalaryFailure,
  //  USER BANK ++++++++++++++++++++++++
  CreateUserBankRequest,
  CreateUserBankSuccess,
  CreateUserBankFailure,
  ViewUserBankRequest,
  ViewUserBankSuccess,
  ViewUserBankFailure,
  UpdateUserBankRequest,
  UpdateUserBankSuccess,
  UpdateUserBankFailure,
  DeleteUserBankRequest,
  DeleteUserBankSuccess,
  DeleteUserBankFailure,
  fetchAllUserBankRequest,
  fetchAllUserBankSuccess,
  fetchAllUserBankFailure,
  //  EMPLOYEE SALARY ++++++++++++++++++++++++
  CreateemployeesalaryRequest,
  CreateemployeesalarySuccess,
  CreateemployeesalaryFailure,
  // ViewemployeesalaryRequest,
  // ViewemployeesalarySuccess,
  // ViewemployeesalaryFailure,
  UpdateemployeesalaryRequest,
  UpdateemployeesalarySuccess,
  UpdateemployeesalaryFailure,
  DeleteemployeesalaryRequest,
  DeleteemployeesalarySuccess,
  DeleteemployeesalaryFailure,
  fetchAllemployeesalaryRequest,
  fetchAllemployeesalarySuccess,
  fetchAllemployeesalaryFailure,
  // MACHINE +++++++++++++++++++++++
  CreateMachineRequest,
  CreateMachineSuccess,
  CreateMachineFailure,
  fetchAllMachineRequest,
  fetchAllMachineSuccess,
  fetchAllMachineFailure,
  ViewsingleMachineRequest,
  ViewsingleMachineSuccess,
  ViewsingleMachineFailure
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
      const companyId = decodedToken.companyId;
      sessionStorage.setItem('companyId', companyId);
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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/profromainvoice/get_all_ProFormaInvoice`, config);
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/profromainvoice/create_ProFormaInvoice`, quotationData, config);
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
      dispatch(createProformainvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const updateProformainvoice = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateProformainvoiceRequst());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/profromainvoice/update_ProFormaInvoice/${id}`, formData, config);
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
      dispatch(updateProformainvoicefailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const deleteProformainvoiceItem = (id) => {
  return async (dispatch) => {
    dispatch(deleteProformainvoiceItemRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/profromainvoice/delete_ProFormaInvoiceItem/${id}`, config);
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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/profromainvoice/view_single_ProFormaInvoice/${id}`, config);
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
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/profromainvoice/delete_ProFormaInvoice/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/deliverychallan/get_all_deliverychallan`, config);
      const getallDeliverychallan = response.data.data;
      dispatch(getAllDeliverychallanSuccess(getallDeliverychallan));
      return getallDeliverychallan;
    } catch (error) {
      dispatch(getAllDeliverychallanFailure(error));
      throw error;
    }
  };
};
export const createDeliveryChallan = (ChallanData, navigate) => {
  return async (dispatch) => {
    dispatch(createDeliveryChallanRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/deliverychallan/create_deliverychallan`, ChallanData, config);
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
      dispatch(createDeliveryChallanFailure(error));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const Deliverychallanview = (id) => {
  return async (dispatch) => {
    dispatch(viewDeliverychallanRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/deliverychallan/view_deliverychallan/${id}`, config);
      const data = response.data.data;
      dispatch(viewDeliverychallanSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewDeliverychallanFailure(error));
      throw error;
    }
  };
};
export const updateDileveryChallan = (id, ChallanData, navigate) => {
  return async (dispatch) => {
    dispatch(updateDileverychallanRequest());
    try {
      const config = createConfig();
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/deliverychallan/update_deliverychallan/${id}`,
        ChallanData,
        config
      );
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
      dispatch(updateDileverychallanFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const deleteDileveryChallan = (id) => {
  return async (dispatch) => {
    dispatch(deleteDileverychallanItemRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/deliverychallan/delete_deliverychallan/${id}`, config);
      const deleteChallanItem = response;
      dispatch(deleteDileverychallanItemSuccess(deleteChallanItem));
      toast.success(response.data.message, { autoClose: 1000 });
      return deleteChallanItem;
    } catch (error) {
      dispatch(deleteDileverychallanItemFailure(error.message));
      toast.error(error.response.data.message);
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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/customer/C_get_all_customer`, config);
      const data = response.data.data;
      dispatch(fetchAllCustomersCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCustomersCashFailure(error.message));
    }
  };
};
export const fetchAllCustomers = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllCustomersRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/customer/get_all_customer?{search}=`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(fetchAllCustomersSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCustomersFailure(error.message));
      throw error;
    }
  };
};
export const createCustomer = (customerData, navigate) => {
  return async (dispatch) => {
    dispatch(createCustomerRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/customer/create_customer`, customerData, config);
      const createdCustomer = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(createCustomerSuccess(createdCustomer));
      return createdCustomer;
    } catch (error) {
      dispatch(createCustomerFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const DeleteCustomer = (id) => {
  return async (dispatch) => {
    dispatch(deleteCustomerRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/customer/delete_customer/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteCustomerSuccess(data));
      return data;
    } catch (error) {
      dispatch(deleteCustomerFailure(error.message));
    }
  };
};
export const viewCustomer = (id) => {
  return async (dispatch) => {
    dispatch(viewCustomerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/customer/view_customer/${id}`, config);
      const data = response.data.data;
      dispatch(viewCustomerSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewCustomerFailure(error.message));
    }
  };
};
export const updateCustomer = (id, customerData, navigate) => {
  return async (dispatch) => {
    dispatch(updateCustomerRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/customer/update_customer/${id}`, customerData, config);
      const upadteCustomerData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(updateCustomerSuccess(upadteCustomerData));
      return upadteCustomerData;
    } catch (error) {
      dispatch(updateCustomerFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PRODUCT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const fetchAllProductsCash = () => {
  return async (dispatch) => {
    dispatch(fetchAllProdutscashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/item/C_get_all_item`, config);
      const data = response.data.data;
      dispatch(fetchAllProdutscashSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllProdutrscashFailure(error.message));
    }
  };
};
export const fetchAllProducts = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllProdutsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/item/get_all_items`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(fetchAllProdutsSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllProdutrsFailure(error.message));
      throw error;
    }
  };
};
export const createProduct = (data, navigate) => {
  return async (dispatch) => {
    dispatch(createProductRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/item/create_item`, data, config);
      const createProductData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(createProductSuccess(createProductData));
      // window.location.reload();
      return createProductData;
    } catch (error) {
      dispatch(createProductFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const DeleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(deleteProductRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/item/delete_item/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteProductSuccess(data));
      return data;
    } catch (error) {
      dispatch(deleteProductFailure(error.message));
    }
  };
};
export const viewProduct = (id) => {
  return async (dispatch) => {
    dispatch(viewProductRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/item/view_item/${id}`, config);
      const data = response.data.data;
      dispatch(viewProductSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewProductFailure(error.message));
      throw error;
    }
  };
};
export const updateProduct = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(updateProductRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/item/update_item/${id}`, data, config);
      const upadteProductData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(updateProductSuccess(upadteProductData));
      return upadteProductData;
    } catch (error) {
      dispatch(updateProductFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT CASH++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPaymentCash = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(createPaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/C_create_paymentCash`, formData, config);
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
      dispatch(createPaymentCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const getallPaymentCash = () => {
  return async (dispatch) => {
    dispatch(getallPaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/C_get_all_paymentCash`, config);
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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/C_view_paymentCash/${id}`, config);
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
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/payment/C_update_paymentCash/${id}`, formData, config);
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
      dispatch(updatePaymentCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const paymentCashDelete = (id) => {
  return async (dispatch) => {
    dispatch(deletePaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/payment/C_delete_paymentCash/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/salesinvoice/create_salesinvoice`, payload, config);
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
      dispatch(createSalesinvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallSalesInvoice = () => {
  return async (dispatch) => {
    dispatch(getAllSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/get_all_salesInvoice`, config);
      const getallSalesinvoice = response.data;
      dispatch(getAllSalesinvoiceSuccess(getallSalesinvoice));
      return getallSalesinvoice;
    } catch (error) {
      dispatch(getAllSalesinvoiceFailure(error.message));
      throw error;
    }
  };
};
export const SalesInvoiceview = (id) => {
  return async (dispatch) => {
    dispatch(viewSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/view_salesInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewSalesinvoiceSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewSalesinvoiceFailure(error.message));
      throw error;
    }
  };
};
export const updateSalesinvoice = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/salesinvoice/update_salesInvoice/${id}`, payload, config);
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
      dispatch(updateSalesinvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteSalesinvoice = (id) => {
  return async (dispatch) => {
    dispatch(deleteSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/salesinvoice/delete_salesInvoice/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_create_salesinvoice`, payload, config);
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
      dispatch(createSalesinvoicecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallSalesInvoiceCash = () => {
  return async (dispatch) => {
    dispatch(getAllSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_get_all_salesInvoice`, config);
      const getallSalesinvoiceCash = response.data;
      dispatch(getAllSalesinvoicecashSuccess(getallSalesinvoiceCash));
      return getallSalesinvoiceCash;
    } catch (error) {
      dispatch(getAllSalesinvoicecashFailure(error.message));
      throw error;
    }
  };
};
export const SalesInvoiceCashview = (id) => {
  return async (dispatch) => {
    dispatch(viewSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_view_salesInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewSalesinvoicecashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewSalesinvoicecashFailure(error.message));
      throw error;
    }
  };
};
export const updateSalesinvoiceCash = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_update_salesinvoice/${id}`, payload, config);
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
      dispatch(updateSalesinvoicecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteSalesinvoicecash = (id) => {
  return async (dispatch) => {
    dispatch(deleteSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_delete_salesInvoice/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/debitnote/create_debitNote`, payload, config);
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
      dispatch(createDebitnoteFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallDebitnote = () => {
  return async (dispatch) => {
    dispatch(getAllDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/get_all_debitNote`, config);
      const getallDebitnote = response.data.data;
      dispatch(getAllDebitnoteSuccess(getallDebitnote));
      return getallDebitnote;
    } catch (error) {
      dispatch(getAllDebitnoteFailure(error.message));
      throw error;
    }
  };
};
export const Debitnoteviewdata = (id) => {
  return async (dispatch) => {
    dispatch(viewDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/view_single_debitNote/${id}`, config);
      const data = response.data.data;
      dispatch(viewDebitnoteSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewDebitnoteFailure(error.message));
      throw error;
    }
  };
};
export const updateDebitnote = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/debitnote/update_debitNote/${id}`, payload, config);
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
      dispatch(updateDebitnoteFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteDebitnote = (id) => {
  return async (dispatch) => {
    dispatch(deleteDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/debitnote/delete_debitNote/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/creditnote/create_creditNote`, payload, config);
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
      dispatch(createCreditnoteFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallCreditnote = () => {
  return async (dispatch) => {
    dispatch(getAllCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/get_all_creditNote`, config);
      const getallCreditnote = response.data.data;
      dispatch(getAllCreditnoteSuccess(getallCreditnote));
      return getallCreditnote;
    } catch (error) {
      dispatch(getAllCreditnoteFailure(error.message));
      throw error;
    }
  };
};
export const Creditnoteviewdata = (id) => {
  return async (dispatch) => {
    dispatch(viewCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/view_single_creditNote/${id}`, config);
      const data = response.data.data;
      dispatch(viewCreditnoteSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewCreditnoteFailure(error.message));
      throw error;
    }
  };
};
export const updateCreditnote = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/creditnote/update_creditNote/${id}`, payload, config);
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
      dispatch(updateCreditnoteFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteCreditnote = (id) => {
  return async (dispatch) => {
    dispatch(deleteCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/creditnote/delete_creditNote/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteCreditnoteSuccess());
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(deleteCreditnoteFailure());
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE BILL ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPurchaseinvoice = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createPurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/create_purchaseInvoice`, payload, config);
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
      dispatch(createPurchaseinvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallPurchaseinvoice = () => {
  return async (dispatch) => {
    dispatch(getAllPurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/get_all_purchaseInvoice`, config);
      const getallPurchasebill = response.data;
      dispatch(getAllPurchaseinvoiceSuccess(getallPurchasebill));
      return getallPurchasebill;
    } catch (error) {
      dispatch(getAllPurchaseinvoiceFailure(error.message));
      throw error;
    }
  };
};
export const viewPurchaseinvoice = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/view_purchaseInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchaseinvoiceSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchaseinvoiceFailure(error.message));
      throw error;
    }
  };
};
export const updatePurchaseinvoice = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updatePurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/update_purchaseInvoice/${id}`, payload, config);
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
      dispatch(updatePurchaseinvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deletePurchaseinvoice = (id) => {
  return async (dispatch) => {
    dispatch(deletePurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/delete_purchaseInvoice/${id}`, config);
      const deletePurchasebillData = response;
      dispatch(deletePurchaseinvoiceSuccess(deletePurchasebillData));
      toast.success(response.data.message, { autoClose: 1000 });
      return deletePurchasebillData;
    } catch (error) {
      dispatch(deletePurchaseinvoiceFailure(error.message));
      toast.error(error.response.data.message, { autoClose: 1000 });
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
        `${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_create_purchaseCash
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
      dispatch(createPurchaseinvoiceCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallPurchaseInvoiceCash = () => {
  return async (dispatch) => {
    dispatch(getAllPurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_get_all_purchaseCash`, config);
      const getallPurchasebillcash = response.data;
      dispatch(getAllPurchaseinvoiceCashSuccess(getallPurchasebillcash));
      return getallPurchasebillcash;
    } catch (error) {
      dispatch(getAllPurchaseinvoiceCashFailure(error.message));
      throw error;
    }
  };
};
export const PurchaseInvoiceviewCash = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_view_purchaseCash/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchaseinvoiceCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchaseinvoiceCashFailure(error.message));
      throw error;
    }
  };
};
export const updatePurchaseInvoiceCash = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updatePurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_update_purchaseCash/${id}`, payload, config);
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
      dispatch(updatePurchaseinvoiceCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deletePurchaseInvoiceCash = (id) => {
  return async (dispatch) => {
    dispatch(deletePurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_delete_purchaseCash/${id}`, config);
      const deletePurchasebillData = response;
      dispatch(deletePurchaseinvoiceCashSuccess(deletePurchasebillData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/permission/get_all_permissions`, config);
      const getallPermission = response.data.data;
      dispatch(getAllPermissionsSuccess(getallPermission));
      return getallPermission;
    } catch (error) {
      dispatch(getAllPermissionsFailure(error.message));
      throw error;
    }
  };
};
export const updatePermission = (data) => {
  return async (dispatch) => {
    dispatch(updatePermissionsRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/permission/update_permissions`, data, config);
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
      dispatch(createUserFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getallusers = (params = {}) => {
  return async (dispatch) => {
    dispatch(getallUserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_user?{search}=`, { ...config, params: params });

      const getallUsers = response.data.data;
      dispatch(getallUserSuccess(getallUsers));
      return getallUsers;
    } catch (error) {
      dispatch(getallUserFailure(error.message));
      throw error;
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
      throw error;
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
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch(deleteUserRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/remove_company/${id}`, config);
      const deleteUser = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteUserSuccess(deleteUser));
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
export const getuserbalance = () => {
  return async (dispatch) => {
    dispatch(getUserBalanceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_user_balance`, config);
      const getallUsers = response.data.data;
      dispatch(getUserBalanceSuccess(getallUsers));
      return getallUsers;
    } catch (error) {
      dispatch(getUserBalanceFailure(error.message));
    }
  };
};
export const Checkuser = (data) => {
  return async (dispatch) => {
    dispatch(CheckUserRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/check_user`, data, config);
      const userData = response;
      dispatch(CheckUserSuccess(userData));
      return userData;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CheckUserFailure(error.message));
      throw error;
    }
  };
};
export const Adduser = (userid) => {
  return async (dispatch) => {
    dispatch(addUserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/add_user/${userid}`, config);
      const userData = response;
      dispatch(addUserSuccess(userData));
      return userData;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(addUserFailure(error.message));
      throw error;
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ VENDOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createVendor = (vendorData, navigate) => {
  return async (dispatch) => {
    dispatch(createVendorRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/vendor/create_vendor`, vendorData, config);
      const createdVendor = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(createVendorSuccess(createdVendor));
      return createdVendor;
    } catch (error) {
      dispatch(createVendorFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllVendors = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllVendorsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vendor/get_all_vandor?{search}=`, { ...config, params: params });
      const data = response.data.data;
      dispatch(fetchAllVendorsSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllVendorsFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllVendorsCash = () => {
  return async (dispatch) => {
    dispatch(fetchAllVendorsCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vendor/C_get_all_vandor`, config);
      const data = response.data.data;
      dispatch(fetchAllVendorsCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllVendorsCashFailure(error.message));
    }
  };
};
export const DeleteVendor = (id) => {
  return async (dispatch) => {
    dispatch(deleteVendorRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/vendor/delete_vandor/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteVendorSuccess(data));
      return data;
    } catch (error) {
      dispatch(deleteVendorFailure(error.message));
    }
  };
};
export const viewVendor = (id) => {
  return async (dispatch) => {
    dispatch(viewVendorRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vendor/view_vendor/${id}`, config);
      const data = response.data.data;
      dispatch(viewVendorSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewVendorFailure(error.message));
      throw error;
    }
  };
};
export const updateVendor = (id, vendorData, navigate) => {
  return async (dispatch) => {
    dispatch(updateVendorRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/vendor/update_vendor/${id}`, vendorData, config);
      const upadteCustomerData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(updateVendorSuccess(upadteCustomerData));
      return upadteCustomerData;
    } catch (error) {
      dispatch(updateVendorFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createCompany = (data) => {
  return async (dispatch) => {
    dispatch(CreateCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/company/create_company`, data, config);
      const Companydata = response;
      dispatch(CreateCompanySuccess(Companydata));
      return Companydata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CreateCompanyFailure(error.message));
      throw error;
    }
  };
};
export const updateCompany = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/company/update_company/${id}`, formData, config);
      const updateCompanyData = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/companylist');
        }
      });
      dispatch(UpdateCompanySuccess(updateCompanyData));
      return updateCompanyData;
    } catch (error) {
      dispatch(UpdateCompanyFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const Companyview = (id) => {
  return async (dispatch) => {
    dispatch(ViewCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/company/view_single_company/${id}`, config);
      const data = response.data.data;
      dispatch(ViewCompanySuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewCompanyFailure(error.message));
      throw error;
    }
  };
};
export const deleteCompany = (id) => {
  return async (dispatch) => {
    dispatch(DeleteCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/company/delete_company/${id}`, config);
      const deletecompany = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteCompanySuccess(deletecompany));
      return deletecompany;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(DeleteCompanyFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllCompany = () => {
  return async (dispatch) => {
    dispatch(fetchAllCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/company/get_all_company`, config);
      const data = response.data.data;
      dispatch(fetchAllCompanySuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCompanyFailure(error.message));
    }
  };
};
export const fetchuserwiseCompany = () => {
  return async (dispatch) => {
    dispatch(fetchAllCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_all_userTOComapny`, config);
      const data = response.data.data;
      dispatch(fetchAllCompanySuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCompanyFailure(error.message));
      throw error;
    }
  };
};
export const setDefaultCompany = (id) => {
  return async (dispatch) => {
    dispatch(setDefaultCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/company/set_default_comapny/${id}`, config);
      const data = response.data.data;
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      dispatch(setDefaultCompanySuccess(data));
      return data;
    } catch (error) {
      dispatch(setDefaultCompanyFailure(error.message));
    }
  };
};
export const getCompanyBankBalance = () => {
  return async (dispatch) => {
    dispatch(CompanyBankBalanceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/company/view_company_balance`, config);
      const data = response.data.data;
      dispatch(CompanyBankBalanceSuccess(data));
      return data;
    } catch (error) {
      dispatch(CompanyBankBalanceFailure(error.message));
    }
  };
};
export const getCompanyCashBalance = () => {
  return async (dispatch) => {
    dispatch(CompanyCashBalanceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/company/view_company_cash_balance`, config);
      const data = response.data.data;
      dispatch(CompanyCashBalanceSuccess(data));
      return data;
    } catch (error) {
      dispatch(CompanyCashBalanceFailure(error.message));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createCompanyBank = (bankdetails) => {
  return async (dispatch) => {
    dispatch(CreateCompanyBankRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/companybank/create_company_bankDetails`, bankdetails, config);
      const Companybankdata = response;
      dispatch(CreateCompanyBankSuccess(Companybankdata));
      return Companybankdata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CreateCompanyBankFailure(error.message));
      throw error;
    }
  };
};
export const updateCompanyBank = (id, formData) => {
  return async (dispatch) => {
    dispatch(UpdateCompanyBankRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/companybank/update_company_bankDetails/${id}`, formData, config);
      const updateCompanyBankData = response.data.data;
      dispatch(UpdateCompanyBankSuccess(updateCompanyBankData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updateCompanyBankData;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(UpdateCompanyBankFailure(error.message));
      throw error;
    }
  };
};
export const CompanyBankview = (id) => {
  return async (dispatch) => {
    dispatch(ViewCompanyBankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/companybank/view_company_bankDetails/${id}`, config);
      const data = response.data.data;
      dispatch(ViewCompanyBankSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewCompanyBankFailure(error.message));
    }
  };
};
export const deleteCompanyBank = (id) => {
  return async (dispatch) => {
    dispatch(DeleteCompanyBankRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/companybank/delete_company_bankDetails/${id}`, config);
      const deleteCompanybank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteCompanyBankSuccess(deleteCompanybank));
      return deleteCompanybank;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(DeleteCompanyBankFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllCompanyBank = () => {
  return async (dispatch) => {
    dispatch(fetchAllCompanyBankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/companybank/view_all_company_bankDetails`, config);
      const data = response.data.data;
      dispatch(fetchAllCompanyBankSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCompanyBankFailure(error.message));
    }
  };
};
export const CompanyBankLedger = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(CompanyBankLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/companybank/view_single_bankLedger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const data = response.data.data;
      dispatch(CompanyBankLedgerSuccess(data));
      return data;
    } catch (error) {
      dispatch(CompanyBankLedgerFailure(error.message));
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT RECIEVE CASH +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createRecievecash = (data, navigate) => {
  return async (dispatch) => {
    dispatch(createRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/receive/C_create_receiveCash`, data, config);
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
      dispatch(createRecieveCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getallRecieveCash = () => {
  return async (dispatch) => {
    dispatch(getAllRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/receive/C_get_all_receiveCash`, config);
      const getallRecievecash = response.data.data;
      dispatch(getAllRecieveCashSuccess(getallRecievecash));
      return getallRecievecash;
    } catch (error) {
      dispatch(getAllRecieveCashFailure(error.message));
      throw error;
    }
  };
};
export const viewRecieveCash = (id) => {
  return async (dispatch) => {
    dispatch(viewRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/receive/C_view_receiveCash/${id}`, config);
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
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/receive/C_update_receiveCash/${id}`, formData, config);
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
      dispatch(updateRecieveCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteRecieveCash = (id) => {
  return async (dispatch) => {
    dispatch(deleteRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/receive/C_delete_receiveCash/${id}`, config);
      const deleteRecievecash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteRecieveCashSuccess(deleteRecievecash));
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
        `${process.env.REACT_APP_BASE_URL}/vendorledger/C_get_vendorLedger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallvendorledgerlist = response.data.data;
      dispatch(getAllvendorLedgerSuccess(getallvendorledgerlist));
      return getallvendorledgerlist;
    } catch (error) {
      dispatch(getAllvendorLedgerFailure(error.message));
      throw error;
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
        `${process.env.REACT_APP_BASE_URL}/customerledger/C_get_customerLedger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallcustomerledgerlist = response.data.data;
      dispatch(getAllcustomerLedgerSuccess(getallcustomerledgerlist));
      return getallcustomerledgerlist;
    } catch (error) {
      dispatch(getAllcustomerLedgerFailure(error.message));
      throw error;
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ CALAIM+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallclaimuser = () => {
  return async (dispatch) => {
    dispatch(getAllclaimuserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/get_all_ClaimUser`, config);
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/claim/create_claim`, formData, config);
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
      dispatch(createClaimCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewClaimCash = () => {
  return async (dispatch) => {
    dispatch(viewClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/view_myclaim`, config);
      const data = response.data.data;
      dispatch(viewClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewClaimCashFailure(error.message));
      throw error;
    }
  };
};
export const viewSingleclaimCash = (id) => {
  return async (dispatch) => {
    dispatch(viewsingleClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/view_single_claim/${id}`, config);
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
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/claim/update_claim/${id}`, formData, config);
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
      dispatch(updateClaimCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteClaimCash = (id) => {
  return async (dispatch) => {
    dispatch(deleteClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/claim/delete_claim/${id}`, config);
      const deleteClaimcash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteClaimCashSuccess(deleteClaimcash));
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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/view_reciveclaim`, config);
      const data = response.data.data;
      dispatch(viewRecieveClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewRecieveClaimCashFailure(error.message));
      throw error;
    }
  };
};
export const IsStatusclaimCash = (id, toUserId, isApproved) => {
  return async (dispatch) => {
    dispatch(viewsingleClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/claim/isapproved_claim/${id}`, { toUserId, isApproved }, config);
      const data = response.data.data;
      dispatch(viewsingleClaimCashSuccess(data));
      window.location.reload();
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
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/claim/view_claimBalance_ledger?fromDate=${formDate}&toDate=${toDate}`,
        config
      );
      const data = response.data.data;
      dispatch(fetchAllclaimcashledgerSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(fetchAllclaimcashledgerFailure(error.message));
      throw error;
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ PAYMENT BANK+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPaymentBank = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(createPaymentbankRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/create_payment_bank`, formData, config);
      const Paymentbank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentbanklist');
        }
      });
      dispatch(createPaymentbankSuccess(Paymentbank));
      return Paymentbank;
    } catch (error) {
      dispatch(createPaymentbankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewSinglePaymentBank = (id) => {
  return async (dispatch) => {
    dispatch(ViewsinglepaymentbankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/view_payment_bank/${id}`, config);
      const data = response.data.data;
      dispatch(ViewsinglepaymentbankSuccess(data));
      return data;
    } catch (error) {
      dispatch(ViewsinglepaymentbankFailure(error.message));
    }
  };
};
export const updatePaymentbank = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updatepaymentbankRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/payment/update_payment_bank/${id}`, formData, config);
      const updatpaymentbankdata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentbanklist');
        }
      });
      dispatch(updatepaymentbankSuccess(updatpaymentbankdata));
      return updatpaymentbankdata;
    } catch (error) {
      dispatch(updatepaymentbankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deletePaymentbank = (id) => {
  return async (dispatch) => {
    dispatch(deletepaymentbankRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/payment/delete_payment_bank/${id}`, config);
      const deletepaymentbank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deletepaymentbankSuccess(deletepaymentbank));
      return deletepaymentbank;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(deletepaymentbankFailure(error.message));
      throw error;
    }
  };
};
export const getAllPaymentbank = () => {
  return async (dispatch) => {
    dispatch(fetchallpaymentbankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/view_all_payment_bank`, config);
      const data = response.data.data;
      dispatch(fetchallpaymentbankSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchallpaymentbankFailure(error.message));
      throw error;
    }
  };
};
export const getAllPaymentbankLedger = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(PaymentBankLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/vendorledger/get_vendorLedger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const data = response.data.data;
      dispatch(PaymentBankLedgerSuccess(data));
      return data;
    } catch (error) {
      dispatch(PaymentBankLedgerFailure(error.message));
      throw error;
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ PAYMENT BANK+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPaymentRecieveBank = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(createPaymentRecievebankRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/receive/create_receive_bank`, formData, config);
      const Paymentrecievebank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentrecievebanklist');
        }
      });
      dispatch(createPaymentRecievebankSuccess(Paymentrecievebank));
      return Paymentrecievebank;
    } catch (error) {
      dispatch(createPaymentRecievebankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewSinglePaymentRecieveBank = (id) => {
  return async (dispatch) => {
    dispatch(ViewsinglepaymentrecievebankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/receive/view_receive_bank/${id}`, config);
      const data = response.data.data;
      dispatch(ViewsinglepaymentrecievebankSuccess(data));
      return data;
    } catch (error) {
      dispatch(ViewsinglepaymentrecievebankFailure(error.message));
    }
  };
};
export const updatePaymentRecievebank = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updatepaymentrecievebankRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/receive/update_receive_bank/${id}`, formData, config);
      const updatpaymentbankdata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentrecievebanklist');
        }
      });
      dispatch(updatepaymentrecievebankSuccess(updatpaymentbankdata));
      return updatpaymentbankdata;
    } catch (error) {
      dispatch(updatepaymentrecievebankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deletePaymentRecievebank = (id) => {
  return async (dispatch) => {
    dispatch(deletepaymentrecievebankRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/receive/delete_receive_bank/${id}`, config);
      const deletepaymentbank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deletepaymentrecievebankSuccess(deletepaymentbank));
      return deletepaymentbank;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(deletepaymentrecievebankFailure(error.message));
      throw error;
    }
  };
};
export const getAllPaymentRecievebank = () => {
  return async (dispatch) => {
    dispatch(fetchallpaymentrecievebankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/receive/get_all_receive_bank`, config);
      const data = response.data.data;
      dispatch(fetchallpaymentrecievebankSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchallpaymentrecievebankFailure(error.message));
      throw error;
    }
  };
};
export const getAllPaymentRecievebankLedger = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(PaymentrecieveBankLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/customerledger/get_customerLedger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const data = response.data.data;
      dispatch(PaymentrecieveBankLedgerSuccess(data));
      return data;
    } catch (error) {
      dispatch(PaymentrecieveBankLedgerFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ PAYMENT BANK+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createBom = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(createBomRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/bom/create_bom`, formData, config);
      const Bom = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/billofmateriallist');
        }
      });
      dispatch(createBomSuccess(Bom));
      return Bom;
    } catch (error) {
      dispatch(createBomFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewSingleBom = (id) => {
  return async (dispatch) => {
    dispatch(viewBomRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/bom/view_bom/${id}`, config);
      const data = response.data.data;
      dispatch(viewBomSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewBomFailure(error.message));
      throw error;
    }
  };
};
export const updateBom = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateBomRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/bom/update_bom/${id}`, formData, config);
      const updateBom = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/billofmateriallist');
        }
      });
      dispatch(updateBomSuccess(updateBom));
      return updateBom;
    } catch (error) {
      dispatch(updateBomFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteBom = (id) => {
  return async (dispatch) => {
    dispatch(deleteBomRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/bom/delete_bom/${id}`, config);
      const deleteBom = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteBomSuccess(deleteBom));
      return deleteBom;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(deleteBomFailure(error.message));
      throw error;
    }
  };
};
export const getAllBom = () => {
  return async (dispatch) => {
    dispatch(getAllBomRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/bom/view_all_bom`, config);
      const data = response.data.data;
      dispatch(getAllBomSuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllBomFailure(error.message));
      throw error;
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Product STOKE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getAllStoke = () => {
  return async (dispatch) => {
    dispatch(getAllStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/view_all_product_stock`, config);
      const data = response.data.data;
      dispatch(getAllStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllStokeFailure(error.message));
      throw error;
    }
  };
};
export const viewSingleStoke = (id) => {
  return async (dispatch) => {
    dispatch(viewStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/view_product_stock/${id}`, config);
      const data = response.data.data;
      dispatch(viewStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewStokeFailure(error.message));
      throw error;
    }
  };
};
export const updateStoke = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/stock/update_product_stock/${id}`, formData, config);
      const updateStoke = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/stocklist');
        }
      });
      dispatch(updateStokeSuccess(updateStoke));
      return updateStoke;
    } catch (error) {
      dispatch(updateStokeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getAllStokecash = () => {
  return async (dispatch) => {
    dispatch(getAllStokeCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/C_view_all_product_stock`, config);
      const data = response.data.data;
      dispatch(getAllStokeCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllStokeCashFailure(error.message));
      throw error;
    }
  };
};
export const viewSingleStokeCash = (id) => {
  return async (dispatch) => {
    dispatch(viewStokeCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/C_view_product_stock/${id}`, config);
      const data = response.data.data;
      dispatch(viewStokeCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewStokeCashFailure(error.message));
      throw error;
    }
  };
};
export const updateStokeCash = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateStokeCashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/stock/C_update_product_stock/${id}`, formData, config);
      console.log('response', response);
      const updateStoke = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/stockcashlist');
        }
      });
      dispatch(updateStokeCashSuccess(updateStoke));
      return updateStoke;
    } catch (error) {
      dispatch(updateStokeCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Raw Material Stoke+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getAllRawStock = () => {
  return async (dispatch) => {
    dispatch(getAllRawMaterialStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/view_all_raw_material_stock`, config);
      const data = response.data.data;
      dispatch(getAllRawMaterialStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllRawMaterialStokeFailure(error.message));
      // throw error;
    }
  };
};
export const viewSingleRawStock = (id) => {
  return async (dispatch) => {
    dispatch(viewRawStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/view_raw_material_stock/${id}`, config);
      const data = response.data.data;
      dispatch(viewRawStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewRawStokeFailure(error.message));
      throw error;
    }
  };
};
export const updateRowStoke = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateRawStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/stock/update_raw_material_stock/${id}`, formData, config);
      const updateStoke = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/stocklist');
        }
      });
      dispatch(updateRawStokeSuccess(updateStoke));
      return updateStoke;
    } catch (error) {
      dispatch(updateRawStokeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Raw Material Stoke Cash+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getAllRawCashStock = () => {
  return async (dispatch) => {
    dispatch(getAllRawCashStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/C_view_all_raw_material_cash_stock`, config);
      const data = response.data.data;
      dispatch(getAllRawCashStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllRawCashStokeFailure(error.message));
      // throw error;
    }
  };
};
export const viewSingleRawCashStock = (id) => {
  return async (dispatch) => {
    dispatch(viewRawCashStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/C_view_raw_material_cash_stock/${id}`, config);
      const data = response.data.data;
      dispatch(viewRawCashStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewRawCashStokeFailure(error.message));
      throw error;
    }
  };
};
export const updateRowCashStoke = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateRawCashStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/stock/C_update_raw_material_cash_stock/${id}`, formData, config);
      const updateStoke = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/stockcashlist');
        }
      });
      dispatch(updateRawCashStokeSuccess(updateStoke));
      return updateStoke;
    } catch (error) {
      dispatch(updateRawCashStokeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Total Raw Material Stoke +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getTotalRawMaterialStock = () => {
  return async (dispatch) => {
    dispatch(getTotalRawStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/C_view_total_material_stock`, config);
      const data = response.data.data;
      dispatch(getTotalRawStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(getTotalRawStokeFailure(error.message));
      // throw error;
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Total Product Stoke +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getTotalProductStock = () => {
  return async (dispatch) => {
    dispatch(getTotalProductStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/C_view_total_product_stock`, config);
      const data = response.data.data;
      dispatch(getTotalProductStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(getTotalProductStokeFailure(error.message));
      // throw error;
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Notification ++++++++++++++++++++++++++
export const getAllNotification = (value) => {
  return async (dispatch) => {
    dispatch(getAllNotificationRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/notification/view_all_notification?isFront=${value}`, config);
      const data = response.data.data;
      dispatch(getAllNotificationSuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllNotificationFailure(error.message));
      throw error;
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Notification ++++++++++++++++++++++++++
export const getAllEmployeeSalary = () => {
  return async (dispatch) => {
    dispatch(getAllEmployeesalaryRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salary/view_all_salary`, config);
      const data = response.data.data;
      dispatch(getAllEmployeesalarySuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllEmployeesalaryFailure(error.message));
      throw error;
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createUserBank = (bankdetails) => {
  return async (dispatch) => {
    dispatch(CreateUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add_user_bank_account`, bankdetails, config);
      const Userbankdata = response;
      dispatch(CreateUserBankSuccess(Userbankdata));
      return Userbankdata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CreateUserBankFailure(error.message));
      throw error;
    }
  };
};
export const updateUserBank = (accountId, formData) => {
  return async (dispatch) => {
    dispatch(UpdateUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/edit_user_bank_account/${accountId}`, formData, config);
      const updateUserBankData = response.data.data;
      dispatch(UpdateUserBankSuccess(updateUserBankData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updateUserBankData;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(UpdateUserBankFailure(error.message));
      throw error;
    }
  };
};
export const UserBankview = (id) => {
  return async (dispatch) => {
    dispatch(ViewUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_user_bank_account/${id}`, config);
      const data = response.data.data;
      dispatch(ViewUserBankSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewUserBankFailure(error.message));
    }
  };
};
export const deleteUserBank = (id) => {
  return async (dispatch) => {
    dispatch(DeleteUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_user_bank_account/${id}`, config);
      const deleteUserbank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteUserBankSuccess(deleteUserbank));
      return deleteUserbank;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(DeleteUserBankFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllUserBank = (userId) => {
  return async (dispatch) => {
    dispatch(fetchAllUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_all_user_bank_account/${userId}`, config);
      const data = response.data.data;
      dispatch(fetchAllUserBankSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllUserBankFailure(error.message));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALARY OF EMPLOYEE  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createEmployeesalary = (salaryId, data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateemployeesalaryRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/salary/add_salary_payment/${salaryId}`, data, config);
      const employeesalarydata = response;
      dispatch(CreateemployeesalarySuccess(employeesalarydata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/employeedirectory');
      return employeesalarydata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CreateemployeesalaryFailure(error.message));
      throw error;
    }
  };
};
export const updateEmployeesalary = (salaryPaymentId, formData) => {
  return async (dispatch) => {
    dispatch(UpdateemployeesalaryRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/salary/edit_salary_payment/${salaryPaymentId}`, formData, config);
      const updateemployeesalaryData = response.data.data;
      dispatch(UpdateemployeesalarySuccess(updateemployeesalaryData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updateemployeesalaryData;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(UpdateemployeesalaryFailure(error.message));
      throw error;
    }
  };
};
// export const Employeesalaryview = (id) => {
//   return async (dispatch) => {
//     dispatch(ViewemployeesalaryRequest());
//     try {
//       const config = createConfig();
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salary/view_user_bank_account/${id}`, config);
//       const data = response.data.data;
//       dispatch(ViewemployeesalarySuccess(data));
//       return data;
//     } catch (error) {
//       toast.error(error.response.data.error);
//       dispatch(ViewemployeesalaryFailure(error.message));
//     }
//   };
// };
export const deleteEmployeesalary = (salaryPaymentId) => {
  return async (dispatch) => {
    dispatch(DeleteemployeesalaryRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/salary/delete_salary_payment/${salaryPaymentId}`, config);
      const deleteEmployeesalary = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteemployeesalarySuccess(deleteEmployeesalary));
      return deleteEmployeesalary;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(DeleteemployeesalaryFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllEmployeeSalary = (salaryId) => {
  return async (dispatch) => {
    dispatch(fetchAllemployeesalaryRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salary/view_all_salary_payment/${salaryId}`, config);
      const data = response.data.data;
      dispatch(fetchAllemployeesalarySuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllemployeesalaryFailure(error.message));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MACHINE CREATE  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createMachine = (data) => {
  return async (dispatch) => {
    dispatch(CreateMachineRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/machine/create_machine`, data, config);
      const addMachinedata = response;
      dispatch(CreateMachineSuccess(addMachinedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return addMachinedata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CreateMachineFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllMachine = () => {
  return async (dispatch) => {
    dispatch(fetchAllMachineRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/machine/view_all_machine`, config);
      const data = response.data.data;
      dispatch(fetchAllMachineSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllMachineFailure(error.message));
    }
  };
};
export const Machineview = (machineId) => {
  return async (dispatch) => {
    dispatch(ViewsingleMachineRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/machine/view_one_machine/${machineId}`, config);
      const data = response.data.data;
      dispatch(ViewsingleMachineSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewsingleMachineFailure(error.message));
    }
  };
};
