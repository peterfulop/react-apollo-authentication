import jwtDecode, { JwtPayload } from 'jwt-decode';
import { createContext, useReducer } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type InitialState = {
  user: User;
};

type UserData = {
  user: User;
};

enum Action {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type ActionTypes = {
  type: Action;
  payload?: {
    user: User;
  };
};

const initialState: InitialState = {
  user: {
    id: '',
    name: '',
    email: '',
    token: '',
  },
};

const token = localStorage.getItem('token');

if (token) {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken && Number(decodedToken?.exp) * 1000 > Date.now()) {
      initialState.user.token = String(decodedToken);
    } else {
      localStorage.removeItem('token');
    }
  } catch (error) {
    localStorage.removeItem('token');
  }
}

const AuthContext = createContext({
  user: null,
  login: (_userData: UserData) => {},
  logout: () => {},
});

function authReducer(state: InitialState, action: ActionTypes): InitialState {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: {
          token: action.payload?.user.token,
          email: action.payload?.user.email,
          id: action.payload?.user.id,
        } as User,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: UserData) => {
    localStorage.setItem('token', userData.user.token);
    dispatch({ type: Action.LOGIN, payload: { ...userData } });
  };

  const logout = () => {
    localStorage.remove('token');
    dispatch({ type: Action.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
