import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChangeEmailHandler = (e) => {
    const value = e.target.value;

    setEmail(value);
  };

  const onChangePasswordHandler = (e) => {
    const value = e.target.value;

    setPassword(value);
  };

  const onSubmitButtonHandler = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email,
        password,
      };

      const loginResponse = await axios.post('http://localhost:2000/login', payload);
      if (loginResponse.status === 200) {
        const jwtToken = loginResponse.data.data.token;
        localStorage.setItem('user_token', jwtToken);
        navigate('/');
      }
    } catch (err) {
      console.log('unsuccessfull login', err);
    }
  };

  const onLoginGoogleSuccess = async (credentialResponse) => {
    try {
      const userToLoginPayload = {
        google_credential: credentialResponse.credential,
      };
      console.log('coba', userToLoginPayload);
      const loginGoogleRequest = await axios.post('http://localhost:2000/login-google', userToLoginPayload);
      console.log('coba1', loginGoogleRequest);
      const loginGoogleResponse = loginGoogleRequest.data;
      console.log('coba2', loginGoogleResponse);

      if (loginGoogleResponse.status) {
        localStorage.setItem('token', loginGoogleResponse.data.token);

        navigate('/');
      }
    } catch (err) {
      console.log('Login Gagal: ', err);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmitButtonHandler(e)}>
        <div>
          Email: <input onChange={(e) => onChangeEmailHandler(e)} />
        </div>
        <div>
          Password: <input onChange={(e) => onChangePasswordHandler(e)} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        <GoogleOAuthProvider clientId="614483928198-kob5tnjh1asuh1g2cq31ctp0cjgugl5s.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={onLoginGoogleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default LoginPage;
