import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionResetAnswers } from './questions-actions.js';
import { getQuestions, postUserAnswers } from '../../data/apiQueries.js';

// const asyncActionGetTest = query => async dispatch => {
//   try {
//     const { data } = await getQuestions(query);
//     dispatch(actionGetTest(data));
//   } catch (error) {
//     console.log(error);
//   }
// };

const asyncActionGetTest = createAsyncThunk(
  'data/getTest',
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await getQuestions(query);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

const asyncActionPostTest = createAsyncThunk(
  'data/postName',
  async (name, userAnswer, { rejectWithValue }) => {
    try {
      const { data } = await postUserAnswers(name, userAnswer);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const asyncActionResetAnswers = newAnswer => dispatch => {
  dispatch(actionResetAnswers(newAnswer));
};

const questionsOperations = {
  asyncActionGetTest,
  asyncActionPostTest,
  asyncActionResetAnswers,
};

export default questionsOperations;
