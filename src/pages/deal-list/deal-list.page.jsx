import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getDocuments } from '../../firebase/firebase.utils';

import CustomButton from '../../components/custom-button/custom-button.component';

import './deal-list.styles.scss';

const DealList = () => {
  const type = 'deal';
  const sortedDeals = [{deals: []}, {deals: []}, {deals: []}, {deals: []}, {deals: []}];

  useEffect(() => {
    const getData = async () => {
      const unpackDeals = deals =>
        deals.map(deal =>
          sortedDeals[deal.status].deals.push(deal)
        );

      const snapShot = await getDocuments(null, type);
      const deals = snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      unpackDeals(deals);
    }
    getData();
  }, [sortedDeals]);

  const renderDeals = deals =>
    deals.map((status, index) =>
      (
        <div id={`status-${index}`} key={index}>
          {renderDeal(status)}
        </div>
      )
    );

  const renderDeal = status =>
    status.deals.map(deal =>
      <div>
        {deal.name}
      </div>
    )

  return (
    <div className='deal-list-page'>
      <Link className='option' to='/deal-form'>
        <CustomButton isActionButton> Add deal </CustomButton>
      </Link>
      <div className='deal-list-table'>
        {renderDeals(sortedDeals)}
      </div>
    </div>
  )
}

export default DealList;