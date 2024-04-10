// action - state management
import * as actionTypes from './actions';

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

export const initialState = {
  isOpen: 'dashboard', //for active default menu
  navType: '',
  // Add properties related to quotations
  quotations: [],
  loadingQuotations: false,
  errorQuotations: null,
  purchase: []
};

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      return {
        ...state,
        isOpen: action.isOpen
      };
    case actionTypes.MENU_TYPE:
      return {
        ...state,
        navType: action.navType
      };
    case actionTypes.FETCH_QUOTATION_REQUEST:
      return {
        ...state,
        loadingQuotations: true,
        errorQuotations: null
      };
    case actionTypes.FETCH_QUOTATION_SUCCESS:
      return {
        ...state,
        loadingQuotations: false,
        quotations: action.payload
      };
    case actionTypes.FETCH_QUOTATION_FAILURE:
      return {
        ...state,
        loadingQuotations: false,
        errorQuotations: action.payload
      };
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        error: null
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case actionTypes.VIEW_PURCHASE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        purchase: action.payload,
        error: null
      };
    default:
      return state;
  }
};

export default customizationReducer;
