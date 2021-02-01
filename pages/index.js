/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

import { useRouter } from 'next/router';
import styled from 'styled-components';

import InputBase from '../src/components/Input';
import Button from '../src/components/Button';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Link from '../src/components/Link';

const Modal = styled.div`
position:absolute;
  width: 284px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
    background-color: ${({ theme }) => theme.colors.wrong};
`;

function ExternalQuizList({
  name, router, isOpen, toggleModal,
}) {
  return (
    <Widget.Content>
      <p><strong>Aproveita e dá uma olhada também nesses outros quizzes:</strong></p>
      {db.external.map((url) => {
        const [repoFullName, gitHubUser] = url
          .replace(/\//g, '')
          .replace('https:', '')
          .replace('.vercel.app', '')
          .split('.');

        const branch = repoFullName.match(/(git-main)/g);
        const repo = repoFullName.replace('-git-main', '');
        const project = branch !== null ? `${repo}__${branch}` : repoFullName;
        const listedUser = gitHubUser !== undefined ? gitHubUser : ('Dev não identificado').toUpperCase();
        const activedHref = gitHubUser !== undefined ? `/quiz/${project}___${gitHubUser}?name=${name}` : `/quiz/${project}?name=${name}`;

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
              href={name.length === 0 ? '/' : activedHref}
              onClick={(e) => {
                e.preventDefault();
                if (name.length === 0) {
                  toggleModal();
                } else {
                  router.push(activedHref);
                }
              }}
            >
              {branch !== null ? `${listedUser}/${repo}/${branch}` : `${listedUser}/${repo}`}
            </Widget.Topic>
          </li>
        );
      })}
      { isOpen
        && (
        <Modal
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
          style={{
            zindex: isOpen ? 0 : -1,
          }}
        >
          <span><strong>Por favor, preencha seu nome</strong></span>
        </Modal>
        )}
    </Widget.Content>
  );
}
export default function Home() {
  const router = useRouter();

  const [name, setName] = React.useState('');

  const [isOpen, setIsOpen] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

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
            <form onSubmit={handleSubmit}>
              <InputBase
                type="text"
                placeholder="Diz aí seu nome pra jogar :)"
                onChange={(e) => {
                  setName(e.target.value);
                  if (name.length > 0) setIsOpen(false);
                }}
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar
              </Button>
            </form>
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
          <ExternalQuizList name={name} router={router} isOpen={isOpen} toggleModal={toggleModal} />
        </Widget>
        <Footer
          as={motion.div}
          animate={{ rotate: 360 }}
          transition={{ type: 'spring', velocity: 2 }}
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Cintia-Teixeira/react-immersion-quiz" />
    </QuizBackground>
  );
}
