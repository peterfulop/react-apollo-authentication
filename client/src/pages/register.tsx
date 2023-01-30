import { Alert, Button, Container, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user-context';
import { useSignupMutation } from '../graphql/auth/auth.generated';
import { useForm } from '../hooks/use-forms.hook';

export const RegisterPage: FC = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);

  const signupInputs = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const useFormCallBackFn = async () => {
    setErrors([]);
    const res = await signupUser();
    if (res.data?.signup.userErrors.length) {
      const errorMessage = res.data?.signup.userErrors[0].message;
      return setErrors([errorMessage]);
    }
  };

  const { onChange, onSubmit, values } = useForm({
    callback: useFormCallBackFn,
    initialState: signupInputs,
  });

  const [errors, setErrors] = useState<string[]>([]);

  const [signupUser, { loading }] = useSignupMutation({
    onError() {
      setErrors((prevState) => {
        return prevState;
      });
    },
    variables: {
      input: {
        name: values.name,
        credentials: {
          email: values.email,
          password: values.password,
        },
        passwordConfirm: values.passwordConfirm,
      },
    },
  });

  return (
    <Container sx={{ spacing: 2 }} maxWidth='sm'>
      <Stack paddingTop={2}>
        <h3>Register</h3>
        <p>This is the register page, register below to create an account</p>
      </Stack>
      <Stack spacing={2} paddingTop={2} paddingBottom={2}>
        <TextField
          type='text'
          label='username'
          name='name'
          onChange={onChange}
          disabled={loading}
        />
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
        <TextField
          type='password'
          label='password confirmation'
          name='passwordConfirm'
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
        Submit
      </Button>
    </Container>
  );
};
