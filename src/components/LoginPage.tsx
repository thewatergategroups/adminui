import React from 'react';
import {
  TextField,Stack, Button
} from '@mui/material';


const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    console.log(username)
    console.log(password)

  } 

  return (
    <Stack>
        <TextField id="username" label="Username" variant="outlined" onChange={(user)=> setUsername(user.target.value)} />
        <TextField id="password" label="Password" variant="outlined" type="password" onChange={(pass)=> setPassword(pass.target.value)}/>
        <Button variant="outlined" onClick={login}>Login</Button>
    </Stack>
  );
};

export default LoginPage;
