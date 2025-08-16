import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LoginForm from '../components/LoginForm'; 
import RegisterForm from '../components/RegisterForm'; 

function AuthPage() {
  const [alignment, setAlignment] = useState('login');


  const handleChange = (event, newAlignment) => {

    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };


  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      
      <ToggleButtonGroup
        color="primary"
        value={alignment}    
        exclusive        
        onChange={handleChange}
        aria-label="Plataforma de autenticación"
      >
        <ToggleButton value="login">Login</ToggleButton>
        <ToggleButton value="register">Register</ToggleButton>
      </ToggleButtonGroup>


      <div className="mt-4 w-100" style={{ maxWidth: '400px' }}>
        {alignment === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

export default AuthPage;