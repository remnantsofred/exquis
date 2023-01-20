import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  const handleDemoLogin = (e) => {
    const email = "demo-user@appacademy.io";
    const password = "password";
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  return (
    <div className='form-container'>
      <form className="session-form" onSubmit={handleSubmit}>
        <h2 className='form-title'>Log In</h2>
        <div className="errors">{errors?.email}</div>
        <label>
          <span className='session-label'>
            <h2 className='session-label-text'>            
              Email:
            </h2>
          </span>
          <br />
          <input type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
            className='session-input'
          />
        </label>
        <div className="errors">{errors?.password}</div>
        <label>
          <span className='session-label'>
            <h2 className='session-label-text'>            
              Password:
            </h2>
          </span>
          <br />
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
            className='session-input'
          />
        </label>
        <br />
        <input
          className='session-form-submit-button'
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
        <br />
        <input
          className='session-form-submit-button'
          type="submit"
          value="Demo Log In"
          onClick={handleDemoLogin}
        />
      </form>
      
    </div>
  );
}

export default LoginForm;