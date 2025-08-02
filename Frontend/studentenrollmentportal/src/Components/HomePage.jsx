import { Container, Typography, Button, Stack, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PersonAdd, ManageAccounts, School } from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '90vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1), transparent 50%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper 
          elevation={24} 
          sx={{ 
            p: 6,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 35px 70px -12px rgba(0, 0, 0, 0.3)',
            }
          }}
        >
          <Box sx={{ mb: 4 }}>
            <School 
              sx={{ 
                fontSize: 64, 
                color: '#667eea',
                mb: 2,
                filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))'
              }} 
            />
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                mb: 2
              }}
            >
              Student Enrollment
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(0, 0, 0, 0.6)',
                fontWeight: 400,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Streamline your educational journey with our comprehensive student management platform
            </Typography>
          </Box>

          <Stack spacing={3} sx={{ maxWidth: '400px', mx: 'auto' }}>
            <Button 
              variant="contained"
              size="large"
              startIcon={<PersonAdd />}
              onClick={() => navigate('/register')}
              sx={{
                py: 2,
                px: 4,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                }
              }}
            >
              Register New Student
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ManageAccounts />}
              onClick={() => navigate('/manage')}
              sx={{
                py: 2,
                px: 4,
                borderRadius: '16px',
                borderWidth: '2px',
                borderColor: '#667eea',
                color: '#667eea',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#667eea',
                  backgroundColor: 'rgba(102, 126, 234, 0.08)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                }
              }}
            >
              Manage Students
            </Button>
          </Stack>

          <Box 
            sx={{ 
              mt: 5, 
              pt: 4, 
              borderTop: '1px solid rgba(0, 0, 0, 0.1)' 
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(0, 0, 0, 0.5)',
                fontSize: '0.875rem'
              }}
            >
              Empowering education through seamless technology
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;