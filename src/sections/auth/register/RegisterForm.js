/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import {  useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate()

  const [defaultValues, setDefaultValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    comfirmPassword: '',
    type : 'admin'
  });
  const [errors, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { password, comfirmPassword } = defaultValues;
      if (password !== comfirmPassword) {
        setError('password does not match');
        setLoading(false);
        return;
      }
      await register(defaultValues).then(() => {
        navigate('/user/settings')
        setLoading(false);
      })
     
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);

    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        {errors && <Alert severity="error">{errors}</Alert>}
        <div className="input-field">
          
          <input
            id="email"
            name="email"
            required
            type="email"
            placeholder='Email'
            value={defaultValues.email}
            onChange={(e) =>
              setDefaultValues({
                ...defaultValues,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          
          <input
            id="password"
            name="password"
            required
            type="password"
            placeholder='Password'
            value={defaultValues.password}
            onChange={(e) =>
              setDefaultValues({
                ...defaultValues,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          <input
            id="password"
            name="confirmPassword"
            required
            placeholder='Password'
            type="password"
            value={defaultValues.comfirmPassword}
            onChange={(e) =>
              setDefaultValues({
                ...defaultValues,
                comfirmPassword: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          <input
            id="password"
            name="firstName"
            placeholder='First name'
            required
            type="text"
            value={defaultValues.firstName}
            onChange={(e) =>
              setDefaultValues({
                ...defaultValues,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          <input
            id="password"
            name="lastName"
            required
            placeholder='Last name'
            type="text"
            value={defaultValues.lastName}
            onChange={(e) =>
              setDefaultValues({
                ...defaultValues,
                lastName: e.target.value,
              })
            }
          />
        </div>
        <div>
        <LoadingButton  type = 'submit' variant="contained" loading = {loading}>
            Create Admin
        </LoadingButton>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
