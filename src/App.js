import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import routes from './routes';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/';
import Loader from './components/Loader';
import Footer from './components/Footer/';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
const MainView = lazy(() =>
  import('./views/MainView' /*webpackChunkName: "MainView"*/),
);
const UseFulInfoView = lazy(() =>
  import('./views/UseFulInfoView' /*webpackChunkName: "UseFulInfoView"*/),
);
const ContactsView = lazy(() =>
  import('./views/ContactsView' /*webpackChunkName: "ContactsView"*/),
);
const Results = lazy(() =>
  import('./components/Results' /*webpackChunkName: "Results"*/),
);
const TestPage = lazy(() =>
  import('./components/TestPage' /*webpackChunkName: "TestPage"*/),
);
const AuthView = lazy(() =>
  import('./views/AuthView' /*webpackChunkName: "AuthView"*/),
);
function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {

  //   dispatch(authOperations.fetchCurrentUser());
  // }, []);
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <div className="contentWrapper">
          <Switch>
            <PrivateRoute exact path={routes.USEFUL_INFO_VIEW}>
              <UseFulInfoView />
            </PrivateRoute>
            <PublicRoute exact path={routes.CONTACTS_VIEW}>
              <ContactsView />
            </PublicRoute>
            <PublicRoute exact path={routes.AUTH_VIEW} restricted>
              <AuthView />
            </PublicRoute>
            <PrivateRoute exact path={routes.RESULT_VIEW}>
              <Results />
            </PrivateRoute>
            <PrivateRoute exact path={routes.MAIN_VIEW}>
              <MainView />
            </PrivateRoute>
            <PrivateRoute exact path={routes.TEST_VIEW}>
              <TestPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
