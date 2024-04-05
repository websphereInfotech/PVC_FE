// action - account reducer
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const MENU_TYPE = '@customization/MENU_TYPE';

export const FETCH_QUOTATION_REQUEST = 'FETCH_QUOTATION_REQUEST';
export const FETCH_QUOTATION_SUCCESS = 'FETCH_QUOTATION_SUCCESS';
export const FETCH_QUOTATION_FAILURE = 'FETCH_QUOTATION_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const CREATE_QUOTATION_REQUEST = 'CREATE_QUOTATION_REQUEST';
export const CREATE_QUOTATION_SUCCESS = 'CREATE_QUOTATION_SUCCESS';
export const CREATE_QUOTATION_FAILURE = 'CREATE_QUOTATION_FAILURE';

export const FETCH_ALL_CUSTOMERS_REQUEST = 'FETCH_ALL_CUSTOMERS_REQUEST';
export const FETCH_ALL_CUSTOMERS_SUCCESS = 'FETCH_ALL_CUSTOMERS_SUCCESS';
export const FETCH_ALL_CUSTOMERS_FAILURE = 'FETCH_ALL_CUSTOMERS_FAILURE';

export const FETCH_ALL_PRODUCTS_REQUEST = 'FETCH_ALL_PRODUCTS_REQUEST';
export const FETCH_ALL_PRODUCTS_SUCCESS = 'FETCH_ALL_PRODUCTS_SUCCESS';
export const FETCH_ALL_PRODUCTS_FAILURE = 'FETCH_ALL_PRODUCTS_FAILURE';

export const CREATE_QUOTATION_ITEM_REQUEST = 'CREATE_QUOTATION_ITEM_REQUEST';
export const CREATE_QUOTATION_ITEM_SUCCESS = 'CREATE_QUOTATION_ITEM_SUCCESS';
export const CREATE_QUOTATION_ITEM_FAILURE = 'CREATE_QUOTATION_ITEM_FAILURE';

export const DELETE_QUOTATION_ITEM_REQUEST = 'DELETE_QUOTATION_ITEM_REQUEST';
export const DELETE_QUOTATION_ITEM_SUCCESS = 'DELETE_QUOTATION_ITEM_SUCCESS';
export const DELETE_QUOTATION_ITEM_FAILURE = 'DELETE_QUOTATION_ITEM_FAILURE';

export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_FAILURE = 'CREATE_CUSTOMER_FAILURE';

export const fetchQuotationRequest = () => ({
  type: 'FETCH_QUOTATION_REQUEST'
});

export const fetchQuotationSuccess = (data) => ({
  type: 'FETCH_QUOTATION_SUCCESS',
  payload: data
});

export const fetchQuotationFailure = (error) => ({
  type: 'FETCH_QUOTATION_FAILURE',
  payload: error
});

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

export const createQuotationRequest = () => ({
  type: 'CREATE_QUOTATION_REQUEST'
});

export const createQuotationSuccess = (data) => ({
  type: 'CREATE_QUOTATION_SUCCESS',
  payload: data
});

export const createQuotationFailure = (error) => ({
  type: 'CREATE_QUOTATION_FAILURE',
  payload: error
});

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

export const createQuotationItemRequest = (data) => ({
  type: 'CREATE_QUOTATION_ITEM_REQUEST',
  payload: data
});

export const createQuotationItemSuccess = (data) => ({
  type: 'CREATE_QUOTATION_ITEM_SUCCESS',
  payload: data
});

export const createQuotationItemFailure = (error) => ({
  type: 'CREATE_QUOTATION_ITEM_FAILURE',
  payload: error
});

export const deleteQuotationItemRequest = (data) => ({
  type: 'DELETE_QUOTATION_ITEM_REQUEST',
  payload: data
});

export const deleteQuotationItemSuccess = (data) => ({
  type: 'DELETE_QUOTATION_ITEM_SUCCESS',
  payload: data
});

export const deleteQuotationItemFailure = (error) => ({
  type: 'DELETE_QUOTATION_ITEM_FAILURE',
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
