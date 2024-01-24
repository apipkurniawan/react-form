import { useState } from 'react';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';

export default function LoginState() {
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: '',
  });

  const isValidEmail =
    isNotEmpty(enteredValue.email) && isEmail(enteredValue.email);
  const isValidPassword =
    isNotEmpty(enteredValue.password) && hasMinLength(enteredValue.password, 6);

  function handleChange(identifier, value) {
    setEnteredValue((prevValue) => ({ ...prevValue, [identifier]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValidEmail && !isValidPassword) {
      return;
    }

    console.log('submitted..', enteredValue);

    // reset value
    setTimeout(() => {
      reset();
    }, 1000);
  }

  function reset() {
    setEnteredValue({
      email: '',
      password: '',
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={enteredValue.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {!isValidEmail && (
            <div className='control-error'>Email is invalid!</div>
          )}
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={enteredValue.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          {!isValidPassword && (
            <div className='control-error'>Password must be 6 char!</div>
          )}
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
