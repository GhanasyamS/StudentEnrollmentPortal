import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: "linear-gradient(135deg, rgb(98, 1, 75),rgb(92, 71, 111), rgb(0, 40, 40))",
     p: 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Student Enrollment Portal
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          <Button color="inherit" onClick={() => navigate('/manage')}>Manage</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
