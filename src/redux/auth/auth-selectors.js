const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUserName = state => state.auth.user?.name;
const getUserEmail = state => state.auth.user?.email;
const getToken = state => state.auth.accessToken;

const authSelectors = {
  getIsLoggedIn,
  getUserEmail,
  getUserName,
  getToken,
};

export default authSelectors;
