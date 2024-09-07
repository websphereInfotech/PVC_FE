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
  deleteProformainvoiceRequest,
  deleteProformainvoiceSuccess,
  deleteProformainvoiceFailure,
  updateProformainvoiceRequst,
  updateProformainvoicesuccess,
  updateProformainvoicefailure,
  viewProformainvoiceRequest,
  viewProformainvoiceSuccess,
  viewProformainvoiceFailure,
  // PURCHASE ORDER ++++++++++++++++++++++++++++
  createPurchaseorderRequest,
  createPurchaseorderSuccess,
  createPurchaseorderFailure,
  updatePurchaseOrderRequst,
  updatePurchaseOrdersuccess,
  updatePurchaseOrderfailure,
  deletePurchaseOrderRequest,
  deletePurchaseOrderSuccess,
  deletePurchaseOrderFailure,
  viewPurchaseOrderRequest,
  viewPurchaseOrderSuccess,
  viewPurchaseOrderFailure,
  fetchPurchaseOrderRequest,
  fetchPurchaseOrderSuccess,
  fetchPurchaseOrderFailure,

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
  // DEBIT NOTE+++++++++++++++++++++
  createDebitnotecashRequest,
  createDebitnotecashSuccess,
  createDebitnotecashFailure,
  getAllDebitnotecashRequest,
  getAllDebitnotecashSuccess,
  getAllDebitnotecashFailure,
  viewDebitnotecashRequest,
  viewDebitnotecashSuccess,
  viewDebitnotecashFailure,
  updateDebitnotecashRequest,
  updateDebitnotecashSuccess,
  updateDebitnotecashFailure,
  deleteDebitnotecashRequest,
  deleteDebitnotecashSuccess,
  deleteDebitnotecashFailure,
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
  // Credit NOTE CASH +++++++++++++++++++++
  createCreditnotecashRequest,
  createCreditnotecashSuccess,
  createCreditnotecashFailure,
  getAllCreditnotecashRequest,
  getAllCreditnotecashSuccess,
  getAllCreditnotecashFailure,
  viewCreditnotecashRequest,
  viewCreditnotecashSuccess,
  viewCreditnotecashFailure,
  updateCreditnotecashRequest,
  updateCreditnotecashSuccess,
  updateCreditnotecashFailure,
  deleteCreditnotecashRequest,
  deleteCreditnotecashSuccess,
  deleteCreditnotecashFailure,
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
  // Notification ++++++++++
  getAllNotificationRequest,
  getAllNotificationSuccess,
  getAllNotificationFailure,
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
  UpdateemployeesalaryRequest,
  UpdateemployeesalarySuccess,
  UpdateemployeesalaryFailure,
  DeleteemployeesalaryRequest,
  DeleteemployeesalarySuccess,
  DeleteemployeesalaryFailure,
  fetchAllemployeesalaryRequest,
  fetchAllemployeesalarySuccess,
  fetchAllemployeesalaryFailure,
  // MAINTENANCE TYPE+++++++++++++
  CreateMaintenanceTypeRequest,
  CreateMaintenanceTypeSuccess,
  CreateMaintenanceTypeFailure,
  UpdateMaintenanceTypeRequest,
  UpdateMaintenanceTypeSuccess,
  UpdateMaintenanceTypeFailure,
  ViewsingleMaintenancetypeRequest,
  ViewsingleMaintenancetypeSuccess,
  ViewsingleMaintenancetypeFailure,
  fetchAllMaintenanceTypeRequest,
  fetchAllMaintenanceTypeSuccess,
  fetchAllMaintenanceTypeFailure,
  // MACHINE +++++++++++++++++++++++
  CreateMachineRequest,
  CreateMachineSuccess,
  CreateMachineFailure,
  fetchAllMachineRequest,
  fetchAllMachineSuccess,
  fetchAllMachineFailure,
  ViewsingleMachineRequest,
  ViewsingleMachineSuccess,
  ViewsingleMachineFailure,
  UpdateMachineRequest,
  UpdateMachineSuccess,
  UpdateMachineFailure,
  DeleteMachineRequest,
  DeleteMachineSuccess,
  DeleteMachineFailure,
  // MACHINE SCHEDULE+++++++++++++++++++++++
  CreateMachineScheduleRequest,
  CreateMachineScheduleSuccess,
  CreateMachineScheduleFailure,
  fetchAllMachineScheduleRequest,
  fetchAllMachineScheduleSuccess,
  fetchAllMachineScheduleFailure,
  ViewsingleMachineScheduleRequest,
  ViewsingleMachineScheduleSuccess,
  ViewsingleMachineScheduleFailure,
  UpdateMachineScheduleRequest,
  UpdateMachineScheduleSuccess,
  UpdateMachineScheduleFailure,
  DeleteMachineScheduleRequest,
  DeleteMachineScheduleSuccess,
  DeleteMachineScheduleFailure,
  // REGULAR MAINTENANCE ++++++++++++
  CreateRegularmaintenanceRequest,
  CreateRegularmaintenanceSuccess,
  CreateRegularmaintenanceFailure,
  fetchAllRegularmaintenanceRequest,
  fetchAllRegularmaintenanceSuccess,
  fetchAllRegularmaintenanceFailure,
  ViewsingleregularRequest,
  ViewsingleregularSuccess,
  ViewsingleregularFailure,
  UpdateRegularRequest,
  UpdateRegularSuccess,
  UpdateRegularFailure,
  DeleteRegularRequest,
  DeleteRegularSuccess,
  DeleteRegularFailure,
  // PREVENTIVE MAINTENANCE ++++++++++++
  CreatePreventiveRequest,
  CreatePreventiveSuccess,
  CreatePreventiveFailure,
  fetchAllPreventiveRequest,
  fetchAllPreventiveSuccess,
  fetchAllPreventiveFailure,
  ViewsinglepreventiveRequest,
  ViewsinglepreventiveSuccess,
  ViewsinglepreventiveFailure,
  UpdatePreventiveRequest,
  UpdatePreventiveSuccess,
  UpdatePreventiveFailure,
  DeletePreventiveRequest,
  DeletePreventiveSuccess,
  DeletePreventiveFailure,
  // BREACKDOWN MAINTENANCE ++++++++++++
  CreateBreakdownRequest,
  CreateBreakdownSuccess,
  CreateBreakdownFailure,
  fetchAllBreakdownRequest,
  fetchAllBreakdownSuccess,
  fetchAllBreakdownFailure,
  ViewsingleBreakdownRequest,
  ViewsingleBreakdownSuccess,
  ViewsingleBreakdownFailure,
  UpdateBreakdownRequest,
  UpdateBreakdownSuccess,
  UpdateBreakdownFailure,
  DeleteBreakdownRequest,
  DeleteBreakdownSuccess,
  DeleteBreakdownFailure,
  // PDF VENDOR BANK +++++++++++
  SalesCashPdfRequest,
  SalesCashPdfSuccess,
  SalesCashPdfFailure,
  PurchaseCashPdfRequest,
  PurchaseCashPdfSuccess,
  PurchaseCashPdfFailure,
  // DASHBORAD +++++++++++++++
  GetTotalPurchaseRequest,
  GetTotalPurchaseSuccess,
  GetTotalPurchaseFailure,
  GetTotalSalesRequest,
  GetTotalSalesSuccess,
  GetTotalSalesFailure,
  // ITEM GROUP +++++++++++++
  CreateItemGroupRequest,
  CreateItemGroupSuccess,
  CreateItemGroupFailure,
  fetchAllItemGroupRequest,
  fetchAllItemGroupSuccess,
  fetchAllItemGroupFailure,
  ViewItemGroupRequest,
  ViewItemGroupSuccess,
  ViewItemGroupFailure,
  UpdateItemGroupRequest,
  UpdateItemGroupSuccess,
  UpdateItemGroupFailure,
  DeleteItemGroupRequest,
  DeleteItemGroupSuccess,
  DeleteItemGroupFailure,
  // WASTAGE ++++++++++++
  CreateWastageRequest,
  CreateWastageSuccess,
  CreateWastageFailure,
  fetchAllWastageRequest,
  fetchAllWastageSuccess,
  fetchAllWastageFailure,
  ViewWastageRequest,
  ViewWastageSuccess,
  ViewWastageFailure,
  // ITEM Category +++++++++++++
  CreateItemCategoryRequest,
  CreateItemCategorySuccess,
  CreateItemCategoryFailure,
  fetchAllItemCategoryRequest,
  fetchAllItemCategorySuccess,
  fetchAllItemCategoryFailure,
  ViewItemCategoryRequest,
  ViewItemCategorySuccess,
  ViewItemCategoryFailure,
  UpdateItemCategoryRequest,
  UpdateItemCategorySuccess,
  UpdateItemCategoryFailure,
  DeleteItemCategoryRequest,
  DeleteItemCategorySuccess,
  DeleteItemCategoryFailure,
  getAllItemCategoryRequest,
  getAllItemCategorySuccess,
  getAllItemCategoryFailure,
  // LEDGER OPTIONS +++++++++++++
  fetchAllAccountOptionsRequest,
  fetchAllAccountOptionsSuccess,
  fetchAllAccountOptionsFailure,
  CreateAccountRequest,
  CreateAccountSuccess,
  CreateAccountFailure,
  ViewAccountRequest,
  ViewAccountSuccess,
  ViewAccountFailure,
  fetchAllAccountsRequest,
  fetchAllAccountsSuccess,
  fetchAllAccountsFailure,
  UpdateAccountRequest,
  UpdateAccountSuccess,
  UpdateAccountFailure,
  DeleteAccountRequest,
  DeleteAccountSuccess,
  DeleteAccountFailure,
  fetchAllAccountcashRequest,
  fetchAllAccountcashSuccess,
  fetchAllAccountcashFailure,
  // LEdger+++++++++++
  getAllAccountLedgerRequest,
  getAllAccountLedgerSuccess,
  getAllAccountLedgerFailure,
  getAllCashAccountLedgerRequest,
  getAllCashAccountLedgerSuccess,
  getAllCashAccountLedgerFailure,
  getAllCashbookLedgerRequest,
  getAllCashbookLedgerSuccess,
  getAllCashbookLedgerFailure,
  getAllDaybookLedgerRequest,
  getAllDaybookLedgerSuccess,
  getAllDaybookLedgerFailure,
  getAllCashDaybookLedgerRequest,
  getAllCashDaybookLedgerSuccess,
  getAllCashDaybookLedgerFailure,
  getWalletRequest,
  getWalletSuccess,
  getWalletFailure,
  approveWalletRequest,
  approveWalletSuccess,
  approveWalletFailure
} from './actions';
import { jwtDecode } from 'jwt-decode';
import { saveAs } from 'file-saver';
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
        }
      });
      dispatch(loginSuccess(userData));
      return userData;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
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
      dispatch(viewProformainvoiceFailure(error.message));
    }
  };
};
export const deleteProformainvoice = (id, navigate) => {
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
      dispatch(deleteProformainvoiceFailure());
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
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE ORDER ++++++++++++++++++++++++++++++++
export const createPurchaseOrder = (quotationData, navigate) => {
  return async (dispatch) => {
    dispatch(createPurchaseorderRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/purchaseOrder/create_purchaseOrder`, quotationData, config);
      const createdpurchaseorder = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/purchaseorderlist');
        }
      });
      dispatch(createPurchaseorderSuccess(createdpurchaseorder));
      return createdpurchaseorder;
    } catch (error) {
      dispatch(createPurchaseorderFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const updatePurchaseOrder = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updatePurchaseOrderRequst());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/purchaseOrder/update_purchaseOrder/${id}`, formData, config);
      const updatePrchaseOrderData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/purchaseorderlist');
        }
      });
      dispatch(updatePurchaseOrdersuccess(updatePrchaseOrderData));
      return updatePrchaseOrderData;
    } catch (error) {
      dispatch(updatePurchaseOrderfailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const deletePurchaseOrder = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deletePurchaseOrderRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/purchaseOrder/delete_purchaseOrder/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deletePurchaseOrderSuccess());
    } catch (error) {
      dispatch(deletePurchaseOrderFailure());
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
export const PurchaseorderView = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchaseOrderRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseOrder/view_single_purchaseOrder/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchaseOrderSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchaseOrderFailure(error.message));
    }
  };
};
export const fetchpurchaseorderList = () => {
  return async (dispatch) => {
    dispatch(fetchPurchaseOrderRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseOrder/get_all_purchaseOrder`, config);
      const data = await response.data.data;
      dispatch(fetchPurchaseOrderSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchPurchaseOrderFailure(error));
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
export const deleteDileveryChallan = (id, navigate) => {
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
export const DeleteProduct = (id, navigate) => {
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
export const paymentCashDelete = (id, navigate) => {
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
export const deleteSalesinvoice = (id, navigate) => {
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
      dispatch(deleteSalesinvoiceFailure());
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
export const deleteSalesinvoicecash = (id, navigate) => {
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
      dispatch(deleteSalesinvoicecashFailure());
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
export const deleteDebitnote = (id, navigate) => {
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
      dispatch(deleteDebitnoteFailure());
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEBIT NOTE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createDebitnotecash = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createDebitnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/debitnote/C_create_debitNote`, payload, config);
      const createDebitnotecash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/debitnotecashlist');
        }
      });
      dispatch(createDebitnotecashSuccess(createDebitnotecash));
      return createDebitnotecash;
    } catch (error) {
      dispatch(createDebitnotecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallDebitnotecash = () => {
  return async (dispatch) => {
    dispatch(getAllDebitnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/C_get_all_debitNote`, config);
      const getallDebitnotecash = response.data.data;
      dispatch(getAllDebitnotecashSuccess(getallDebitnotecash));
      return getallDebitnotecash;
    } catch (error) {
      dispatch(getAllDebitnotecashFailure(error.message));
    }
  };
};
export const Debitnotecashviewdata = (id) => {
  return async (dispatch) => {
    dispatch(viewDebitnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/C_view_single_debitNote/${id}`, config);
      const data = response.data.data;
      dispatch(viewDebitnotecashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewDebitnotecashFailure(error.message));
    }
  };
};
export const updateDebitnotecash = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateDebitnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/debitnote/C_update_debitNote/${id}`, payload, config);
      const updateDebitnotecashData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/debitnotecashlist');
        }
      });
      dispatch(updateDebitnotecashSuccess(updateDebitnotecashData));
      return updateDebitnotecashData;
    } catch (error) {
      dispatch(updateDebitnotecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteDebitnotecash = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteDebitnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/debitnote/C_delete_debitNote/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteDebitnotecashSuccess());
    } catch (error) {
      dispatch(deleteDebitnotecashFailure());
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
export const deleteCreditnote = (id, navigate) => {
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
      dispatch(deleteCreditnoteFailure());
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CREDIT NOTE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createCreditnotecash = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createCreditnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/creditnote/C_create_creditNote`, payload, config);
      const createCreditnotecash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/creditnotecashlist');
        }
      });
      dispatch(createCreditnotecashSuccess(createCreditnotecash));
      return createCreditnotecash;
    } catch (error) {
      dispatch(createCreditnotecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallCreditnotecash = () => {
  return async (dispatch) => {
    dispatch(getAllCreditnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/C_get_all_creditNote`, config);
      const getallCreditnotecash = response.data.data;
      dispatch(getAllCreditnotecashSuccess(getallCreditnotecash));
      return getallCreditnotecash;
    } catch (error) {
      dispatch(getAllCreditnotecashFailure(error.message));
    }
  };
};
export const Creditnotecashviewdata = (id) => {
  return async (dispatch) => {
    dispatch(viewCreditnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/C_view_single_creditNote/${id}`, config);
      const data = response.data.data;
      dispatch(viewCreditnotecashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewCreditnotecashFailure(error.message));
    }
  };
};
export const updateCreditnotecash = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateCreditnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/creditnote/C_update_creditNote/${id}`, payload, config);
      const updateCreditnotecashData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/creditnotecashlist');
        }
      });
      dispatch(updateCreditnotecashSuccess(updateCreditnotecashData));
      return updateCreditnotecashData;
    } catch (error) {
      dispatch(updateCreditnotecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteCreditnotecash = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteCreditnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/creditnote/C_delete_creditNote/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteCreditnotecashSuccess());
    } catch (error) {
      dispatch(deleteCreditnotecashFailure());
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
export const deletePurchaseinvoice = (id, navigate) => {
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
export const deletePurchaseInvoiceCash = (id, navigate) => {
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
      dispatch(deletePurchaseinvoiceCashFailure(error.message));
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
    }
  };
};
export const updatePermission = (data, navigate) => {
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
      if (error.response.status === 401) {
        navigate('/');
      }
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
export const deleteUser = (id, navigate) => {
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
      dispatch(deleteUserFailure(error.message));
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
      dispatch(CheckUserFailure(error.message));
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
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
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(addUserFailure(error.message));
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
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(CreateCompanyFailure(error.message));
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
      dispatch(ViewCompanyFailure(error.message));
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
    }
  };
};
export const deleteCompany = (id, navigate) => {
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
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(DeleteCompanyFailure(error.message));
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
      const decodedToken = jwtDecode(token);
      sessionStorage.setItem('companyId', decodedToken.companyId);
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
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(CreateCompanyBankFailure(error.message));
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
      dispatch(UpdateCompanyBankFailure(error.message));
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
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(ViewCompanyBankFailure(error.message));
    }
  };
};
export const deleteCompanyBank = (id, navigate) => {
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
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(DeleteCompanyBankFailure(error.message));
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
export const deleteRecieveCash = (id, navigate) => {
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
      dispatch(deleteRecieveCashFailure(error.message));
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
      if (error.response.status === 401) {
        navigate('/');
      }
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
    }
  };
};
export const viewSingleclaimCash = (id, navigate) => {
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
      if (error.response.status === 401) {
        navigate('/');
      }
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
export const deleteClaimCash = (id, navigate) => {
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
      dispatch(deleteClaimCashFailure(error.message));
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
    }
  };
};
export const IsStatusclaimCash = (id, toUserId, isApproved, navigate) => {
  return async (dispatch) => {
    dispatch(viewsingleClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/claim/isapproved_claim/${id}`, { toUserId, isApproved }, config);
      const data = response.data.data;
      dispatch(viewsingleClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewsingleClaimCashFailure(error.message));
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
      dispatch(fetchAllclaimcashledgerFailure(error.message));
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
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
export const viewSinglePaymentBank = (id, navigate) => {
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
      if (error.response.status === 401) {
        navigate('/');
      }
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
export const deletePaymentbank = (id, navigate) => {
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
      dispatch(deletepaymentbankFailure(error.message));
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
export const viewSinglePaymentRecieveBank = (id, navigate) => {
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
      if (error.response.status === 401) {
        navigate('/');
      }
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
export const deletePaymentRecievebank = (id, navigate) => {
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
      dispatch(deletepaymentrecievebankFailure(error.message));
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
export const viewSingleBom = (id, navigate) => {
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
      if (error.response.status === 401) {
        navigate('/');
      }
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
export const deleteBom = (id, navigate) => {
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
      dispatch(deleteBomFailure(error.message));
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
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Product STOKE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getAllStoke = (params = {}) => {
  return async (dispatch) => {
    dispatch(getAllStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/view_all_item_stock`, { ...config, params: params });
      const data = response.data.data;
      dispatch(getAllStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllStokeFailure(error.message));
    }
  };
};
export const viewSingleStoke = (id, navigate) => {
  return async (dispatch) => {
    dispatch(viewStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/view_item_stock/${id}`, config);
      const data = response.data.data;
      dispatch(viewStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewStokeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const updateStoke = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/stock/update_item_stock/${id}`, formData, config);
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Notification ++++++++++++++++++++++++++
export const getAllNotification = (value, navigate) => {
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
      if (error.response.status === 401) {
        navigate('/');
      }
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
export const createUserBank = (bankdetails, navigate) => {
  return async (dispatch) => {
    dispatch(CreateUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add_user_bank_account`, bankdetails, config);
      const Userbankdata = response;
      dispatch(CreateUserBankSuccess(Userbankdata));
      return Userbankdata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(CreateUserBankFailure(error.message));
    }
  };
};
export const updateUserBank = (accountId, formData, navigate) => {
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
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(UpdateUserBankFailure(error.message));
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
export const deleteUserBank = (id, navigate) => {
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
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(DeleteUserBankFailure(error.message));
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
      dispatch(CreateemployeesalaryFailure(error.message));
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
export const createMachine = (data, navigate) => {
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
      navigate('/machinelist');
      return addMachinedata;
    } catch (error) {
      dispatch(CreateMachineFailure(error.message));
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
export const updateMachine = (machineId, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateMachineRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/machine/update_machine/${machineId}`, formData, config);
      const updatemachinedata = response.data.data;
      dispatch(UpdateMachineSuccess(updatemachinedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/machinelist');
      return updatemachinedata;
    } catch (error) {
      dispatch(UpdateMachineFailure(error.message));
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
export const deleteMachine = (machineId, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteMachineRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/machine/delete_machine/${machineId}`, config);
      const deletemachinedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteMachineSuccess(deletemachinedata));
      return deletemachinedata;
    } catch (error) {
      dispatch(DeleteMachineFailure(error.message));
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++ MAINTENANCE TYPE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createMaintenancType = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateMaintenanceTypeRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/maintenanceType/create_maintenanceType`, data, config);
      const addMaintenancedata = response;
      dispatch(CreateMaintenanceTypeSuccess(addMaintenancedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return addMaintenancedata;
    } catch (error) {
      dispatch(CreateMaintenanceTypeFailure(error.message));
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
export const updateMaintenanceType = (MaintenanceTypeId, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateMaintenanceTypeRequest());
    try {
      const config = createConfig();
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/maintenanceType/update_maintenanceType/${MaintenanceTypeId}`,
        formData,
        config
      );
      const updateMaintenanceTypedata = response.data.data;
      dispatch(UpdateMaintenanceTypeSuccess(updateMaintenanceTypedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updateMaintenanceTypedata;
    } catch (error) {
      dispatch(UpdateMaintenanceTypeFailure(error.message));
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
export const MaintenanceTypeview = (machineId) => {
  return async (dispatch) => {
    dispatch(ViewsingleMaintenancetypeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/maintenanceType/view_single_maintenanceType/${machineId}`,
        config
      );
      const data = response.data.data;
      dispatch(ViewsingleMaintenancetypeSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewsingleMaintenancetypeFailure(error.message));
    }
  };
};

export const fetchAllMaintenanceType = () => {
  return async (dispatch) => {
    dispatch(fetchAllMaintenanceTypeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/maintenanceType/get_all_maintenanceType`, config);
      const data = response.data.data;
      dispatch(fetchAllMaintenanceTypeSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllMaintenanceTypeFailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MACHINE CREATE  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createMachineSchedule = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateMachineScheduleRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/schedule/create_machine_schedule`, data, config);
      const addMachinescheduledata = response;
      dispatch(CreateMachineScheduleSuccess(addMachinescheduledata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/machineschedulelist');
      return addMachinescheduledata;
    } catch (error) {
      dispatch(CreateMachineScheduleFailure(error.message));
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
export const fetchAllMachineSchedule = () => {
  return async (dispatch) => {
    dispatch(fetchAllMachineScheduleRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/schedule/view_all_machine_schedule`, config);
      const data = response.data.data;
      dispatch(fetchAllMachineScheduleSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllMachineScheduleFailure(error.message));
    }
  };
};
export const MachineScheduleview = (machineId) => {
  return async (dispatch) => {
    dispatch(ViewsingleMachineScheduleRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/schedule/view_machine_schedule/${machineId}`, config);
      const data = response.data.data;
      dispatch(ViewsingleMachineScheduleSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewsingleMachineScheduleFailure(error.message));
    }
  };
};
export const updateMachineSchedule = (machineId, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateMachineScheduleRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/schedule/update_machine_schedule/${machineId}`, formData, config);
      const updatemachineScheduledata = response.data.data;
      dispatch(UpdateMachineScheduleSuccess(updatemachineScheduledata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/machineschedulelist');
      return updatemachineScheduledata;
    } catch (error) {
      dispatch(UpdateMachineScheduleFailure(error.message));
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
export const deleteMachineSchedule = (machineId, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteMachineScheduleRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/schedule/delete_machine_schedule/${machineId}`, config);
      const deletemachineScheduledata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteMachineScheduleSuccess(deletemachineScheduledata));
      return deletemachineScheduledata;
    } catch (error) {
      dispatch(DeleteMachineScheduleFailure(error.message));
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ REGULAR MAINTENANCE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createregular = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateRegularmaintenanceRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/regularMaintenance/create_regular_maintenance`, data, config);
      const addregularmaintenancedata = response;
      dispatch(CreateRegularmaintenanceSuccess(addregularmaintenancedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/regularmaintenancelist');
      return addregularmaintenancedata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CreateRegularmaintenanceFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllregularMaintenance = () => {
  return async (dispatch) => {
    dispatch(fetchAllRegularmaintenanceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/regularMaintenance/view_all_regular_maintenance`, config);
      const data = response.data.data;
      dispatch(fetchAllRegularmaintenanceSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllRegularmaintenanceFailure(error.message));
    }
  };
};
export const Regularview = (id) => {
  return async (dispatch) => {
    dispatch(ViewsingleregularRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/regularMaintenance/view_one_regular_maintenance/${id}`, config);
      const data = response.data.data;
      dispatch(ViewsingleregularSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewsingleregularFailure(error.message));
    }
  };
};
export const updateRegular = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateRegularRequest());
    try {
      const config = createConfig();
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/regularMaintenance/update_regular_maintenance/${id}`,
        formData,
        config
      );
      const upadateregulardata = response.data.data;
      dispatch(UpdateRegularSuccess(upadateregulardata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/regularmaintenancelist');
      return upadateregulardata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(UpdateRegularFailure(error.message));
      throw error;
    }
  };
};
export const deleteRegular = (id) => {
  return async (dispatch) => {
    dispatch(DeleteRegularRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/regularMaintenance/delete_regular_maintenance/${id}`, config);
      const deleteregulardata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteRegularSuccess(deleteregulardata));
      return deleteregulardata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(DeleteRegularFailure(error.message));
      throw error;
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PREVENTIVE MAINTENANCE  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createpreventive = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreatePreventiveRequest());
    try {
      const config = createConfig();
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/preventiveMaintenance/create_preventive_maintenance`,
        data,
        config
      );
      const addpreventivemaintenancedata = response;
      dispatch(CreatePreventiveSuccess(addpreventivemaintenancedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/preventivemaintenancelist');
      return addpreventivemaintenancedata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CreatePreventiveFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllpreventiveMaintenance = () => {
  return async (dispatch) => {
    dispatch(fetchAllPreventiveRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/preventiveMaintenance/view_all_preventive_maintenance`, config);
      const data = response.data.data;
      dispatch(fetchAllPreventiveSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllPreventiveFailure(error.message));
    }
  };
};
export const Preventiveview = (id) => {
  return async (dispatch) => {
    dispatch(ViewsinglepreventiveRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/preventiveMaintenance/view_one_preventive_maintenance/${id}`,
        config
      );
      const data = response.data.data;
      dispatch(ViewsinglepreventiveSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewsinglepreventiveFailure(error.message));
    }
  };
};
export const updatePreventive = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdatePreventiveRequest());
    try {
      const config = createConfig();
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/preventiveMaintenance/update_preventive_maintenance/${id}`,
        formData,
        config
      );
      const upadatepreventivedata = response.data.data;
      dispatch(UpdatePreventiveSuccess(upadatepreventivedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/preventivemaintenancelist');
      return upadatepreventivedata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(UpdatePreventiveFailure(error.message));
      throw error;
    }
  };
};
export const deletePreventive = (id) => {
  return async (dispatch) => {
    dispatch(DeletePreventiveRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/preventiveMaintenance/delete_preventive_maintenance/${id}`,
        config
      );
      const deletepreventivedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeletePreventiveSuccess(deletepreventivedata));
      return deletepreventivedata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(DeletePreventiveFailure(error.message));
      throw error;
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BREACKDOWN MAINTENANCE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createbreackdown = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateBreakdownRequest());
    try {
      const config = createConfig();
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/breakdownMaintenance/create_breakdown_maintenance`,
        data,
        config
      );
      const addbreakdowndata = response;
      dispatch(CreateBreakdownSuccess(addbreakdowndata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/breakdownmaintenancelist');
      return addbreakdowndata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CreateBreakdownFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllbreackdownMaintenance = () => {
  return async (dispatch) => {
    dispatch(fetchAllBreakdownRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/breakdownMaintenance/view_all_breakdown_maintenance`, config);
      const data = response.data.data;
      dispatch(fetchAllBreakdownSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllBreakdownFailure(error.message));
    }
  };
};
export const Breakdownview = (id) => {
  return async (dispatch) => {
    dispatch(ViewsingleBreakdownRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/breakdownMaintenance/view_one_breakdown_maintenance/${id}`,
        config
      );
      const data = response.data.data;
      dispatch(ViewsingleBreakdownSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewsingleBreakdownFailure(error.message));
    }
  };
};
export const updateBreakdown = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateBreakdownRequest());
    try {
      const config = createConfig();
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/breakdownMaintenance/update_breakdown_maintenance/${id}`,
        formData,
        config
      );
      const upadateBreakdowndata = response.data.data;
      dispatch(UpdateBreakdownSuccess(upadateBreakdowndata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/breakdownmaintenancelist');
      return upadateBreakdowndata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(UpdateBreakdownFailure(error.message));
      throw error;
    }
  };
};
export const deleteBreakdown = (id) => {
  return async (dispatch) => {
    dispatch(DeleteBreakdownRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/breakdownMaintenance/delete_breakdown_maintenance/${id}`,
        config
      );
      const deleteBreakdowndata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteBreakdownSuccess(deleteBreakdowndata));
      return deleteBreakdowndata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(DeleteBreakdownFailure(error.message));
      throw error;
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Vendor pdf of bank +++++++++++++++++++++++++++++++++++++
export const SalesCashPDF = (id, navigate) => {
  return async (dispatch) => {
    dispatch(SalesCashPdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_view_salesInvoice_pdf/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      saveAs(blob, 'sales_cash.pdf');
      dispatch(SalesCashPdfSuccess(base64Data));
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(SalesCashPdfFailure(error.message));
    }
  };
};
export const PurchaseCashPDF = (id, navigate) => {
  return async (dispatch) => {
    dispatch(PurchaseCashPdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_view_purchaseCash_pdf/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      saveAs(blob, 'purchase_cash.pdf');
      dispatch(PurchaseCashPdfSuccess(base64Data));
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseCashPdfFailure(error.message));
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DASHBOARD API +++++++++++++++++++++++++++++++++++++
export const TotalSalesDashboard = () => {
  return async (dispatch) => {
    dispatch(GetTotalSalesRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard/total_sales`, config);
      const data = response.data.data;
      dispatch(GetTotalSalesSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(GetTotalSalesFailure(error.message));
    }
  };
};
export const TotalPurchaseDashboard = () => {
  return async (dispatch) => {
    dispatch(GetTotalPurchaseRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Dashboard/total_purchase`, config);
      const data = response.data.data;
      dispatch(GetTotalPurchaseSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(GetTotalPurchaseFailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ITEM GROUP +++++++++++++++++++++++++++++++++++++++++++++
export const createItemgroup = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateItemGroupRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/itemGroup/create_itemGroup`, data, config);
      const additemgroup = response;
      dispatch(CreateItemGroupSuccess(additemgroup));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return additemgroup;
    } catch (error) {
      dispatch(CreateItemGroupFailure(error.message));
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
export const fetchAllItemGroup = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllItemGroupRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemGroup/get_all_itemgroup`, { ...config, params: params });
      const data = response.data.data;
      dispatch(fetchAllItemGroupSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllItemGroupFailure(error.message));
    }
  };
};
export const ItemGroupview = (id) => {
  return async (dispatch) => {
    dispatch(ViewItemGroupRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemGroup/view_itemGroup/${id}`, config);
      const data = response.data.data;
      dispatch(ViewItemGroupSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewItemGroupFailure(error.message));
    }
  };
};
export const updateItemgroup = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateItemGroupRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/itemGroup/update_itemGroup/${id}`, data, config);
      const upadteItemGroupData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(UpdateItemGroupSuccess(upadteItemGroupData));
      return upadteItemGroupData;
    } catch (error) {
      dispatch(UpdateItemGroupFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const DeleteItemgroup = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteItemGroupRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/itemGroup/delete_itemGroup/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteItemGroupSuccess(data));
      return data;
    } catch (error) {
      dispatch(DeleteItemGroupFailure(error.message));
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ WASTAGE +++++++++++++++++++++++++++++++++++++++++++++
export const createWastage = (data) => {
  return async (dispatch) => {
    dispatch(CreateWastageRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/wastage/create_wastage`, data, config);
      const addWastage = response;
      dispatch(CreateWastageSuccess(addWastage));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return addWastage;
    } catch (error) {
      dispatch(CreateWastageFailure(error.message));
    }
  };
};
export const fetchAllWastage = () => {
  return async (dispatch) => {
    dispatch(fetchAllWastageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/wastage/get_all_wastage`, config);
      const data = response.data.data;
      dispatch(fetchAllWastageSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllWastageFailure(error.message));
    }
  };
};
export const Wastageview = (id) => {
  return async (dispatch) => {
    dispatch(ViewWastageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/wastage/view_single_wastage/${id}`, config);
      const data = response.data.data;
      dispatch(ViewWastageSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewWastageFailure(error.message));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ITEM CATEGORY +++++++++++++++++++++++++++++++++++++++++++++
export const createItemcategory = (data) => {
  return async (dispatch) => {
    dispatch(CreateItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/itemCategory/create_itemCategory`, data, config);
      const additemgroup = response;
      dispatch(CreateItemCategorySuccess(additemgroup));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return additemgroup;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CreateItemCategoryFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllItemcategory = (groupId) => {
  return async (dispatch) => {
    dispatch(fetchAllItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemCategory/get_all_itemCategoryGroup/${groupId}`, config);
      const data = response.data.data;
      dispatch(fetchAllItemCategorySuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllItemCategoryFailure(error.message));
    }
  };
};
export const ItemCategoryview = (id) => {
  return async (dispatch) => {
    dispatch(ViewItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemCategory/view_itemCategory/${id}`, config);
      const data = response.data.data;
      dispatch(ViewItemCategorySuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewItemCategoryFailure(error.message));
    }
  };
};
export const updateItemcategory = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/itemCategory/update_itemCategory/${id}`, data, config);
      const upadteItemCategoryData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(UpdateItemCategorySuccess(upadteItemCategoryData));
      return upadteItemCategoryData;
    } catch (error) {
      dispatch(UpdateItemCategoryFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const DeleteItemcategory = (id) => {
  return async (dispatch) => {
    dispatch(DeleteItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/itemCategory/delete_itemCategory/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteItemCategorySuccess(data));
      return data;
    } catch (error) {
      dispatch(DeleteItemCategoryFailure(error.message));
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
export const getAllcategory = (params = {}) => {
  return async (dispatch) => {
    dispatch(getAllItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemCategory/view_all_itemCategory`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(getAllItemCategorySuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllItemCategoryFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SELECT LEDGR GROUP +++++++++++++++++++++++++++++++++++++++++++++

export const fetchAllAccountOptions = () => {
  return async (dispatch) => {
    dispatch(fetchAllAccountOptionsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/view_all_account_group`, config);
      const data = response.data.data;
      dispatch(fetchAllAccountOptionsSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllAccountOptionsFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const createAccounts = (data) => {
  return async (dispatch) => {
    dispatch(CreateAccountRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/account/create_account`, data, config);
      const additemgroup = response;
      dispatch(CreateAccountSuccess(additemgroup));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return additemgroup;
    } catch (error) {
      dispatch(CreateAccountFailure(error.message));
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
export const viewAccount = (accountId) => {
  return async (dispatch) => {
    dispatch(ViewAccountRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/view_one_account/${accountId}`, config);
      const data = response.data.data;
      dispatch(ViewAccountSuccess(data));
      return data;
    } catch (error) {
      dispatch(ViewAccountFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.error);
      }
    }
  };
};
export const fetchAllAccounts = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllAccountsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/view_all_account?{search}=`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(fetchAllAccountsSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllAccountsFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const updateAccount = (accountId, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateAccountRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/account/update_account/${accountId}`, formData, config);
      const upadateAccountdata = response.data.data;
      dispatch(UpdateAccountSuccess(upadateAccountdata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/accountlist');
      return upadateAccountdata;
    } catch (error) {
      dispatch(UpdateAccountFailure(error.message));
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
export const deleteAccount = (accountId) => {
  return async (dispatch) => {
    dispatch(DeleteAccountRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/account/delete_account/${accountId}`, config);
      const deleteAccountdata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteAccountSuccess(deleteAccountdata));
      return deleteAccountdata;
    } catch (error) {
      dispatch(DeleteAccountFailure(error.message));
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
export const fetchAllAccountCash = () => {
  return async (dispatch) => {
    dispatch(fetchAllAccountcashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/C_view_all_account`, config);
      const data = response.data.data;
      dispatch(fetchAllAccountcashSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllAccountcashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++ ACCOUNT LEDGER +++++++++++++++++++++++++++++++++++++
export const getallAccountledger = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllAccountLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/account_ledger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallAccountledgerlist = response.data.data;
      dispatch(getAllAccountLedgerSuccess(getallAccountledgerlist));
      return getallAccountledgerlist;
    } catch (error) {
      dispatch(getAllAccountLedgerFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const getallCashAccountledger = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllCashAccountLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/C_account_ledger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallCashAccountledgerlist = response.data.data;
      dispatch(getAllCashAccountLedgerSuccess(getallCashAccountledgerlist));
      return getallCashAccountledgerlist;
    } catch (error) {
      dispatch(getAllCashAccountLedgerFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const getallDaybookledger = (formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllDaybookLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/ledger/daybook/?formDate=${formDate}&toDate=${toDate}`, config);
      const getallDaybookledgerlist = response.data.data;
      dispatch(getAllDaybookLedgerSuccess(getallDaybookledgerlist));
      return getallDaybookledgerlist;
    } catch (error) {
      dispatch(getAllDaybookLedgerFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const getallCashDaybookledger = (formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllCashDaybookLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/ledger/C_daybook/?formDate=${formDate}&toDate=${toDate}`, config);
      const getallCashDaybookledgerlist = response.data.data;
      dispatch(getAllCashDaybookLedgerSuccess(getallCashDaybookledgerlist));
      return getallCashDaybookledgerlist;
    } catch (error) {
      dispatch(getAllCashDaybookLedgerFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const getallCashbookledger = (formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllCashbookLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/C_cashbook/?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallCashbookledgerlist = response.data.data;
      dispatch(getAllCashbookLedgerSuccess(getallCashbookledgerlist));
      return getallCashbookledgerlist;
    } catch (error) {
      dispatch(getAllCashbookLedgerFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const getWallet = (id) => {
  return async (dispatch) => {
    dispatch(getWalletRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/view_wallet/${id}`, config);
      const getWalletlist = response.data.data;
      dispatch(getWalletSuccess(getWalletlist));
      return getWalletlist;
    } catch (error) {
      dispatch(getWalletFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const ApproveWallet = (id) => {
  return async (dispatch) => {
    dispatch(approveWalletRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/wallet_approve/${id}`, config);
      const approveWalletlist = response.data.data;
      dispatch(approveWalletSuccess(approveWalletlist));
      return approveWalletlist;
    } catch (error) {
      dispatch(approveWalletFailure(error.message));
      throw error;
    }
  };
};
