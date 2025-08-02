import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ background: "linear-gradient(135deg, rgb(98, 1, 75),rgb(92, 71, 111), rgb(0, 40, 40))",
        p: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="white">
        © {new Date().getFullYear()} Student Enrollment Portal. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
