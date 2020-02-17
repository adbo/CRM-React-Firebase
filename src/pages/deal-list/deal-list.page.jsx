import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getDocuments } from '../../firebase/firebase.utils';

import CustomButton from '../../components/custom-button/custom-button.component';
import DealColumn from '../../components/deal-column/deal-column.component';

import './deal-list.styles.scss';

const DealList = () => {
  const type = 'deal';
  const statuses = [
    {
      value: 0,
      name: 'Lead In'
    },
    {
      value: 1,
      name: 'Contact made'
    },
    {
      value: 2,
      name: 'Demo scheduled'
    },
    {
      value: 3,
      name: 'Proposal made'
    },
    {
      value: 4,
      name: 'Negotiations started'
    }
  ];
  const [dealState, setDealState] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const snapShot = await getDocuments(null, type);
      const deals = snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDealState(deals);
      console.log(deals);
    }
    getData();
  }, []);

  return (
    <div className='deal-list-page'>
      <Link className='option' to='/deal-form'>
        <CustomButton customClass='action-button'> Add deal </CustomButton>
      </Link>
      <div className='list-container'>
        {
          statuses.map(status =>
            <DealColumn 
              key={status.value}
              status={status} 
              data={dealState.filter(deal => deal.status === status.value)}
            />
          )
        }
      </div>
    </div>
  )
}

export default DealList;