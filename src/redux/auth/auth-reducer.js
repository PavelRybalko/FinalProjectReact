import { createReducer, combineReducers, createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = { name: null, email: null, avatarURL: null };

const user = createReducer(initialState, {
  [authOperations.register.fulfilled]: (_, { payload }) => payload.user,
  [authOperations.fetchCurrentUser.fulfilled]: (_, { payload }) => payload.user,
  [authOperations.logIn.fulfilled]: (_, { payload }) => {
    return payload.user;
  },
  [authOperations.logOut.fulfilled]: () => null,
});

const accessToken = createReducer(null, {
  [authOperations.logIn.fulfilled]: (_, { payload }) => {
    return payload.accessToken;
  },
  [authOperations.updateTokenByCode.fulfilled]: (_, { payload }) => {
    debugger;
    return payload.accessToken;
  },
  // [authOperations.fetchCurrentUser.fulfilled]: (_, { payload }) => {
  //   debugger;
  //   console.log('token reducer -', payload);
  //   return payload?.accessToken;
  // },
  [authOperations.updateTokenByCode.rejected]: () => null,
  [authOperations.fetchCurrentUser.rejected]: () => null,
  [authOperations.logOut.fulfilled]: () => null,
});

const isLoggedIn = createReducer(false, {
  [authOperations.logIn.fulfilled]: () => true,
  [authOperations.logIn.rejected]: () => false,
  [authOperations.logOut.fulfilled]: () => false,
  [authOperations.fetchCurrentUser.fulfilled]: () => true,
  [authOperations.fetchCurrentUser.rejected]: () => false,
  [authOperations.updateTokenByCode.rejected]: () => false,
});

const loading = createReducer(false, {
  [authOperations.register.pending]: () => true,
  [authOperations.register.fulfilled]: () => false,
  [authOperations.register.rejected]: () => false,

  [authOperations.logIn.pending]: () => true,
  [authOperations.logIn.fulfilled]: () => false,
  [authOperations.logIn.rejected]: () => false,

  [authOperations.logOut.pending]: () => true,
  [authOperations.logOut.fulfilled]: () => false,
  [authOperations.logOut.rejected]: () => false,

  [authOperations.fetchCurrentUser.pending]: () => true,
  [authOperations.fetchCurrentUser.fulfilled]: () => false,
  [authOperations.fetchCurrentUser.rejected]: () => false,

  [authOperations.updateTokenByCode.pending]: () => true,
  [authOperations.updateTokenByCode.fulfilled]: () => false,
  [authOperations.updateTokenByCode.rejected]: () => false,
});

const authReducer = combineReducers({
  user,
  accessToken,
  isLoggedIn,
  loading,
});

export default authReducer;
// const isAuthenticated = createReducer(false, {
// [registerUserSuccess]: () => true,
// [loginUserSuccess]: () => true,
// [registerUserError]: () => false,
// [loginUserError]: () => false,
// [logoutUserSuccess]: () => false,
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   extraReducers: {
//     [authOperations.register.fulfilled]: (_, { payload }) => {
//       state.user = payload.user;
//     },
//   },
// });

// export default authSlice.reducer;
