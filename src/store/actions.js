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

export const CREATE_CUSTOM_FEILD_REQUEST = 'CREATE_CUSTOM_FEILD_REQUEST';
export const CREATE_CUSTOM_FEILD_SUCCESS = 'CREATE_CUSTOM_FEILD_SUCCESS';
export const CREATE_CUSTOM_FEILD_FAILURE = 'CREATE_CUSTOM_FEILD_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const CREATE_EXPENCE_REQUEST = 'CREATE_EXPENCE_REQUEST';
export const CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS';
export const CREATE_EXPENCE_FAILURE = 'CREATE_EXPENSE_FAILURE';

export const CREATE_EXPENSE_ITEM_REQUEST = 'CREATE_EXPENSE_ITEM_REQUEST';
export const CREATE_EXPENSE_ITEM_SUCCESS = 'CREATE_EXPENSE_ITEM_SUCCESS';
export const CREATE_EXPENSE_ITEM_FAILURE = 'CREATE_EXPENSE_ITEM_FAILURE';
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

export const createExpenseItemFailure = (data) => ({
  type: 'CREATE_EXPENSE_ITEM_FAILURE',
  payload: data
});
