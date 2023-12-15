/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Alert } from '@mui/material';
import ReactLoading from 'react-loading';
import useAuth from '../../../hooks/useAuth';

const LoginForm = () => {
  const { login } = useAuth();

  const [defaultValues, setDefaultValues] = React.useState({
    email: '',
    password: '',
  });

  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(defaultValues.email, defaultValues.password);
      console.log('submiteed', defaultValues);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="input-field">
          <label htmlFor="email">email</label>
          <input
            id="email"
            name="email"
            required
            type="email"
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
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            required
            type="password"
            value={defaultValues.password}
            onChange={(e) =>
              setDefaultValues({
                ...defaultValues,
                password: e.target.value,
              })
            }
          />
        </div>
        <div>
          {loading ? (
            <ReactLoading color="#107bea" />
          ) : (
            <button type="submit" className="btn btn-full">
              Sign In
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
