import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getDocuments } from '../../firebase/firebase.utils';

import CustomButton from '../../components/custom-button/custom-button.component';

import './deal-list.styles.scss';

const DealList = () => {
  const type = 'deal';
  const [dealState, setDealState] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const snapShot = await getDocuments(null, type);
      const deals = snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDealState(deals);
    }
    getData();
  }, []);

  const getTableData = deals =>
    deals.map(deal => (
      <tr key={deal.id}>
        <td><Link to={`/deal/${deal.id}`}>{deal.title}</Link></td>
        <td>{deal.name}</td>
        <td>{deal.company}</td>
        <td>${deal.dealValue}</td>
        <td>{deal.date}</td>
      </tr>
    ));

  return (
    <div className='deal-list-page'>
      <Link className='option' to='/deal-form'>
        <CustomButton isActionButton> Add deal </CustomButton>
      </Link>
      <div className='deal-list-table'>
        <table className='table'>
          <thead>
            <tr>
              <th>Deal title</th>
              <th>Name</th>
              <th>Organization</th>
              <th>Deal value</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {getTableData(dealState)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DealList;