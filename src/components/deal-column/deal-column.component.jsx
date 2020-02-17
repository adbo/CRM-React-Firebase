import React from 'react';

import Deal from '../deal/deal.component';

import './deal-column.styles.scss';

const DealColumn = props =>
  <div className={`column-status status-${props.status.value}`}>
    <div className='column-title'>{props.status.name}</div>
    {props.data.map(deal => 
      <Deal key={deal.id} deal={deal} />
    )}
  </div>

export default DealColumn;