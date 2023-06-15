export const setToken = (token) => {
  return localStorage.setItem("token", token);
};
export const getToken = () => {
  return localStorage.getItem("token") || null;
};
export const removeToken = () => {
  return localStorage.removeItem("token");
};
export const setUserToken = (token) => {
  return localStorage.setItem("user", JSON.stringify(token));
};
export const getUserToken = () => {
  return localStorage.getItem("user") || null;
};
export const removeUserToken = () => {
  return localStorage.removeItem("user");
};

export const setSYS_CURToken = (token) => {
  return localStorage.setItem("SYS_CUR", token);
};
export const getSYS_CURToken = () => {
  return localStorage.getItem("SYS_CUR") || null;
};
export const removeSYS_CURToken = () => {
  return localStorage.removeItem("SYS_CUR");
};
