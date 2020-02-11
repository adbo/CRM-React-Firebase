import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getDocuments } from '../../firebase/firebase.utils';

import './deal.styles.scss';

const Deal = () => {
  const type = 'deal';

  const [dealState, setDealState] = useState({});
  const { dealId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const snapShot = await getDocuments(dealId, type);
      const deal = snapShot.data();
      setDealState(deal);
    }
    getData();
  }, [dealId]);

  return (
    <div className='deal-page'>
      Deal Page
      <h3>{dealState.title}</h3>
      <div>Name: {dealState.name}</div>
      <div>Organization: {dealState.company}</div>
      <div>DealValue: {dealState.dealValue}</div>
      <div>Date: {dealState.date}</div>
    </div>  
  );
}

export default Deal;