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
  const [showPassword, setShowPassword] = React.useState(false);

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
            type={showPassword ? 'text' : 'password'}
            value={defaultValues.password}
            onChange={(e) =>
              setDefaultValues({
                ...defaultValues,
                password: e.target.value,
              })
            }
          />
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px', gap: '8px' }}>
            <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px' }}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: showPassword ? '#107bea' : '#ccc',
                  borderRadius: '22px',
                  transition: '0.3s',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    height: '16px',
                    width: '16px',
                    left: showPassword ? '21px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                  }}
                />
              </span>
            </label>
            <span style={{ fontSize: '13px', color: '#666' }}>Show password</span>
          </div>
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
