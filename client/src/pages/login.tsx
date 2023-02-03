import { Alert, Button, Container, Stack, TextField } from '@mui/material';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../config/routes';
import { AuthContext } from '../context/auth-context';
import { useSigninMutation } from '../graphql/auth/auth.generated';
import { useForm } from '../hooks/use-forms.hook';

interface ILoginpage {}

export const LoginPage: FC<ILoginpage> = () => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const signinInputs = {
    email: '',
    password: '',
  };

  const useFormCallBackFn = async () => {
    setErrors([]);
    const res = await signinUser();
    if (res.data?.signin.userErrors.length) {
      const errorMessage = res.data?.signin.userErrors[0].message;
      return setErrors([errorMessage]);
    }
    if (res.data?.signin.token && res.data.signin.user) {
      const { token, user } = res.data.signin;
      // userContext.userDispatch({ type: 'LOGIN', payload: { token, user } });
      userContext.login({ token });
      navigate(RoutePath.PROFILE);
    }
  };

  const { onChange, onSubmit, values } = useForm({
    callback: useFormCallBackFn,
    initialState: signinInputs,
  });

  const [errors, setErrors] = useState<string[]>([]);

  const [signinUser, { data, loading, error }] = useSigninMutation({
    onError() {
      setErrors((prevState) => {
        return prevState;
      });
    },
    variables: {
      signinInput: {
        email: values.email,
        password: values.password,
      },
    },
  });

  return (
    <Container sx={{ spacing: 2 }} maxWidth='sm'>
      <Stack paddingTop={2}>
        <h3>Login</h3>
        <p>This is the login page</p>
      </Stack>
      <Stack spacing={2} paddingTop={2} paddingBottom={2}>
        <TextField
          type='email'
          label='email'
          name='email'
          onChange={onChange}
          disabled={loading}
        />
        <TextField
          type='password'
          label='password'
          name='password'
          onChange={onChange}
          disabled={loading}
        />
      </Stack>
      {errors?.map((error, index) => {
        return (
          <Alert key={index} severity='error' sx={{ marginBottom: '1rem' }}>
            {error}
          </Alert>
        );
      })}
      <Button
        variant='contained'
        onClick={async () => await useFormCallBackFn()}
        disabled={loading}
      >
        Login
      </Button>
    </Container>
  );
};
