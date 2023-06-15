import { API } from "../../api";
import {
  removeUserToken,
  removeToken,
  setToken,
  setUserToken,
  removeSYS_CURToken,
} from "../../utils/common";
import { handleError } from "../actions";
import types from "../types";

export const loginAction = (requestData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
    };

    const response = await API.post(config)("/api/authenticate", requestData);

    setToken(response.token);
    setUserToken(response.userData);
    dispatch({
      type: types.AUTH_SUCCESS,
      payload: response.userData,
    });
    navigate("/");
  } catch (error) {
    handleError(error, navigate, dispatch);

    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};
export const logoutAction = (navigate) => async (dispatch) => {
  removeToken();
  removeUserToken();
  removeSYS_CURToken();
};
export const logoutClickAction = (navigate) => async (dispatch) => {
  removeToken();
  removeUserToken();
  removeSYS_CURToken();
  navigate("/unauthorized");
};
