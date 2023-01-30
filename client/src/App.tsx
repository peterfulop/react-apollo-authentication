import { FC, useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthRoute } from './components/auth-route/auth-route';
import { Navbar } from './components/navbar/navbar';
import routes from './config/routes';
import {
  UserContextProvider,
  initialUserState,
  userReducer,
} from './context/user-context';
import { useConfirmUserMutation } from './graphql/auth/auth.generated';
export interface IApplicationProps {}

export const App: FC<IApplicationProps> = (props) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string[]>([]);

  const [confirmUser] = useConfirmUserMutation();

  useEffect(() => {
    0;
    const checkLocalStorageForCredentials = async () => {
      const token = localStorage.getItem('token');
      if (token === null) {
        userDispatch({
          type: 'LOGOUT',
          payload: initialUserState,
        });
        setLoading(false);
      } else {
        console.log('Validate token on the server...', token);
        const res = await confirmUser({
          onError() {
            setError((prevState) => {
              return prevState;
            });
          },
          variables: {
            confirmUserToken: localStorage.getItem('token') || '',
          },
        });
        if (!res.data?.confirmUser.token) {
          userDispatch({
            type: 'LOGOUT',
            payload: initialUserState,
          });
        }

        if (res.data?.confirmUser.userErrors.length) {
          const errorMessage = res.data?.confirmUser.userErrors[0].message;
          return setError([errorMessage]);
        } else if (res.data?.confirmUser.user && res.data.confirmUser.token) {
          const { token, user } = res.data.confirmUser;
          userDispatch({ type: 'LOGIN', payload: { user, token } });
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      }
    };
    checkLocalStorageForCredentials();
  }, []);

  // const CheckLocalStorageForCredentials = async () => {
  //   const token = localStorage.getItem('token');
  //   if (token === null) {
  //     userDispatch({
  //       type: 'LOGOUT',
  //       payload: initialUserState,
  //     });
  //     setLoading(false);
  //   } else {
  //     console.log('Validate token on the server...', token);
  //     const res = await confirmUser();
  //     if (res.data?.confirmUser.userErrors.length) {
  //       const errorMessage = res.data?.confirmUser.userErrors[0].message;
  //       return setError([errorMessage]);
  //     } else if (res.data?.confirmUser.user && res.data.confirmUser.token) {
  //       const { token, user } = res.data.confirmUser;
  //       userDispatch({ type: 'LOGIN', payload: { user, token } });
  //       setLoading(false);
  //     }
  //   }
  // };

  const userContextValues = {
    userState,
    userDispatch,
  };

  return (
    <UserContextProvider value={userContextValues}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {routes.map((route, index) => {
            {
              return route.auth ? (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AuthRoute>
                      <route.component />
                    </AuthRoute>
                  }
                />
              ) : (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              );
            }
          })}
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
