import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonBase = styled.button`
width: 100%;
height: 36px;
margin-top: 20px;
box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
border-radius: 4px;
background: #f9dd3c;
font-family: Lato;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
text-align: center;
letter-spacing: 1.25px;
text-transform: uppercase;
color: #fff
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
