import { Alert, Button, Container } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../config/routes';
import UserContext from '../context/user-context';
import { useConfirmUserMutation } from '../graphql/auth/auth.generated';

export const UserConfirmPage: FC = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { token } = useParams();

  const [errors, setErrors] = useState<string[]>([]);

  const confirmUserRegistration = async () => {
    const res = await confirmUser();
    console.log(res);
    if (res.data?.confirmUser.userErrors.length) {
      const errorMessage = res.data?.confirmUser.userErrors[0].message;
      return setErrors([errorMessage]);
    } else if (res.data?.confirmUser.user && res.data.confirmUser.token) {
      const { token, user } = res.data.confirmUser;
      userContext.userDispatch({ type: 'LOGIN', payload: { user, token } });
      navigate(RoutePath.PROFILE);
    }
  };

  const [confirmUser, { loading }] = useConfirmUserMutation({
    onError() {
      setErrors((prevState) => {
        return prevState;
      });
    },
    variables: {
      confirmUserToken: token as string,
    },
  });

  return (
    <Container sx={{ spacing: 2 }} maxWidth='sm'>
      <Stack paddingTop={2}>
        <h3>Confirm your registration by email!</h3>
        <p>Click the button below to confirm your registration:</p>
      </Stack>
      <Stack spacing={2} paddingTop={2} paddingBottom={2}></Stack>
      {errors?.map((error, index) => {
        return (
          <Alert key={index} severity='error' sx={{ marginBottom: '1rem' }}>
            {error}
          </Alert>
        );
      })}
      <Button
        variant='contained'
        onClick={async () => await confirmUserRegistration()}
        disabled={loading}
      >
        Confirm my account!
      </Button>
    </Container>
  );
};
