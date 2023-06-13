import { API } from "../../api";
import {
  removeAuthToken,
  removeToken,
  setAuthToken,
  setToken,
} from "../../utils/common";
import { handleError } from "../actions";
import types from "../types";
// export const authAction = (authToken, navigate) => async (dispatch) => {
//     try {
//       dispatch({
//         type: types.AUTH_FETCH,
//       });
//       const config = {
//         apiVersion: "baseUrl",
//       };
//       const response = await API.post(config)("/api/auth", { token: authToken });
//       setToken(response.token);
//       setAuthToken(authToken);
//       dispatch({
//         type: types.AUTH_SUCCESS,
//       });
//       const redirectUrl =
//         response.redirectUrl && response.redirectUrl != ""
//           ? response.redirectUrl
//           : localStorage.getItem("redirectUrl") || null;
//       if (redirectUrl) {
//         localStorage.removeItem("redirectUrl");
//         navigate(decodeURIComponent(redirectUrl));
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       dispatch({
//         type: types.AUTH_ERROR,
//       });
//       handleError(error, navigate, dispatch);
//     }
//   };

export const loginAction = (requestData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
    };
    debugger;
    const response = await API.post(config)("/api/authenticate", requestData);

    setToken(response.token);
    debugger;
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
  removeAuthToken();
};
export const logoutClickAction = (navigate) => async (dispatch) => {
  removeToken();
  navigate("/unauthorized");
};
