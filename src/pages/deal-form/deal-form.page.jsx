import React, { useState } from 'react';

import { createDocument, getDocuments } from '../../firebase/firebase.utils';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import Suggestions from '../../components/suggestions/suggestions.component';

import './deal-form.styles.scss';

const DealForm = props => {
  const type = 'deal';

  const [dealFormState, setDealFormState] = useState({
    name: '',
    company: '',
    title: '',
    dealValue: '',
    date: '',
    status: 0
  });

  const [suggestionsState, setSuggestionsState] = useState(null);
  
  const [dateFocus, setDateFocus] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    const contactRef = await createDocument(dealFormState, type);
    props.history.push(`/${type}/${contactRef.id}`);
  }

  const handleChange = event => {
    if (event === null || event.target === undefined) {
      setDealFormState({
        ...dealFormState,
        date: event
      })
    } else {
      const { name, value } = event.target;
      setDealFormState({
        ...dealFormState,
        [name]: value
      });
    }
  }

  const handleFocus = () => {
    setDateFocus(!dateFocus);
  }

  const handleNameChange = async event => {
    const { name, value } = event.target;

    setDealFormState({
      ...dealFormState,
      [name]: value
    });

    let docList = [];
    const getContacts = async name => {
      const type = 'contact';
      const whereFrom = {
        field: 'name',
        operator: '>=',
        condition: name
      }

      const whereTo = {
        field: 'name',
        operator: '<=',
        condition: name + '\uf8ff'
      }

      const snapShot = await getDocuments(null, type, null, whereFrom, whereTo);
      const docs = snapShot.docs;
      for(let doc of docs) {
        docList.push(doc.data());
      }
    }

    if(value.length === 2)
      await getContacts(value);
    
    setSuggestionsState(docList);
  }

  const setContact = contact => {
    setDealFormState({
      ...dealFormState,
      name: contact.name,
      company: contact.company,
      title: `${contact.company} deal`
    });

    setSuggestionsState(null);
  }

  return (
    <div className='deal-form'>
      <h2>Add deal</h2>
      <span>Provide information about your new deal</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          name='name'
          type='text'
          value={dealFormState.name} 
          handleChange={handleNameChange} 
          required 
          label='Name' />
        <Suggestions setContact={setContact} suggestions={suggestionsState} />
        <FormInput 
          name='company'
          type='text'
          value={dealFormState.company} 
          handleChange={handleChange} 
          required 
          label='Company' />
        <FormInput 
          name='title'
          type='text'
          value={dealFormState.title} 
          handleChange={handleChange} 
          required 
          label='Title' />
        <FormInput 
          name='dealValue'
          type='text'
          value={dealFormState.dealValue} 
          handleChange={handleChange}  
          label='Deal value' />
        <FormInput 
          name='date'
          type={dateFocus === true || dealFormState.date !== '' ? 'date' : 'text'}
          onFocus={handleFocus}
          onBlur={handleFocus}
          value={dealFormState.date} 
          handleChange={handleChange} 
          placeholder='' 
          label='Date' />
        <div className='buttons'>
          <CustomButton type='submit'> Add deal </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default DealForm;