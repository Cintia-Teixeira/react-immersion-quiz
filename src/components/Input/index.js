import React from 'react';
import styled from 'styled-components';

const InputBase = styled.input`
width: 100%;
height: 38px;
margin-top: 10px;
margin-left: 1px;
border-radius: 3,5px;
background-color: transparent;
font-size: 14px;
line-height: 24px;
letter-spacing: 0.15px;
color: #ffffff;
::-webkit-input-placeholder {
   color: #ffffff;
}
`;

export default function Input(props) {
  return (
    <div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <InputBase {...props} />
    </div>
  );
}
