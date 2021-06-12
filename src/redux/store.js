import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { questionsReducer } from './questions';
import { authReducer } from './auth';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const tokenPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};

const questionsPersistConfig = {
  key: 'questions',
  storage,
  whitelist: 'nameTest',
};

const store = configureStore({
  reducer: {
    // answers: questionsReducer.resultQuestionsReducer,
    // nameTest: questionsReducer.setNameReducer,
    // questions: questionsReducer.setDataQuestions,
    // result: questionsReducer.setQuestionsResult,
    questions: persistReducer(questionsPersistConfig, questionsReducer),
    auth: persistReducer(tokenPersistConfig, authReducer),
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

const persistor = persistStore(store);

export { store, persistor };
