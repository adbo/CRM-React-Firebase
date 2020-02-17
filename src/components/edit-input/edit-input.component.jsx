import React from 'react';

import CustomButton from '../../components/custom-button/custom-button.component';

import './edit-input.styles.scss';

const EditInput = ({ handleSubmit, name, value}) => {
  return (
    <div className='edit-input'>
      <form onSubmit={handleSubmit}>
        <input className='edit-input' name={name} value={value}/>
        <div className='buttons'>
          <CustomButton customClass='small-white'> Cancel </CustomButton>
          <CustomButton type='submit' customClass='small-green'> Save </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default EditInput;