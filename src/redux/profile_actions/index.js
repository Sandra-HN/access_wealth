import types from "../types";
import { API } from "../../api";
import {
    getToken
} from "../../utils/common";
import { handleError } from "../actions";
export const getProfileAction = (navigate) => async (dispatch) => {
    try {
      dispatch({
        type: types.PROFILE_FETCH,
      });
      const config = {
        apiVersion: "baseUrl",
        headers: { Authorization: "Bearer " + getToken() },
      };
      const response = await API.get(config)("/api/employees/profile");
  
      dispatch({
        type: types.PROFILE_DATA,
        payload: response.data,
      });
    } catch (error) {
      handleError(error, navigate, dispatch);
      dispatch({
        type: types.PROFILE_ERROR,
      });
    }
  };