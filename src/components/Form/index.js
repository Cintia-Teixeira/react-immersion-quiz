import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export const ButtonWrapper = styled.button`
width: 100%;
height: 36px;
margin-top: 25px;
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

export const InputWrapper = styled.input`
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

// eslint-disable-next-line react/prop-types
export default function Form() {
  const router = useRouter();

  const [name, setName] = React.useState('');

  const Btn = ButtonWrapper;

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputWrapper type="text" placeholder="Diz aí seu nome pra jogar :)" onChange={(e) => setName(e.target.value)} />
      <Btn type="submit" disabled={name.length === 0}>
        Jogar
      </Btn>
    </form>
  );
}
