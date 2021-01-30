/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function ExternalQuizzes({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen externalQuestions={externalDb.questions} externalBg={externalDb.bg} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [project, gitHubUser] = context.query.id.split('___');
  const repoFullName = project.replace('__', '-');
  try {
    const externalDb = await fetch(gitHubUser !== undefined ? `https://${repoFullName}.${gitHubUser}.vercel.app/api/db` : `https://${repoFullName}.vercel.app/api/db`)
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
