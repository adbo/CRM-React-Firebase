import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getDocuments } from '../../firebase/firebase.utils';

const Contact = () => {
  const type = 'contact';

  const [contactState, setContactState] = useState({});
  const { contactId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const snapShot = await getDocuments(contactId, type);
      const contact = snapShot.data();
      setContactState(contact);
    }
    getData();
  }, [contactId]);

  return (
    <div className='contact-page'>
      Contact Page
      <div>{contactId}</div>
      <div>{contactState.name}</div>
      <div>{contactState.company}</div>
      <div>{contactState.email}</div>
      <div>{contactState.postion}</div>
    </div>
)};

export default Contact;