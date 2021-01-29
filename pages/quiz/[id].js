/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen externalQuestions={externalDb.questions} externalBg={externalDb.bg} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [repoName, gitHubUser] = context.query.id.split('___');
  try {
    const externalDb = await fetch(`https://${repoName}.${gitHubUser}.vercel.app/api/db`)
      .then((serverRes) => {
        if (serverRes.ok) {
          return serverRes.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((resConvertedToObject) => (resConvertedToObject));
    return {
      props: { externalDb },
    };
  } catch (err) {
    throw new Error(err);
  }
}
