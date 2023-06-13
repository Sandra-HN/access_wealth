const { VITE_APP_ENV, VITE_APP_API_BASE_URL } = import.meta.env;

const getBaseUrl = () => {
  var baseUrl = VITE_APP_API_BASE_URL;
  if (VITE_APP_ENV === "dev" || VITE_APP_ENV === "development") {
    baseUrl = VITE_APP_API_BASE_URL;
  } else if (VITE_APP_ENV == "staging") {
    baseUrl = VITE_APP_API_BASE_URL;
  } else {
    baseUrl = VITE_APP_API_BASE_URL;
  }
  return baseUrl;
};
export const defaultConfig = {
  api: {
    baseUrl: getBaseUrl(),
  },
};

export const equipmentCalibrationFrontend = {
  config: defaultConfig,
};

window.env = window.env || defaultConfig;
equipmentCalibrationFrontend.config = { ...window.env };

export const baseUrl = () => equipmentCalibrationFrontend.config.api.baseUrl;
