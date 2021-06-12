import axios from 'axios';
import { authOperations } from '../redux/auth/';
// http://localhost:3030
// https://final-group-project-node.herokuapp.com
axios.defaults.baseURL = 'https://final-group-project-node.herokuapp.com';

const setToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const updateRefreshToken = async refreshToken => {
  try {
    debugger;
    // if (e.slice(-3) !== '401') return;
    // const refreshToken = localStorage.getItem('refreshToken');
    // if (refreshToken === null) return;
    // const {
    //   data: { data },
    // } = await authOperations.updateRefreshToken(refreshToken);
    const {
      data: { data },
    } = await axios.get(`/auth/refresh-token/${refreshToken}`);
    return data;
    // setToken.set(data.accessToken);
    // localStorage.setItem('accessToken', data.accessToken);
    // localStorage.setItem('refreshToken', data.refreshToken);
  } catch (e) {
    console.log(e);
  }
};

const getQuestions = async query => {
  try {
    const { data } = await axios.get(`/test/${query}`);
    return data;
  } catch (e) {
    authOperations.updateRefreshToken(e.message);
  }
};

const postUserAnswers = async (nameTest, userAnswers) => {
  try {
    const dataPost = await { answers: userAnswers, nameTest };
    const { data } = await axios.post(`/test/result`, dataPost);
    return data;
  } catch (e) {
    authOperations.updateRefreshToken(e.message);
  }
};

// const patchUpdateUserName = async userName => {
//   try {
//     const { data } = await axios.patch('/users/current', userName);
//     return data;
//   } catch (e) {
//     authOperations.updateRefreshToken(e.message);
//   }
// };

// const patchUpdateUserAvatar = async userAvatar => {
//   try {
//     const { data } = await axios.patch('/users/avatars', userAvatar);
//     return data;
//   } catch (e) {
//     authOperations.updateRefreshToken(e.message);
//   }
// };

const registerUser = async ({ email, password }) => {
  try {
    const { data } = await axios.post('/auth/register', { email, password });
    return data;
  } catch (e) {
    authOperations.updateRefreshToken(e.message);
  }
};

const login = async ({ email, password }) => {
  const { data } = await axios.post('/auth/login', { email, password });
  return data;
};

const logout = async () => {
  try {
    await axios.post('auth/logout');
  } catch (e) {
    authOperations.updateRefreshToken(e.message);
  }
};

const getUser = async () => {
  try {
    const { data } = await axios.get('/users/current');
    return data;
  } catch (e) {
    authOperations.updateRefreshToken(e.message);
  }
};

export {
  getQuestions,
  postUserAnswers,
  registerUser,
  login,
  logout,
  setToken,
  getUser,
  updateRefreshToken,
};
