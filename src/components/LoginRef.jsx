//! not recommended to create form using useRef
import { useRef, useState } from 'react';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';

export default function LoginRef() {
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    isNotEmpty(email) && isEmail(email)
      ? setEmailIsValid(true)
      : setEmailIsValid(false);

    isNotEmpty(password) && hasMinLength(password, 6)
      ? setPasswordIsValid(true)
      : setPasswordIsValid(false);

    if (emailIsValid && passwordIsValid) {
      console.log('email : ', email);
      console.log('password : ', password);
      console.log('Send to HTTP Request!');

      // reset value
      setTimeout(() => {
        reset();
      }, 1000);
    }
  }

  function reset() {
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' ref={emailRef} />
          {!emailIsValid && (
            <div className='control-error'>Email is invalid!</div>
          )}
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            ref={passwordRef}
          />
          {!passwordIsValid && (
            <div className='control-error'>Password must be 6 char!</div>
          )}
        </div>
      </div>

      <p className='form-actions'>
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button type='submit' className='button'>
          Login
        </button>
      </p>
    </form>
  );
}
