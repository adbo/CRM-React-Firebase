import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getDocuments } from '../../firebase/firebase.utils';

const Contact = () => {
  const type = 'contact';

  const [contactState, setContactState] = useState({});
  const { contactId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const snapShot = await getDocuments(contactId, type, 'name');
      const contact = snapShot.data();
      setContactState(contact);
    }
    getData();
  }, [contactId]);

  return (
    <div className='contact-page'>
      Contact Page
      <h3>{contactState.name}</h3>
      <div>Organization: {contactState.company}</div>
      <div>Email: {contactState.email}</div>
      <div>Position: {contactState.position}</div>
    </div>
)};

export default Contact;