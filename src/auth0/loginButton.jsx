import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    <button className="btn btn-outline-primary" onClick={loginWithRedirect}><h2>Log In</h2></button>
  );
}

export default LoginButton;