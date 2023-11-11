import React from 'react'
import { Box, useTheme, Typography, useMediaQuery } from '@mui/material';
import Form from './Form';
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box width="100%">
      <Box
        backgroundColor={theme.palette.primary.light}
        p="1rem 6%"
        textAlign="center">
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          width="100%">
          404NOMORE
        </Typography>

      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.primary.light}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{
            mb: "1.5rem"
          }}>
          Your coding community where questions find answers!
        </Typography>
        <Form />
      </Box>

    </Box>);
};

export default LoginPage;


