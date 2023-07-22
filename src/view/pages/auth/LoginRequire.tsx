import {Lock} from '@mui/icons-material';
import {Alert, AlertTitle, Button, Container} from '@mui/material';
import React from 'react';
import {useNavigate} from "react-router-dom";

const LoginRequire = () => {
   const navigate = useNavigate();
   const handleLogin = () => {
      navigate(`/signin`, {replace: true});
   };
   return (
      <Container sx={{py: 5}}>
         <Alert severity="error" variant="outlined">
            <AlertTitle>Forbidden Access</AlertTitle>
            Please login or register to access this page
            <Button
               variant="outlined"
               sx={{ml: 2}}
               startIcon={<Lock/>}
               onClick={handleLogin}
            >
               login
            </Button>
         </Alert>
      </Container>
   );
};

export default LoginRequire;