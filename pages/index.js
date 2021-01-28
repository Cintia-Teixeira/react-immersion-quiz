import React from 'react';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Form from '../src/components/Form';

// eslint-disable-next-line react/prop-types
function ExternalQuizList() {
  return (
    <Widget.Content>
      <p><strong>Aproveita e dá uma olhada também nesses outros quizzes:</strong></p>
      {db.external.map((url) => {
        const prepareUrl = url
          .replace(/\//g, '')
          .replace('https:', '')
          .replace('.vercel.app', '');

        const [repoName, user] = prepareUrl.split('.');
        return (
          <li
            key={url}
            style={{
              listStyle: 'none',
            }}
          >
            <Widget.Topic
              style={{
                fontSize: '14.5px',
              }}
              href={url}
            >
              {`${user}/${repoName}`}
            </Widget.Topic>
          </li>
        );
      })}
    </Widget.Content>
  );
}
export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1
              style={{
                textTransform: 'uppercase',
              }}
            >
              {db.title}
            </h1>
          </Widget.Header>
          <Widget.Content>
            <p><strong>{db.description}</strong></p>
            <Form />
          </Widget.Content>
        </Widget>

        <Widget>
          <ExternalQuizList />
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
