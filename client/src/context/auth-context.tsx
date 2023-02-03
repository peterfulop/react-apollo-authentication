import jwtDecode, { JwtPayload } from 'jwt-decode';
import { createContext, useReducer } from 'react';

type InitialState = {
  user: string | null;
};
const initialState: InitialState = {
  user: null,
};

const token = localStorage.getItem('token');

if (token) {
  const decodedToken = jwtDecode<JwtPayload>(token);

  if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.user = decodedToken as unknown as string;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData: any) => {},
  logout: () => {},
});

function authReducer(state: any, action: any) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: any) => {
    localStorage.setItem('token', userData.token);
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = (userData: any) => {
    localStorage.remove('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
