import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  actionAddResult,
  actionUpdateResult,
  actionSetNameTest,
  actionResetAnswers,
  // actionGetTest,
  // actionPostTest,
} from './questions-actions';
import questionsOperations from './questions-operation';

const answers = createReducer([], {
  [actionAddResult]: (state, { payload }) => {
    const answersAdd = [...state, payload];
    return answersAdd;
  },
  [actionUpdateResult]: (state, { payload }) => {
    const answerRemove = [
      ...state.filter(answer => answer.questionId !== payload.questionId),
      payload,
    ];
    return answerRemove;
  },
  [actionResetAnswers]: (state, { payload }) => {
    const resetAnswers = payload;
    return resetAnswers;
  },
});

const nameTest = createReducer('', {
  [actionSetNameTest]: (_, { payload }) => {
    return payload;
  },
});
const questions = createReducer([], {
  [questionsOperations.asyncActionGetTest.fulfilled]: (state, { payload }) => {
    return payload;
  },
});
// export const setQuestionsResult = createReducer([], {
//   [questionsOperations.asyncActionPostTest.fulfilled]: (state, { payload }) => {
//     return payload;
//   },
// });
const questionsReducer = combineReducers({
  answers,
  nameTest,
  questions,
});

export default questionsReducer;
