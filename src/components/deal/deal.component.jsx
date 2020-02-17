import React from 'react';
import { Link } from 'react-router-dom';

import './deal.styles.scss';

const Deal = ({ deal }) => {
  return (
    <Link to={`/deal/${deal.id}`}>
      <div className='deal'>
        <h4>{deal.title}</h4>
        <div>{deal.name}</div>
        <div className='value'>${deal.dealValue}</div>
      </div>
    </Link>
  );
}


export default Deal;