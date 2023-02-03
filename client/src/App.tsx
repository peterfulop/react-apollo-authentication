import { FC, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from './components/auth-route/auth-route';
import { Navbar } from './components/navbar/navbar';
import routes from './config/routes';
import { AuthContext, AuthProvider } from './context/auth-context';
import { Validate } from './modules/validate';
export interface IApplicationProps {}

export const App: FC<IApplicationProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const checkLocalStorageForCredentials = async () => {
      setLoading(false);
      const token = localStorage.getItem('token');
      if (token === null) {
        authContext.logout();
      } else {
        return Validate({
          token,
          callback: (error, user) => {
            if (error) {
              authContext.logout();
            } else if (user) {
              authContext.login({ user: { ...user, token } });
              setLoading(false);
            }
          },
        });
      }
    };
    checkLocalStorageForCredentials();
  }, []);

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
