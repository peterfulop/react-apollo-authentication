import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../config/routes';

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' component='div'>
            <Link
              to={RoutePath.HOME}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              React-Apollo-Auth
            </Link>
          </Typography>
          <Box alignItems='right' sx={{ flexGrow: 1, textAlign: 'right' }}>
            <Link
              to={RoutePath.PROFILE}
              style={{
                textDecoration: 'none',
                color: 'white',
                marginRight: '1rem',
              }}
            >
              Profile
            </Link>
            <Link
              to={RoutePath.LOGIN}
              style={{
                textDecoration: 'none',
                color: 'white',
                marginRight: '1rem',
              }}
            >
              Login
            </Link>
            <Link
              to={RoutePath.REGISTER}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Register
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
