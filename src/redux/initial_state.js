const authState = {
  loading: false,
  success: false,
  error: false,
  data: null,
};

const portfolioState = {
  loading: false,
  data: null,
  Valuation: null,
  valuationloading: false,
};

const initialState = {
  auth: authState,
  portfolio: portfolioState,
};

export { initialState };
