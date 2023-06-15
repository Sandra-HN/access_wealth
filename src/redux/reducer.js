import { combineReducers } from "redux";
import types from "./types";

import { initialState } from "./initial_state";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const portfolioReducer = (state = initialState.portfolio, action) => {
  switch (action.type) {
    case types.PORTFOLIO_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.PORTFOLIO_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.PORTFOLIO_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.PORTFOLIO_RESET:
      return {
        ...state,
        data: null,
      };
    case types.PORTFOLIO_VALUATION_FETCH:
      return {
        ...state,
        valuationloading: true,
      };
    case types.PORTFOLIO_VALUATION_DATA:
      return {
        ...state,
        valuationloading: false,
        valuation: action.payload,
      };
    case types.PORTFOLIO_VALUATION_ERROR:
      return {
        ...state,
        valuationloading: false,
      };
    case types.PORTFOLIO_VALUATION_RESET:
      return {
        ...state,
        valuation: null,
        valuationloading: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  portfolio: portfolioReducer,
});

export default rootReducer;
