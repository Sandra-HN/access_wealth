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

const profileReducer = (state = initialState.profile, action) => {
  switch (action.type) {
    case types.PROFILE_FETCH:
      return {
        ...state,
        loading: true,
      };
    case types.PROFILE_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case types.PROFILE_RESET:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;
