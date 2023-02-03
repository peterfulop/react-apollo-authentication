import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '../../config/routes';
import { AuthContext } from '../../context/auth-context';
import { IReact } from '../../interfaces/common.interface';

export interface IAuthRouteProps extends IReact {}

export const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={RoutePath.LOGIN} />;
  } else {
    return <>{children}</>;
  }
};
