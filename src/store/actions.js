// action - account reducer
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const MENU_CLOSE = '@customization/MENU_CLOSE';
export const MENU_TYPE = '@customization/MENU_TYPE';

// ######################################## LOGIN #########################################################################
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// ######################################## PRO FORMA INVOICE #####################################################################
export const FETCH_PRO_FORMA_INVOICE_REQUEST = 'FETCH_PRO_FORMA_INVOICE_REQUEST';
export const FETCH_PRO_FORMA_INVOICE_SUCCESS = 'FETCH_PRO_FORMA_INVOICE_SUCCESS';
export const FETCH_PRO_FORMA_INVOICE_FAILURE = 'FETCH_PRO_FORMA_INVOICE_FAILURE';
export const CREATE_PRO_FORMA_INVOICE_REQUEST = 'CREATE_PRO_FORMA_INVOICE_REQUEST';
export const CREATE_PRO_FORMA_INVOICE_SUCCESS = 'CREATE_PRO_FORMA_INVOICE_SUCCESS';
export const CREATE_PRO_FORMA_INVOICE_FAILURE = 'CREATE_PRO_FORMA_INVOICE_FAILURE';
export const DELETE_PRO_FORMA_INVOICE_ITEM_REQUEST = 'DELETE_PRO_FORMA_INVOICE_ITEM_REQUEST';
export const DELETE_PRO_FORMA_INVOICE_ITEM_SUCCESS = 'DELETE_PRO_FORMA_INVOICE_ITEM_SUCCESS';
export const DELETE_PRO_FORMA_INVOICE_ITEM_FAILURE = 'DELETE_PRO_FORMA_INVOICE_ITEM_FAILURE';
export const DELETE_PRO_FORMA_INVOICE_REQUEST = 'DELETE_PRO_FORMA_INVOICE_REQUEST';
export const DELETE_PRO_FORMA_INVOICE_SUCCESS = 'DELETE_PRO_FORMA_INVOICE_SUCCESS';
export const DELETE_PRO_FORMA_INVOICE_FAILURE = 'DELETE_PRO_FORMA_INVOICE_FAILURE';
export const UPDATE_PRO_FORMA_INVOICE_REQUEST = 'UPDATE_PRO_FORMA_INVOICE_REQUEST';
export const UPDATE_PRO_FORMA_INVOICE_SUCCESS = 'UPDATE_PRO_FORMA_INVOICE_SUCCESS';
export const UPDATE_PRO_FORMA_INVOICE_FAILURE = 'UPDATE_PRO_FORMA_INVOICE_FAILURE';
export const VIEW_PRO_FORMA_INVOICE_REQUEST = 'VIEW_PRO_FORMA_INVOICE_REQUEST';
export const VIEW_PRO_FORMA_INVOICE_SUCCESS = 'VIEW_PRO_FORMA_INVOICE_SUCCESS';
export const VIEW_PRO_FORMA_INVOICE_FAILURE = 'VIEW_PRO_FORMA_INVOICE_FAILURE';

// ########################################## PRODUCT ###############################################################################################
export const FETCH_ALL_PRODUCTS_REQUEST = 'FETCH_ALL_PRODUCTS_REQUEST';
export const FETCH_ALL_PRODUCTS_SUCCESS = 'FETCH_ALL_PRODUCTS_SUCCESS';
export const FETCH_ALL_PRODUCTS_FAILURE = 'FETCH_ALL_PRODUCTS_FAILURE';
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

// ########################################## CUSTOMER ###############################################################################################
export const FETCH_ALL_CUSTOMERS_REQUEST = 'FETCH_ALL_CUSTOMERS_REQUEST';
export const FETCH_ALL_CUSTOMERS_SUCCESS = 'FETCH_ALL_CUSTOMERS_SUCCESS';
export const FETCH_ALL_CUSTOMERS_FAILURE = 'FETCH_ALL_CUSTOMERS_FAILURE';
export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_FAILURE = 'CREATE_CUSTOMER_FAILURE';
export const CREATE_CUSTOM_FEILD_REQUEST = 'CREATE_CUSTOM_FEILD_REQUEST';
export const CREATE_CUSTOM_FEILD_SUCCESS = 'CREATE_CUSTOM_FEILD_SUCCESS';
export const CREATE_CUSTOM_FEILD_FAILURE = 'CREATE_CUSTOM_FEILD_FAILURE';

// ########################################## DELIVERY CHALLAN ###############################################################################################
export const CREATE_DELIVERY_CHALLAN_REQUEST = 'CREATE_DELIVERY_CHALLAN_REQUEST';
export const CREATE_DELIVERY_CHALLAN_SUCCESS = 'CREATE_DELIVERY_CHALLAN_SUCCESS';
export const CREATE_DELIVERY_CHALLAN_FAILURE = 'CREATE_DELIVERY_CHALLAN_FAILURE';
export const CREATE_DELIVERY__ITEM_REQUEST = 'CREATE_DELIVERY__ITEM_REQUEST';
export const CREATE_DELIVERY__ITEM_SUCCESS = 'CREATE_DELIVERY__ITEM_SUCCESS';
export const CREATE_DELIVERY__ITEM_FAILURE = 'CREATE_DELIVERY__ITEM_FAILURE';
export const FETCH_ALL_DELIVERYCHALLAN_REQUEST = 'FETCH_ALL_DELIVERYCHALLAN_REQUEST';
export const FETCH_ALL_DELIVERYCHALLAN_SUCCESS = 'FETCH_ALL_DELIVERYCHALLAN_SUCCESS';
export const FETCH_ALL_DELIVERYCHALLAN_FAILURE = 'FETCH_ALL_DELIVERYCHALLAN_FAILURE';
export const VIEW_DELIVERYCHALLAN_REQUEST = 'VIEW_DELIVERYCHALLAN_REQUEST';
export const VIEW_DELIVERYCHALLAN_SUCCESS = 'VIEW_DELIVERYCHALLAN_SUCCESS';
export const VIEW_DELIVERYCHALLAN_FAILURE = 'VIEW_DELIVERYCHALLAN_FAILURE';
export const UPDATE_DILEVERYCHALLAN_REQUEST = 'UPDATE_DILEVERYCHALLAN_REQUEST';
export const UPDATE_DILEVERYCHALLAN_SUCCESS = 'UPDATE_DILEVERYCHALLAN_SUCCESS';
export const UPDATE_DILEVERYCHALLAN_FAILURE = 'UPDATE_DILEVERYCHALLAN_FAILURE';
export const UPDATE_DILEVERYCHALLAN_ITEM_REQUEST = 'UPDATE_DILEVERYCHALLAN_ITEM_REQUEST';
export const UPDATE_DILEVERYCHALLAN_ITEM_SUCCESS = 'UPDATE_DILEVERYCHALLAN_ITEM_SUCCESS';
export const UPDATE_DILEVERYCHALLAN_ITEM_FAILURE = 'UPDATE_DILEVERYCHALLAN_ITEM_FAILURE';
export const DELETE_DILEVERYCHALLAN_ITEM_REQUEST = 'DELETE_DILEVERYCHALLAN_ITEM_REQUEST';
export const DELETE_DILEVERYCHALLAN_ITEM_SUCCESS = 'DELETE_DILEVERYCHALLAN_ITEM_SUCCESS';
export const DELETE_DILEVERYCHALLAN_ITEM_FAILURE = 'DELETE_DILEVERYCHALLAN_ITEM_FAILURE';

// ########################################## PAYMENT ###############################################################################################
export const CREATE_PAYMENT_REQUEST = 'CREATE_PAYMENT_REQUEST';
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_FAILURE = 'CREATE_PAYMENT_FAILURE';
export const GET_ALL_PAYMENT_REQUEST = 'GET_ALL_PAYMENT_REQUEST';
export const GET_ALL_PAYMENT_SUCCESS = 'GET_ALL_PAYMENT_SUCCESS';
export const GET_ALL_PAYMENT_FAILURE = 'GET_ALL_PAYMENT_FAILURE';
export const VIEW_PAYMENT_REQUEST = 'VIEW_PAYMENT_REQUEST';
export const VIEW_PAYMENT_SUCCESS = 'VIEW_PAYMENT_SUCCESS';
export const VIEW_PAYMENT_FAILURE = 'VIEW_PAYMENT_FAILURE';
export const UPDATE_PAYMENT_REQUEST = 'UPDATE_PAYMENT_REQUEST';
export const UPDATE_PAYMENT_SUCCESS = 'UPDATE_PAYMENT_SUCCESS';
export const UPDATE_PAYMENT_FAILURE = 'UPDATE_PAYMENT_FAILURE';

// ########################################## SALES INVOICE ###############################################################################################
export const CREATE_SALES_INVOICE_REQUEST = 'CREATE_SALES_INVOICE_REQUEST';
export const CREATE_SALES_INVOICE_SUCCESS = 'CREATE_SALES_INVOICE_SUCCESS';
export const CREATE_SALES_INVOICE_FAILURE = 'CREATE_SALES_INVOICE_FAILURE';
export const DELETE_SALES_INVOICE_REQUEST = 'DELETE_SALES_INVOICE_REQUEST';
export const DELETE_SALES_INVOICE_SUCCESS = 'DELETE_SALES_INVOICE_SUCCESS';
export const DELETE_SALES_INVOICE_FAILURE = 'DELETE_SALES_INVOICE_FAILURE';
export const CREATE_SALESINVOICE_ITEM_REQUEST = 'CREATE_SALESINVOICE_ITEM_REQUEST';
export const CREATE_SALESINVOICE_ITEM_SUCCESS = 'CREATE_SALESINVOICE_ITEM_SUCCESS';
export const CREATE_SALESINVOICE_ITEM_FAILURE = 'CREATE_SALESINVOICE_ITEM_FAILURE';
export const FETCH_ALL_SALESINVOICE_REQUEST = 'FETCH_ALL_SALESINVOICE_REQUEST';
export const FETCH_ALL_SALESINVOICE_SUCCESS = 'FETCH_ALL_SALESINVOICE_SUCCESS';
export const FETCH_ALL_SALESINVOICE_FAILURE = 'FETCH_ALL_SALESINVOICE_FAILURE';
export const VIEW_SALESINVOICE_REQUEST = 'VIEW_SALESINVOICE_REQUEST';
export const VIEW_SALESINVOICE_SUCCESS = 'VIEW_SALESINVOICE_SUCCESS';
export const VIEW_SALESINVOICE_FAILURE = 'VIEW_SALESINVOICE_FAILURE';

// ########################################## PURCHASE ###############################################################################################
export const VIEW_PURCHASE_REQUEST = 'VIEW_PURCHASE_REQUEST';
export const VIEW_PURCHASE_SUCCESS = 'VIEW_PURCHASE_SUCCESS';
export const VIEW_PURCHASE_FAILURE = 'VIEW_PURCHASE_FAILURE';
export const CREATE_PURCHASE_REQUEST = 'CREATE_PURCHASE_REQUEST';
export const CREATE_PURCHASE_SUCCESS = 'CREATE_PURCHASE_SUCCESS';
export const CREATE_PURCHASE_FAILURE = 'CREATE_PURCHASE_FAILURE';
export const CREATE_PURCHASE_ITEM_REQUEST = 'CREATE_PURCHASE_ITEM_REQUEST';
export const CREATE_PURCHASE_ITEM_SUCCESS = 'CREATE_PURCHASE_ITEM_SUCCESS';
export const CREATE_PURCHASE_ITEM_FAILURE = 'CREATE_PURCHASE_ITEM_FAILURE';
export const UPDATE_PURCHASE_REQUEST = 'UPDATE_PURCHASE_REQUEST';
export const UPDATE_PURCHASE_SUCCESS = 'UPDATE_PURCHASE_SUCCESS';
export const UPDATE_PURCHASE_FAILURE = 'UPDATE_PURCHASE_FAILURE';
export const UPDATE_PURCHASE_ITEM_REQUEST = 'UPDATE_PURCHASE_ITEM_REQUEST';
export const UPDATE_PURCHASE_ITEM_SUCCESS = 'UPDATE_PURCHASE_ITEM_SUCCESS';
export const UPDATE_PURCHASE_ITEM_FAILURE = 'UPDATE_PURCHASE_ITEM_FAILURE';
export const DELETE_PURCHASE_ITEM_REQUEST = 'DELETE_PURCHASE_ITEM_REQUEST';
export const DELETE_PURCHASE_ITEM_SUCCESS = 'DELETE_PURCHASE_ITEM_SUCCESS';
export const DELETE_PURCHASE_ITEM_FAILURE = 'DELETE_PURCHASE_ITEM_FAILURE';
export const FETCH_ALL_PURCHASE_REQUEST = 'FETCH_ALL_PURCHASE_REQUEST';
export const FETCH_ALL_PURCHASE_SUCCESS = 'FETCH_ALL_PURCHASE_SUCCESS';
export const FETCH_ALL_PURCHASE_FAILURE = 'FETCH_ALL_PURCHASE_FAILURE';

// ########################################## EXPENSE ###############################################################################################
export const CREATE_EXPENCE_REQUEST = 'CREATE_EXPENCE_REQUEST';
export const CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS';
export const CREATE_EXPENCE_FAILURE = 'CREATE_EXPENSE_FAILURE';
export const CREATE_EXPENSE_ITEM_REQUEST = 'CREATE_EXPENSE_ITEM_REQUEST';
export const CREATE_EXPENSE_ITEM_SUCCESS = 'CREATE_EXPENSE_ITEM_SUCCESS';
export const CREATE_EXPENSE_ITEM_FAILURE = 'CREATE_EXPENSE_ITEM_FAILURE';
export const UPDATE_EXPENCE_REQUEST = 'UPDATE_EXPENCE_REQUEST';
export const UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS';
export const UPDATE_EXPENCE_FAILURE = 'UPDATE_EXPENSE_FAILURE';
export const UPDATE_EXPENSE_ITEM_REQUEST = 'UPDATE_EXPENSE_ITEM_REQUEST';
export const UPDATE_EXPENSE_ITEM_SUCCESS = 'UPDATE_EXPENSE_ITEM_SUCCESS';
export const UPDATE_EXPENSE_ITEM_FAILURE = 'UPDATE_EXPENSE_ITEM_FAILURE';
export const FETCH_ALL_EXPENSE_REQUEST = 'FETCH_ALL_EXPENSE_REQUEST';
export const FETCH_ALL_EXPENSE_SUCCESS = 'FETCH_ALL_EXPENSE_SUCCESS';
export const FETCH_ALL_EXPENSE_FAILURE = 'FETCH_ALL_EXPENSE_FAILURE';
export const VIEW_EXPENSE_REQUEST = 'VIEW_EXPENSE_REQUEST';
export const VIEW_EXPENSE_SUCCESS = 'VIEW_EXPENSE_SUCCESS';
export const VIEW_EXPENSE_FAILURE = 'VIEW_EXPENSE_FAILURE';
export const DELETE_EXPENSE_ITEM_REQUEST = 'DELETE_EXPENSE_ITEM_REQUEST';
export const DELETE_EXPENSE_ITEM_SUCCESS = 'DELETE_EXPENSE_ITEM_SUCCESS';
export const DELETE_EXPENSE_ITEM_FAILURE = 'DELETE_EXPENSE_ITEM_FAILURE';

// ########################################## PURCHASE BILL ###############################################################################################
export const FETCH_ALL_PURCHASEBILL_REQUEST = 'FETCH_ALL_PURCHASEBILL_REQUEST';
export const FETCH_ALL_PURCHASEBILL_SUCCESS = 'FETCH_ALL_PURCHASEBILL_SUCCESS';
export const FETCH_ALL_PURCHASEBILL_FAILURE = 'FETCH_ALL_PURCHASEBILL_FAILURE';
export const VIEW_PURCHASEBILL_REQUEST = 'VIEW_PURCHASEBILL_REQUEST';
export const VIEW_PURCHASEBILL_SUCCESS = 'VIEW_PURCHASEBILL_SUCCESS';
export const VIEW_PURCHASEBILL_FAILURE = 'VIEW_PURCHASEBILL_FAILURE';
export const CREATE_PURCHASEBILL_REQUEST = 'CREATE_PURCHASEBILL_REQUEST';
export const CREATE_PURCHASEBILL_SUCCESS = 'CREATE_PURCHASEBILL_SUCCESS';
export const CREATE_PURCHASEBILL_FAILURE = 'CREATE_PURCHASEBILL_FAILURE';
export const CREATE_PURCHASEBILL_ITEM_REQUEST = 'CREATE_PURCHASEBILL_ITEM_REQUEST';
export const CREATE_PURCHASEBILL_ITEM_SUCCESS = 'CREATE_PURCHASEBILL_ITEM_SUCCESS';
export const CREATE_PURCHASEBILL_ITEM_FAILURE = 'CREATE_PURCHASEBILL_ITEM_FAILURE';

// ########################################## PURCHASE RETURN ###############################################################################################
export const FETCH_ALL_PURCHASERETURN_REQUEST = 'FETCH_ALL_PURCHASERETURN_REQUEST';
export const FETCH_ALL_PURCHASERETURN_SUCCESS = 'FETCH_ALL_PURCHASERETURN_SUCCESS';
export const FETCH_ALL_PURCHASERETURN_FAILURE = 'FETCH_ALL_PURCHASERETURN_FAILURE';
export const VIEW_PURCHASERETURN_REQUEST = 'VIEW_PURCHASERETURN_REQUEST';
export const VIEW_PURCHASERETURN_SUCCESS = 'VIEW_PURCHASERETURN_SUCCESS';
export const VIEW_PURCHASERETURN_FAILURE = 'VIEW_PURCHASEBILL_FAILURE';

// #################################################################### PERMISSIONS ###################################################################
export const FETCH_ALL_PERMISSIONS_REQUEST = 'FETCH_ALL_PERMISSIONS_REQUEST';
export const FETCH_ALL_PERMISSIONS_SUCCESS = 'FETCH_ALL_PERMISSIONS_SUCCESS';
export const FETCH_ALL_PERMISSIONS_FAILURE = 'FETCH_ALL_PERMISSIONS_FAILURE';

export const UPDATE_PERMISSIONS_REQUEST = 'UPDATE_PERMISSIONS_REQUEST';
export const UPDATE_PERMISSIONS_SUCCESS = 'UPDATE_PERMISSIONS_SUCCESS';
export const UPDATE_PERMISSIONS_FAILURE = 'UPDATE_PERMISSIONS_FAILURE';

// ############################################################### USER #######################################################################

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const GET_ALL_USER_REQUEST = 'GET_ALL_USER_REQUEST';
export const GET_ALL_USER_SUCCESS = 'GET_ALL_USER_SUCCESS';
export const GET_ALL_USER_FAILURE = 'GET_ALL_USER_FAILURE';
export const VIEW_USER_REQUEST = 'VIEW_USER_REQUEST';
export const VIEW_USER_SUCCESS = 'VIEW_USER_SUCCESS';
export const VIEW_USER_FAILURE = 'VIEW_USER_FAILURE';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

// ########################################################################### VENDOR ###############################################################

export const CREATE_VENDOR_REQUEST = 'CREATE_VENDOR_REQUEST';
export const CREATE_VENDOR_SUCCESS = 'CREATE_VENDOR_SUCCESS';
export const CREATE_VENDOR_FAILURE = 'CREATE_VENDOR_FAILURE';
export const FETCH_ALL_VENDORS_REQUEST = 'FETCH_ALL_VENDORS_REQUEST';
export const FETCH_ALL_VENDORS_SUCCESS = 'FETCH_ALL_VENDORS_SUCCESS';
export const FETCH_ALL_VENDORS_FAILURE = 'FETCH_ALL_VENDORS_FAILURE';

// ###################################################################### COMPANY #####################################################################
export const FETCH_ALL_COMPANY_REQUEST = 'FETCH_ALL_COMPANY_REQUEST';
export const FETCH_ALL_COMPANY_SUCCESS = 'FETCH_ALL_COMPANY_SUCCESS';
export const FETCH_ALL_COMPANY_FAILURE = 'FETCH_ALL_COMPANY_FAILURE';

// ###################################################################### LOGIN #####################################################################
export const loginRequest = () => ({
  type: 'LOGIN_REQUEST'
});
export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user
});
export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error
});
export const logoutRequest = () => ({
  type: 'LOGOUT_REQUEST'
});
export const logoutSuccess = (user) => ({
  type: 'LOGOUT_SUCCESS',
  payload: user
});
export const logoutFailure = (error) => ({
  type: 'LOGOUT_FAILURE',
  payload: error
});
// #################################################################### PRO_FORMA_INVOICE ###################################################################################
export const fetchProformainvoiceRequest = () => ({
  type: 'FETCH_PRO_FORMA_INVOICE_REQUEST'
});
export const fetchProformainvoiceSuccess = (data) => ({
  type: 'FETCH_PRO_FORMA_INVOICE_SUCCESS',
  payload: data
});
export const fetchProformainvoiceFailure = (error) => ({
  type: 'FETCH_PRO_FORMA_INVOICE_FAILURE',
  payload: error
});
export const createProformainvoiceRequest = () => ({
  type: 'CREATE_PRO_FORMA_INVOICE_REQUEST'
});
export const createProformainvoiceSuccess = (data) => ({
  type: 'CREATE_PRO_FORMA_INVOICE_SUCCESS',
  payload: data
});
export const createProformainvoiceFailure = (error) => ({
  type: 'CREATE_PRO_FORMA_INVOICE_FAILURE',
  payload: error
});
export const deleteProformainvoiceItemRequest = (data) => ({
  type: 'DELETE_PRO_FORMA_INVOICE_ITEM_REQUEST',
  payload: data
});
export const deleteProformainvoiceItemSuccess = (data) => ({
  type: 'DELETE_PRO_FORMA_INVOICE_ITEM_SUCCESS',
  payload: data
});
export const deleteProformainvoiceItemFailure = (error) => ({
  type: 'DELETE_PRO_FORMA_INVOICE_ITEM_FAILURE',
  payload: error
});
export const deleteProformainvoiceRequest = (data) => ({
  type: 'DELETE_PRO_FORMA_INVOICE_REQUEST',
  payload: data
});
export const deleteProformainvoiceSuccess = (data) => ({
  type: 'DELETE_PRO_FORMA_INVOICE_SUCCESS',
  payload: data
});
export const deleteProformainvoiceFailure = (error) => ({
  type: 'DELETE_PRO_FORMA_INVOICE_FAILURE',
  payload: error
});
export const viewProformainvoiceRequest = (data) => ({
  type: 'VIEW_PRO_FORMA_INVOICE_REQUEST',
  payload: data
});
export const viewProformainvoiceSuccess = (data) => ({
  type: 'VIEW_PRO_FORMA_INVOICE_SUCCESS',
  payload: data
});
export const viewProformainvoiceFailure = (error) => ({
  type: 'VIEW_PRO_FORMA_INVOICE_FAILURE',
  payload: error
});
export const updateProformainvoiceRequst = (data) => ({
  type: 'UPDATE_PRO_FORMA_INVOICE_REQUEST',
  payload: data
});
export const updateProformainvoicesuccess = (data) => ({
  type: 'UPDATE_PRO_FORMA_INVOICE_SUCCESS',
  payload: data
});
export const updateProformainvoicefailure = (error) => ({
  type: 'UPDATE_PRO_FORMA_INVOICE_FAILURE',
  payload: error
});

// ################################################################ CUSTOMERS ##################################################################################
export const fetchAllCustomersRequest = () => ({
  type: 'FETCH_ALL_CUSTOMERS_REQUEST'
});
export const fetchAllCustomersSuccess = (data) => ({
  type: 'FETCH_ALL_CUSTOMERS_SUCCESS',
  payload: data
});
export const fetchAllCustomersFailure = (error) => ({
  type: 'FETCH_ALL_CUSTOMERS_FAILURE',
  payload: error
});
export const createCustomerRequest = (data) => ({
  type: 'CREATE_CUSTOMER_REQUEST',
  payload: data
});
export const createCustomerSuccess = (data) => ({
  type: 'CREATE_CUSTOMER_SUCCESS',
  payload: data
});
export const createCustomerFailure = (error) => ({
  type: 'CREATE_CUSTOMER_FAILURE',
  payload: error
});
export const createCustomFeildRequest = (data) => ({
  type: 'CREATE_CUSTOM_FEILD_REQUEST',
  payload: data
});
export const createCustomFeildSuccess = (data) => ({
  type: 'CREATE_CUSTOM_FEILD_SUCCESS',
  payload: data
});
export const createCustomFeildFailure = (error) => ({
  type: 'CREATE_CUSTOM_FEILD_FAILURE',
  payload: error
});

// ################################################################ DELIVERY CHALLAN ################################################################################
export const createDeliveryChallanRequest = (data) => ({
  type: 'CREATE_DELIVERY_CHALLAN_REQUEST',
  payload: data
});
export const createDeliveryChallanSuccess = (data) => ({
  type: 'CREATE_DELIVERY_CHALLAN_SUCCESS',
  payload: data
});
export const createDeliveryChallanFailure = (error) => ({
  type: 'CREATE_DELIVERY_CHALLAN_FAILURE',
  payload: error
});
export const createDeliveryChallanItemRequest = (data) => ({
  type: 'CREATE_DELIVERY__ITEM_REQUEST',
  payload: data
});
export const createDeliveryChallanItemSuccess = (data) => ({
  type: 'CREATE_DELIVERY__ITEM_SUCCESS',
  payload: data
});
export const createDeliveryChallanItemFailure = (error) => ({
  type: 'CREATE_DELIVERY__ITEM_FAILURE',
  payload: error
});
export const getAllDeliverychallanRequest = (data) => ({
  type: 'FETCH_ALL_DELIVERYCHALLAN_REQUEST',
  payload: data
});
export const getAllDeliverychallanSuccess = (data) => ({
  type: 'FETCH_ALL_DELIVERYCHALLAN_SUCCESS',
  payload: data
});
export const getAllDeliverychallanFailure = (error) => ({
  type: 'FETCH_ALL_DELIVERYCHALLAN_FAILURE',
  payload: error
});
export const viewDeliverychallanRequest = (data) => ({
  type: 'VIEW_DELIVERYCHALLAN_REQUEST',
  payload: data
});
export const viewDeliverychallanSuccess = (data) => ({
  type: 'VIEW_DELIVERYCHALLAN_SUCCESS',
  payload: data
});
export const viewDeliverychallanFailure = (error) => ({
  type: 'VIEW_DELIVERYCHALLAN_FAILURE',
  payload: error
});
export const updateDileverychallanRequest = (data) => ({
  type: 'UPDATE_DILEVERYCHALLAN_REQUEST',
  payload: data
});
export const updateDileverychallanSuccess = (data) => ({
  type: 'UPDATE_DILEVERYCHALLAN_SUCCESS',
  payload: data
});
export const updateDileverychallanFailure = (error) => ({
  type: 'UPDATE_DILEVERYCHALLAN_FAILURE',
  payload: error
});
export const updateDileverychallanItemRequest = (data) => ({
  type: 'UPDATE_DILEVERYCHALLAN_ITEM_REQUEST',
  payload: data
});
export const updateDileverychallanItemSuccess = (data) => ({
  type: 'UPDATE_DILEVERYCHALLAN_ITEM_SUCCESS',
  payload: data
});
export const updateDileverychallanItemFailure = (error) => ({
  type: 'UPDATE_DILEVERYCHALLAN_ITEM_FAILURE',
  payload: error
});
export const deleteDileverychallanItemRequest = (data) => ({
  type: 'DELETE_DILEVERYCHALLAN_ITEM_REQUEST',
  payload: data
});
export const deleteDileverychallanItemSuccess = (data) => ({
  type: 'DELETE_DILEVERYCHALLAN_ITEM_SUCCESS',
  payload: data
});
export const deleteDileverychallanItemFailure = (error) => ({
  type: 'DELETE_DILEVERYCHALLAN_ITEM_FAILURE',
  payload: error
});

// ################################################################ PAYMENT ##########################################################################################
export const createPaymentRequest = (data) => ({
  type: 'CREATE_PAYMENT_REQUEST',
  payload: data
});
export const createPaymentSuccess = (data) => ({
  type: 'CREATE_PAYMENT_SUCCESS',
  payload: data
});
export const createPaymentFailure = (error) => ({
  type: 'CREATE_PAYMENT_FAILURE',
  payload: error
});
export const getallPaymentRequest = (data) => ({
  type: 'GET_ALL_PAYMENT_REQUEST',
  payload: data
});
export const getallPaymentSuccess = (data) => ({
  type: 'GET_ALL_PAYMENT_SUCCESS',
  payload: data
});
export const getallPaymentFailure = (error) => ({
  type: 'GET_ALL_PAYMENT_FAILURE',
  payload: error
});
export const viewPaymentRequest = (data) => ({
  type: 'VIEW_PAYMENT_REQUEST',
  payload: data
});
export const viewPaymentSuccess = (data) => ({
  type: 'VIEW_PAYMENT_SUCCESS',
  payload: data
});
export const viewPaymentFailure = (error) => ({
  type: 'VIEW_PAYMENT_FAILURE',
  payload: error
});
export const updatePaymentRequest = (data) => ({
  type: 'UPDATE_PAYMENT_REQUEST',
  payload: data
});
export const updatePaymentSuccess = (data) => ({
  type: 'UPDATE_PAYMENT_SUCCESS',
  payload: data
});
export const updatePaymentFailure = (error) => ({
  type: 'UPDATE_PAYMENT_FAILURE',
  payload: error
});

// ##################################################################################### SALES INVOICE ################################################################

export const createSalesinvoiceRequest = (data) => ({
  type: 'CREATE_SALES_INVOICE_REQUEST',
  payload: data
});
export const createSalesinvoiceSuccess = (data) => ({
  type: 'CREATE_SALES_INVOICE_SUCCESS',
  payload: data
});
export const createSalesinvoiceFailure = (error) => ({
  type: 'CREATE_SALES_INVOICE_FAILURE',
  payload: error
});
export const deleteSalesinvoiceRequest = (data) => ({
  type: 'DELETE_SALES_INVOICE_REQUEST',
  payload: data
});
export const deleteSalesinvoiceSuccess = (data) => ({
  type: 'DELETE_SALES_INVOICE_SUCCESS',
  payload: data
});
export const deleteSalesinvoiceFailure = (error) => ({
  type: 'DELETE_SALES_INVOICE_FAILURE',
  payload: error
});
export const updateSalesinvoiceRequest = (data) => ({
  type: 'UPDATE_SALESINVOICE_REQUEST',
  payload: data
});
export const updateSalesinvoiceSuccess = (data) => ({
  type: 'UPDATE_SALESINVOICE_SUCCESS',
  payload: data
});
export const updateSalesinvoiceFailure = (error) => ({
  type: 'UPDATE_SALESINVOICE_FAILURE',
  payload: error
});
export const getAllSalesinvoiceRequest = (data) => ({
  type: 'FETCH_ALL_SALESINVOICE_REQUEST',
  payload: data
});
export const getAllSalesinvoiceSuccess = (data) => ({
  type: 'FETCH_ALL_SALESINVOICE_SUCCESS',
  payload: data
});
export const getAllSalesinvoiceFailure = (error) => ({
  type: 'FETCH_ALL_SALESINVOICE_FAILURE',
  payload: error
});
export const viewSalesinvoiceRequest = (data) => ({
  type: 'VIEW_SALESINVOICE_REQUEST',
  payload: data
});
export const viewSalesinvoiceSuccess = (data) => ({
  type: 'VIEW_SALESINVOICE_SUCCESS',
  payload: data
});
export const viewSalesinvoiceFailure = (error) => ({
  type: 'VIEW_SALESINVOICE_FAILURE',
  payload: error
});

// ############################################################################# PURCHASE ############################################################################
export const createPurchaseRequest = (data) => ({
  type: 'CREATE_PURCHASE_REQUEST',
  payload: data
});
export const createPrchaseSuccess = (data) => ({
  type: 'CREATE_PURCHASE_SUCCESS',
  payload: data
});
export const createPurchaseFailure = (error) => ({
  type: 'CREATE_PURCHASE_FAILURE',
  payload: error
});
export const createPurchaseItemRequest = (data) => ({
  type: 'CREATE_PURCHASE_ITEM_REQUEST',
  payload: data
});
export const createPrchaseItemSuccess = (data) => ({
  type: 'CREATE_PURCHASE_ITEM_SUCCESS',
  payload: data
});
export const createPurchaseItemFailure = (error) => ({
  type: 'CREATE_PURCHASE_ITEM_FAILURE',
  payload: error
});
export const fetchAllPurchaseRequest = () => ({
  type: 'FETCH_ALL_PURCHASE_REQUEST'
});
export const fetchAllPurchaseSuccess = (data) => ({
  type: 'FETCH_ALL_PURCHASE_SUCCESS',
  payload: data
});
export const fetchAllPurchaseFailure = (error) => ({
  type: 'FETCH_ALL_PURCHASE_FAILURE',
  payload: error
});
export const viewPurchaseRequest = (data) => ({
  type: 'VIEW_PURCHASE_REQUEST',
  payload: data
});
export const viewPurchaseSuccess = (data) => ({
  type: 'VIEW_PURCHASE_SUCCESS',
  payload: data
});
export const viewPurchaseFailure = (error) => ({
  type: 'VIEW_PURCHASE_FAILURE',
  payload: error
});
export const updatePurchaseRequst = (data) => ({
  type: 'UPDATE_PURCHASE_REQUEST',
  payload: data
});
export const updatePurchasesuccess = (data) => ({
  type: 'UPDATE_PURCHASE_SUCCESS',
  payload: data
});
export const updatePurchasefailure = (error) => ({
  type: 'UPDATE_PURCHASE_FAILURE',
  payload: error
});
export const updatePurchaseItemRequst = (data) => ({
  type: 'UPDATE_PURCHASE_ITEM_REQUEST',
  payload: data
});
export const updatePurchaseItemsuccess = (data) => ({
  type: 'UPDATE_PURCHASE_ITEM_SUCCESS',
  payload: data
});
export const updatePurchaseItemfailure = (error) => ({
  type: 'UPDATE_PURCHASE_ITEM_FAILURE',
  payload: error
});
export const deletePurchaseItemRequest = (data) => ({
  type: 'DELETE_PURCHASE_ITEM_REQUEST',
  payload: data
});
export const deletePurchaseItemSuccess = (data) => ({
  type: 'DELETE_PURCHASE_ITEM_SUCCESS',
  payload: data
});
export const deletePurchaseItemFailure = (error) => ({
  type: 'DELETE_PURCHASE_ITEM_FAILURE',
  payload: error
});

// ######################################################################## PURCHASE BILL ####################################################################
export const createPurchaseBillRequest = (data) => ({
  type: 'CREATE_PURCHASEBILL_REQUEST',
  payload: data
});
export const createPurchaseBillSuccess = (data) => ({
  type: 'CREATE_PURCHASEBILL_SUCCESS',
  payload: data
});
export const createPurchaseBillFailure = (error) => ({
  type: 'CREATE_PURCHASEBILL_FAILURE',
  payload: error
});
export const createPurchaseBillItemRequest = (data) => ({
  type: 'CREATE_PURCHASEBILL_ITEM_REQUEST',
  payload: data
});
export const createPurchaseBillItemSuccess = (data) => ({
  type: 'CREATE_PURCHASEBILL_ITEM_SUCCESS',
  payload: data
});
export const createPurchaseBillItemFailure = (error) => ({
  type: 'CREATE_PURCHASEBILL_ITEM_FAILURE',
  payload: error
});
export const getAllPurchasebillRequest = (data) => ({
  type: 'FETCH_ALL_PURCHASEBILL_REQUEST',
  payload: data
});
export const getAllPurchasebillSuccess = (data) => ({
  type: 'FETCH_ALL_PURCHASEBILL_SUCCESS',
  payload: data
});
export const getAllPurchasebillFailure = (error) => ({
  type: 'FETCH_ALL_PURCHASEBILL_FAILURE',
  payload: error
});
export const viewPurchasebillRequest = (data) => ({
  type: 'VIEW_PURCHASEBILL_REQUEST',
  payload: data
});
export const viewPurchasebillSuccess = (data) => ({
  type: 'VIEW_PURCHASEBILL_SUCCESS',
  payload: data
});
export const viewPurchasebillFailure = (error) => ({
  type: 'VIEW_PURCHASEBILL_FAILURE',
  payload: error
});

// ############################################################################# PRODUCT ##########################################################################
export const createProductRequest = (data) => ({
  type: 'CREATE_PRODUCT_REQUEST',
  payload: data
});
export const createProductSuccess = (data) => ({
  type: 'CREATE_PRODUCT_SUCCESS',
  payload: data
});
export const createProductFailure = (error) => ({
  type: 'CREATE_PRODUCT_FAILURE',
  payload: error
});
export const fetchAllProdutsRequest = () => ({
  type: 'FETCH_ALL_PRODUCTS_REQUEST'
});
export const fetchAllProdutsSuccess = (data) => ({
  type: 'FETCH_ALL_PRODUCTS_SUCCESS',
  payload: data
});
export const fetchAllProdutrsFailure = (error) => ({
  type: 'FETCH_ALL_PRODUCTS_FAILURE',
  payload: error
});

// ################################################################ EXPENSE #############################################################################

export const createExpenseRequest = (data) => ({
  type: 'CREATE_EXPENCE_REQUEST',
  payload: data
});
export const createExpenseSuccess = (data) => ({
  type: 'CREATE_EXPENSE_SUCCESS',
  payload: data
});
export const createExpenseFailure = (error) => ({
  type: 'CREATE_EXPENSE_FAILURE',
  payload: error
});
export const createExpenseItemRequest = (data) => ({
  type: 'CREATE_EXPENSE_ITEM_REQUEST',
  payload: data
});
export const createExpenseItemSuccess = (data) => ({
  type: 'CREATE_EXPENSE_ITEM_SUCCESS',
  payload: data
});
export const createExpenseItemFailure = (error) => ({
  type: 'CREATE_EXPENSE_ITEM_FAILURE',
  payload: error
});
export const getAllExpenseRequest = (data) => ({
  type: 'FETCH_ALL_EXPENSE_REQUEST',
  payload: data
});
export const getAllExpenseSuccess = (data) => ({
  type: 'FETCH_ALL_EXPENSE_SUCCESS',
  payload: data
});
export const getAllExpenseFailure = (error) => ({
  type: 'FETCH_ALL_EXPENSE_FAILURE',
  payload: error
});
export const viewExpenseRequest = (data) => ({
  type: 'VIEW_EXPENSE_REQUEST',
  payload: data
});
export const viewExpenseSuccess = (data) => ({
  type: 'VIEW_EXPENSE_SUCCESS',
  payload: data
});
export const viewExpenseFailure = (error) => ({
  type: 'VIEW_EXPENSE_FAILURE',
  payload: error
});
export const deleteExpenseItemRequest = (data) => ({
  type: 'DELETE_EXPENSE_ITEM_REQUEST',
  payload: data
});
export const deleteExpenseItemSuccess = (data) => ({
  type: 'DELETE_EXPENSE_ITEM_SUCCESS',
  payload: data
});
export const deleteExpenseItemFailure = (error) => ({
  type: 'DELETE_EXPENSE_ITEM_FAILURE',
  payload: error
});
export const updateExpenseRequest = (data) => ({
  type: 'UPDATE_EXPENCE_REQUEST',
  payload: data
});
export const updateExpenseSuccess = (data) => ({
  type: 'UPDATE_EXPENSE_SUCCESS',
  payload: data
});
export const updateExpenseFailure = (error) => ({
  type: 'UPDATE_EXPENCE_FAILURE',
  payload: error
});
export const updateExpenseItemRequest = (data) => ({
  type: 'UPDATE_EXPENSE_ITEM_REQUEST',
  payload: data
});
export const updateExpenseItemSuccess = (data) => ({
  type: 'UPDATE_EXPENSE_ITEM_SUCCESS',
  payload: data
});
export const updateExpenseItemFailure = (error) => ({
  type: 'UPDATE_EXPENSE_ITEM_FAILURE',
  payload: error
});

// ############################################################## PURCHASE RETURN ###########################################################################
export const getAllPurchasereturnRequest = (data) => ({
  type: 'FETCH_ALL_PURCHASERETURN_REQUEST',
  payload: data
});
export const getAllPurchasereturnSuccess = (data) => ({
  type: 'FETCH_ALL_PURCHASERETURN_SUCCESS',
  payload: data
});
export const getAllPurchasereturnFailure = (error) => ({
  type: 'FETCH_ALL_PURCHASERETURN_FAILURE',
  payload: error
});
export const viewPurchasereturnRequest = (data) => ({
  type: 'VIEW_PURCHASERETURN_REQUEST',
  payload: data
});
export const viewPurchasereturnSuccess = (data) => ({
  type: 'VIEW_PURCHASERETURN_SUCCESS',
  payload: data
});
export const viewPurchasereturnFailure = (error) => ({
  type: 'VIEW_PURCHASERETURN_FAILURE',
  payload: error
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PERMISSIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getAllPermissionsRequest = (data) => ({
  type: 'FETCH_ALL_PERMISSIONS_REQUEST',
  payload: data
});
export const getAllPermissionsSuccess = (data) => ({
  type: 'FETCH_ALL_PERMISSIONS_SUCCESS',
  payload: data
});
export const getAllPermissionsFailure = (error) => ({
  type: 'FETCH_ALL_PERMISSIONS_FAILURE',
  payload: error
});
export const updatePermissionsRequest = (data) => ({
  type: 'UPDATE_PERMISSIONS_REQUEST',
  payload: data
});
export const updatePermissionsSuccess = (data) => ({
  type: 'UPDATE_PERMISSIONS_SUCCESS',
  payload: data
});
export const updatePermissionsFailure = (error) => ({
  type: 'UPDATE_PERMISSIONS_FAILURE',
  payload: error
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ USER ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createUserRequest = (data) => ({
  type: 'CREATE_USER_REQUEST',
  payload: data
});
export const createUserSuccess = (data) => ({
  type: 'CREATE_USER_SUCCESS',
  payload: data
});
export const createUserFailure = (error) => ({
  type: 'CREATE_USER_FAILURE',
  payload: error
});
export const getallUserRequest = (data) => ({
  type: 'GET_ALL_USER_REQUEST',
  payload: data
});
export const getallUserSuccess = (data) => ({
  type: 'GET_ALL_USER_SUCCESS',
  payload: data
});
export const getallUserFailure = (error) => ({
  type: 'GET_ALL_USER_FAILURE',
  payload: error
});
export const viewUserRequest = (data) => ({
  type: 'VIEW_USER_REQUEST',
  payload: data
});
export const viewUserSuccess = (data) => ({
  type: 'VIEW_USER_SUCCESS',
  payload: data
});
export const viewUserFailure = (error) => ({
  type: 'VIEW_USER_FAILURE',
  payload: error
});
export const UpdateUserRequest = (data) => ({
  type: 'UPDATE_USER_REQUEST',
  payload: data
});
export const UpdateUserSuccess = (data) => ({
  type: 'UPDATE_USER_SUCCESS',
  payload: data
});
export const UpdateUserFailure = (error) => ({
  type: 'UPDATE_USER_FAILURE',
  payload: error
});
export const deleteUserRequest = (data) => ({
  type: 'DELETE_USER_REQUEST',
  payload: data
});
export const deleteUserSuccess = (data) => ({
  type: 'DELETE_USER_SUCCESS',
  payload: data
});
export const deleteUserFailure = (error) => ({
  type: 'DELETE_USER_FAILURE',
  payload: error
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ VENDOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createVendorRequest = (data) => ({
  type: 'CREATE_VENDOR_REQUEST',
  payload: data
});
export const createVendorSuccess = (data) => ({
  type: 'CREATE_VENDOR_SUCCESS',
  payload: data
});
export const createVendorFailure = (error) => ({
  type: 'CREATE_VENDOR_FAILURE',
  payload: error
});
export const fetchAllVendorsRequest = () => ({
  type: 'FETCH_ALL_VENDORS_REQUEST'
});
export const fetchAllVendorsSuccess = (data) => ({
  type: 'FETCH_ALL_VENDORS_SUCCESS',
  payload: data
});
export const fetchAllVendorsFailure = (error) => ({
  type: 'FETCH_ALL_VENDORS_FAILURE',
  payload: error
});

// +++++++++++++++++++++++++++++++++++++++++++++++ COMPANY ++++++++++++++++++++++++++++++++++++
export const fetchAllCompanyRequest = () => ({
  type: 'FETCH_ALL_COMPANY_REQUEST'
});
export const fetchAllCompanySuccess = (data) => ({
  type: 'FETCH_ALL_COMPANY_SUCCESS',
  payload: data
});
export const fetchAllCompanyFailure = (error) => ({
  type: 'FETCH_ALL_COMPANY_FAILURE',
  payload: error
});
