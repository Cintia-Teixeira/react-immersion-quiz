import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonBase = styled.button`  
  background-color: ${({ theme }) => theme.colors.primary};
color: ${({ theme }) => theme.colors.contrastText};
border-radius: ${({ theme }) => theme.borderRadius};
border: 0;
width: 100%;
height: 36px;
margin-top: 20px;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
font-weight: bold;
font-size: 14px;
line-height: 1;
text-transform: uppercase;
letter-spacing: 1.25px;
cursor: pointer;
  &:hover,
  &:focus {
    opacity: .5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

// eslint-disable-next-line react/prop-types
export default function Button({ disabled, children, ...props }) {
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonBase {...props} disabled={disabled}>{children}</ButtonBase>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
  /* disabled: PropTypes.bool, */
};
