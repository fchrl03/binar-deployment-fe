import React from 'react';
import RegisterInput from '../components/RegisterInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChangeNameHandler = (e) => {
    const value = e.target.value;

    setName(value);
  };

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
        name,
        email,
        password,
      };

      const registerResponse = await axios.post('http://localhost:2000/register', payload);
      if (registerResponse.status_code === 201) {
        console.log('successful register');
        navigate('/login');
      }
    } catch (err) {
      console.log('Failed Register:', err);
    }
  };
  return (
    <div>
      {/* <form>
        <div>
          Name: <input type="text" onChange={(e) => onChangeNameHandler(e)} placeholder="Input Name" />
        </div>
        <div>
          Email: <input type="email" onChange={(e) => onChangeEmailHandler(e)} placeholder="Input Email" />
        </div>
        <div>
          Password: <input type="text" onChange={(e) => onChangePasswordHandler(e)} placeholder="Input Password" />
        </div>
        <div>
          <button onClick={(e) => onSubmitButtonHandler(e)}>Submit</button>
        </div>
      </form> */}
      <RegisterInput name={(e) => onChangeNameHandler(e)} email={(e) => onChangeEmailHandler(e)} password={(e) => onChangePasswordHandler(e)} onFormSubmit={(e) => onSubmitButtonHandler(e)} />
    </div>
  );
}

export default RegisterPage;
