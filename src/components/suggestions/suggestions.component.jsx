import React from 'react';

import './suggestions.styles.scss';

const Suggestions = ({ suggestions, setContact }) => {
  return (
  <div className='suggestions'>
    <ul>
      {
        suggestions ? 
        suggestions.map(item => 
          <li onClick={() => setContact(item)} key={item.name} item={item}>{item.name}</li>)
        : null
      }
    </ul>
  </div>
)
}

export default Suggestions;