import { createAction } from '@reduxjs/toolkit';

const actionAddResult = createAction('questions/add', data => ({
  payload: data,
}));

const actionUpdateResult = createAction('questions/update', data => ({
  payload: data,
}));

const actionSetNameTest = createAction('questions/setName', data => ({
  payload: data,
}));
const actionResetAnswers = createAction('answers/reset', data => ({
  payload: data,
}));

// const actionGetTest = createAction('data/getTest', value => ({
//   payload: value,
// }));

// const actionPostTest = createAction('data/postName', value => ({
//   payload: value,
// }));

export {
  actionAddResult,
  actionUpdateResult,
  actionSetNameTest,
  actionResetAnswers,
  // actionGetTest,
  // actionPostTest,
};
