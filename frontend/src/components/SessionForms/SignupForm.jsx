import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const usernameSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)); 
  }

  return (
    <div className='form-container' id="sign-up-form">
      <form className="session-form" onSubmit={usernameSubmit}>
        <h2 className='form-title'>Sign Up Form</h2>
        <div className="errors">{errors?.email}</div>
        <label>
          <span className='session-label'>
            <h2 className='session-label-text'>
              Email:
            </h2>
          </span>
          <br/>
          <input type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
            className='session-input'
          />
        </label>
        <div className="errors">{errors?.username}</div>
        <label>
          <span className='session-label'>
            <h2 className='session-label-text'>
              Username:
            </h2>
          </span>
        <br/>
          <input type="text"
            value={username}
            onChange={update('username')}
            placeholder="Username"
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
        <br/>
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
            className='session-input'
          />
        </label>
        <div className="errors">
          {password !== password2 && 'Confirm Password field must match'}
        </div>
        <label>
          <span className='session-label'>
            <h2 className='session-label-text'>
              Confirm Password:
            </h2>
          </span>
        <br/>
          <input type="password"
            value={password2}
            onChange={update('password2')}
            placeholder="Confirm Password"
            className='session-input'
          />
        </label>
        <input
          className='session-form-submit-button'
          type="submit"
          value="Sign Up"
          disabled={!email || !username || !password || password !== password2}
        />
      </form>
    </div>
  );
}

export default SignupForm;