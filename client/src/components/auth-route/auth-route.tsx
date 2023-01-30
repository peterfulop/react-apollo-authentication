import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '../../config/routes';
import UserContext from '../../context/user-context';
import { IReact } from '../../interfaces/common.interface';

export interface IAuthRouteProps extends IReact {}

export const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const { user } = useContext(UserContext).userState;

  console.log(user);

  if (user.id === '') {
    return <Navigate to={RoutePath.LOGIN} />;
  } else {
    return <>{children}</>;
  }
};
