import React, { useEffect, lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import routes from './routes';
import { BrowserRouter, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { authOperations } from './redux/auth';
import { authSelectors } from './redux/auth/';
import Header from './components/Header/';
import Loader from './components/Loader';
import Footer from './components/Footer/';
import GoogleLogin from './components/GoogleLogin/';
import { PublicRoute, PrivateRoute } from './components/Routes';

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
  const dispatch = useDispatch();
  const accessToken = useSelector(authSelectors.getToken);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (!refreshToken) return;

    !isLoggedIn && dispatch(authOperations.fetchCurrentUser(accessToken));
  }, [dispatch, refreshToken, accessToken, isLoggedIn]);

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <main className="contentWrapper">
          <Switch>
            <PublicRoute exact path={routes.GOOGLE_LOGIN} restricted>
              <GoogleLogin>
                <Loader />
              </GoogleLogin>
            </PublicRoute>
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
        </main>
      </Suspense>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
