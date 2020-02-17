import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Deal from '../../components/deal/deal.component';
//import EditInput from '../../components/edit-input/edit-input.component'

import { getDocuments } from '../../firebase/firebase.utils';

const Contact = () => {

  const [contactState, setContactState] = useState({});
  const [contactDealState, setContactDealState] = useState(null);
  const { contactId } = useParams();

  useEffect(() => {
    const getContacts = async () => {
      const type = 'contact';
      const snapShot = await getDocuments(contactId, type);
      const contact = snapShot.data();
      setContactState(contact);
    }
    getContacts();
  }, [contactId]);

  useEffect(() => {
    const getDeals = async contact => {
      const type = 'deal';
      const where = {
        field: 'name',
        operator: '==',
        condition: contact.name
      }
      const snapShot = await getDocuments(null, type, null, where);
      const deals = snapShot.docs;
      let dealList = []
      for(let deal of deals) {
        dealList.push({
          id: deal.id,
          ...deal.data()
        });
      }
      setContactDealState(dealList);
    }
    if (contactState.name)
      getDeals(contactState);
  }, [contactState]);

  return (
    <div className='contact-page'>
      <div className='contact-details'>
        Contact Page
        <h3>{contactState.name}</h3>
        <div>Organization: {contactState.company}</div>
        <div>Email: {contactState.email}</div>
        <div>Position: {contactState.position}</div>
      </div>
      <div className='contact-deals'>
        <h3>Deals:</h3>
        {
          contactDealState ?
          contactDealState.map(
            deal =>
            (
              <Deal key={deal.id} deal={deal} />
            )
          )
          : null
        }
      </div>
    </div>
)};

export default Contact;