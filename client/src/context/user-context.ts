import { createContext } from 'react';
import { User } from '../apollo/graphql-generated/types';

export interface IUserState {
  user: User;
  token: string;
}

export const DEFAULT_USER: User = {
  id: '',
  name: '',
  email: '',
};

export const DEFAULT_TOKEN = '';

export const initialUserState: IUserState = {
  user: DEFAULT_USER,
  token: DEFAULT_TOKEN,
};

export interface IUserActions {
  type: 'LOGIN' | 'LOGOUT';
  payload: IUserState;
}

export const userReducer = (state: IUserState, action: IUserActions) => {
  const user = action.payload.user;
  const token = action.payload.token;
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', token);
      return { user, token };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return initialUserState;
    default:
      return state;
  }
};

export interface IUserContextProps {
  userState: IUserState;
  userDispatch: React.Dispatch<IUserActions>;
}

const UserContext = createContext<IUserContextProps>({
  userState: initialUserState,
  userDispatch: () => {},
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;

export default UserContext;
