import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getDocuments } from '../../firebase/firebase.utils';

import CustomButton from '../../components/custom-button/custom-button.component';

import './contact-list.styles.scss';

const ContactList = () => {
  const type = 'contact';

  const [contactListState, setContactListState] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const snapShot = await getDocuments(null, type);
      const contacts = snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContactListState(contacts);
    }
    getData();
  }, []);

  const getTableData = contacts =>
    contacts.map(contact => (
      <tr key={contact.id}>
        <td><Link to={`/contact/${contact.id}`}>{contact.name}</Link></td>
        <td>{contact.company}</td>
        <td>{contact.email}</td>
        <td>{contact.position}</td>
      </tr>
    ));

  return (
    <div className='contact-list-page'>
      <Link className='option' to='/contact-form'>
        <CustomButton customClass='action-button'> Add person </CustomButton>
      </Link>
      <div className='contact-list-table'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {getTableData(contactListState)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContactList;