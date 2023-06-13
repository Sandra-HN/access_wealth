import {
  removeAuthToken,
  removeToken
} from "../utils/common";

/**
 * Actions
 */
export * from "./auth_actions";
export * from "./profile_actions";
/**
 * End Actions
 */

/**
 * Unauthorized Error Handler
 */
export const handleError = (error, navigate, dispatch) => {
  if (error.code === 401) {
    removeToken();
    removeAuthToken();
    navigate("/unauthorized");
  }
};
/**
 * End Unauthorized Error Handler
 */