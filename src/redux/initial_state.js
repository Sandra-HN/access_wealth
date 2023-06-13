const authState = {
  loading: false,
  success: false,
  error: false,
  data: null,
};

const profileState = {
  loading: false,
  data: null,
};

const initialState = {
  auth: authState,
  profile: profileState,
};

export { initialState };
