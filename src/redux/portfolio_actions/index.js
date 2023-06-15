import types from "../types";
import { API } from "../../api";
import { getSYS_CURToken, getToken } from "../../utils/common";
import { handleError } from "../actions";
export const getPortfolioValuationAction = (navigate) => async (dispatch) => {
  try {
    dispatch({
      type: types.PORTFOLIO_VALUATION_FETCH,
    });
    const config = {
      apiVersion: "baseUrl",
      headers: { Authorization: "Bearer " + getToken() },
    };
    let currencyCode = getSYS_CURToken();

    let params = "";
    if (currencyCode) {
      params += `?currencyCode=${currencyCode}`;
    }
    const response = await API.get(config)("/api/portfolio/valuation" + params);

    dispatch({
      type: types.PORTFOLIO_VALUATION_DATA,
      payload: response,
    });
  } catch (error) {
    handleError(error, navigate, dispatch);
    dispatch({
      type: types.PORTFOLIO_VALUATION_ERROR,
    });
  }
};
