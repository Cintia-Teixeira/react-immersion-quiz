import React from 'react';
import { motion } from 'framer-motion';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Form from '../src/components/Form';
import Link from '../src/components/Link';

// eslint-disable-next-line react/prop-types
function ExternalQuizList() {
  return (
    <Widget.Content>
      <p><strong>Aproveita e dá uma olhada também nesses outros quizzes:</strong></p>
      {db.external.map((url) => {
        const [repoName, gitHubUser] = url
          .replace(/\//g, '')
          .replace('https:', '')
          .replace('.vercel.app', '')
          .split('.');
        return (
          <li
            key={url}
            style={{
              listStyle: 'none',
            }}
          >
            <Widget.Topic
              as={Link}
              style={{
                fontSize: '14.5px',
              }}
              href={`/quiz/${repoName}___${gitHubUser}`}
            >
              {`${gitHubUser}/${repoName}`}
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
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            visible: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="visible"
        >
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

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <ExternalQuizList />
        </Widget>
        <Footer
          as={motion.div}
          animate={{ rotate: 360 }}
          transition={{ type: 'spring', velocity: 2 }}
        />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
