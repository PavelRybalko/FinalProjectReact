import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  registerUser,
  login,
  logout,
  setToken,
  getUser,
  updateRefreshToken,
} from '../../data/apiQueries.js';

const register = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const {
        data: { avatar },
      } = await registerUser({ email, password });
      const user = { user: { name: null, email, avatarURL: avatar } };
      toast.dark(
        `User ${email} was created , please follow to your email and confirm request`,
      );
      return user;
    } catch (err) {
      toast.dark(err);
      return rejectWithValue(err);
    }
  },
);

const logIn = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await login({ email, password });
      setToken.set(data.accessToken);
      // localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      // toast.dark(`Hello dear ${email}`);
      return data;
    } catch (err) {
      toast.dark(`Wrong credentials`);
      return rejectWithValue(err);
    }
  },
);

const logInGoogle = createAsyncThunk(
  'auth/loginGoogle',
  async (
    { email, name, picture, refreshToken, token },
    { rejectWithValue },
  ) => {
    try {
      setToken.set(token);
      // localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      const data = { user: { name: name, email, avatarURL: picture } };
      toast.dark(`Hello dear ${name}`);
      return data;
    } catch (error) {
      toast.dark(`Wrong credentials`);
      return rejectWithValue(error);
    }
  },
);

const logOut = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      setToken.unset();
      // localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      toast.dark(`Goodbye`);
    } catch (err) {
      toast.dark(`Ups Something wrong:)`);
      return rejectWithValue(err);
    }
  },
);

const updateTokenByCode = createAsyncThunk(
  'updateTokenByCode',
  async (errorMessage, { rejectWithValue }) => {
    try {
      if (errorMessage.slice(-3) !== '401') return;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken === null) return;
      const data = await updateRefreshToken(refreshToken);
      setToken.set(data.accessToken);
      // localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    } catch (err) {
      toast.dark(`Ups Something wrong:)`);
      return rejectWithValue(err);
    }
  },
);

const fetchCurrentUser = createAsyncThunk(
  'fetchCurrentUser',
  async (token, thunkAPI) => {
    try {
      setToken.set(token);
      const { data } = await getUser();
      // const {
      //   auth: { accessToken },
      // } = thunkAPI.getState();
      // console.log('accessToken - ', accessToken);
      return data;
    } catch (err) {
      toast.dark(`Please, log in`);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

const authOperations = {
  register,
  logIn,
  logInGoogle,
  logOut,
  fetchCurrentUser,
  updateTokenByCode,
};

export default authOperations;
