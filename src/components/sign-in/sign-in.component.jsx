import React, { useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss'

const SignIn = () => {
  const [signInState, setSignInState] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = signInState;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setSignInState({
        email: '',
        password: ''
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setSignInState({
      ...signInState,
      [name]: value
    })
  }

  return (
    <div className='sign-in'>
      <h2>I have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          name='email' 
          type='email' 
          value={signInState.email} 
          handleChange={handleChange} 
          required 
          label='Email' />
        <FormInput 
          name='password' 
          type='password' 
          value={signInState.password} 
          handleChange={handleChange} 
          required 
          label='Password' />
        <div className='buttons'>
          <CustomButton type='submit'> Sign in </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
        </CustomButton>
        </div>
      </form>
    </div>
  )
};

export default SignIn;