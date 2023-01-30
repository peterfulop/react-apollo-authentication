import IRoute from '../interfaces/route.interface';
import { NotFoundPage } from '../pages/404';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/login';
import { ProfilePage } from '../pages/profile';
import { RegisterPage } from '../pages/register';
import { UserConfirmPage } from '../pages/user-confirm';

export enum RoutePath {
  LOGIN = '/login',
  REGISTER = '/register',
  PROFILE = '/profile',
  HOME = '/',
  USER_CONFIRM = '/user/confirm/:token',
  NOT_FOUND = '/*',
}

const authRoutes: IRoute[] = [
  {
    path: RoutePath.LOGIN,
    auth: false,
    component: LoginPage,
    name: 'Login',
  },
  {
    path: RoutePath.REGISTER,
    auth: false,
    component: RegisterPage,
    name: 'Register',
  },
];

const mainRoutes: IRoute[] = [
  {
    path: RoutePath.HOME,
    auth: false,
    component: HomePage,
    name: 'Home',
  },
  {
    path: RoutePath.PROFILE,
    auth: true,
    component: ProfilePage,
    name: 'Profile',
  },
  {
    path: RoutePath.USER_CONFIRM,
    auth: false,
    component: UserConfirmPage,
    name: 'User confirm',
  },
  {
    path: RoutePath.NOT_FOUND,
    auth: false,
    component: NotFoundPage,
    name: '404',
  },
];

const routes: IRoute[] = [...authRoutes, ...mainRoutes];

export default routes;
