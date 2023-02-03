import { FC, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from './components/auth-route/auth-route';
import { Navbar } from './components/navbar/navbar';
import routes from './config/routes';
import { AuthContext, AuthProvider } from './context/auth-context';
import { Validate } from './modules/validate';
export interface IApplicationProps {}

export const App: FC<IApplicationProps> = (props) => {
  // const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState<boolean>(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const checkLocalStorageForCredentials = async () => {
      setLoading(false);
      const token = localStorage.getItem('token');
      if (token === null) {
        authContext.logout();
      } else {
        console.log('Validate token on the server...');
        return Validate({
          token,
          callback: (error, user) => {
            if (error) {
              authContext.logout();
            } else if (user) {
              authContext.login(token);
              setLoading(false);
            }
          },
        });
      }
    };
    checkLocalStorageForCredentials();
  }, []);

  // const checkLocalStorageForCredentials = async () => {
  //   setLoading(false);
  //   const token = localStorage.getItem('token');
  //   if (token === null) {
  //     userDispatch({
  //       type: 'LOGOUT',
  //       payload: initialUserState,
  //     });
  //   } else {
  //     console.log('Validate token on the server...');
  //     return Validate({
  //       token,
  //       callback: (error, user) => {
  //         if (error) {
  //           console.log('error', error);
  //           userDispatch({
  //             type: 'LOGOUT',
  //             payload: initialUserState,
  //           });
  //         } else if (user) {
  //           userDispatch({
  //             type: 'LOGIN',
  //             payload: { user, token },
  //           });
  //           setLoading(false);
  //         }
  //       },
  //     });
  //   }
  // };

  // const userContextValues = {
  //   userState,
  //   userDispatch,
  // };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {routes.map((route, index) => {
          if (route.auth) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AuthRoute>
                    <route.component />
                  </AuthRoute>
                }
              />
            );
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
      </Routes>
    </AuthProvider>
  );
};

export default App;
