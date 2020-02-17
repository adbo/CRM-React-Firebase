import React from "react";

import './custom-button.styles.scss';

const CustomButton = ({ children, customClass, ...otherProps }) => (
  <button
    className={`${customClass ? customClass : ''} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;