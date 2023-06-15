import { removeUserToken, removeToken } from "../utils/common";

/**
 * Actions
 */
export * from "./auth_actions";
export * from "./portfolio_actions";
/**
 * End Actions
 */

/**
 * Unauthorized Error Handler
 */
export const handleError = (error, navigate, dispatch) => {
  if (error.code === 401) {
    removeToken();
    removeUserToken();
    navigate("/unauthorized");
  }
};
/**
 * End Unauthorized Error Handler
 */
