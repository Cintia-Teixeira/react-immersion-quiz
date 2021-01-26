import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 60px 15px 15px 15px;
  }
`;

export default function QuizPage() {
  const router = useRouter();
  const { name } = router.query;
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <h2>
          Vamos jogar,
          {' '}
          {name}
          !
        </h2>
        <Widget>
          <Widget.Header>
            <h1>Pergunta 1 de 5</h1>
          </Widget.Header>
          <Widget.Content>
            <h1>{db.title}</h1>
            <p>{db.description}</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
