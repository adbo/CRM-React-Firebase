import React, { useState } from 'react';

import { createDocument } from '../../firebase/firebase.utils';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './contact-form.styles.scss';


const ContactForm = props => {
  const type = 'contact';

  const [contactsFormState, setContactsFormState] = useState({
    name: '',
    company: '',
    email: '',
    position: ''
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const contactRef = await createDocument(contactsFormState, type);
    props.history.push(`/${type}/${contactRef.id}`);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setContactsFormState({
      ...contactsFormState,
      [name]: value
    })
  }

  return (
    <div className='contact-form'>
      <h2>Add person</h2>
      <span>Provide information about your new contact</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          name='name'
          type='text'
          value={contactsFormState.name} 
          handleChange={handleChange} 
          required 
          label='Name' />
        <FormInput 
          name='company'
          type='company'
          value={contactsFormState.company} 
          handleChange={handleChange} 
          required 
          label='Company' />
        <FormInput 
          name='email'
          type='email'
          value={contactsFormState.email} 
          handleChange={handleChange} 
          required 
          label='Email' />
        <FormInput 
          name='position'
          type='position'
          value={contactsFormState.position} 
          handleChange={handleChange} 
          required 
          label='Position' />
        <div className='buttons'>
          <CustomButton type='submit'> Add person </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;