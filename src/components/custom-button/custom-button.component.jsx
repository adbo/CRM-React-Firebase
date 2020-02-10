import React from "react";

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, isActionButton, ...otherProps }) => (
  <button
    className={`${isGoogleSignIn ? 'google-sign-in ' : ''}${isActionButton ? 'action-button ' : ''}custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;