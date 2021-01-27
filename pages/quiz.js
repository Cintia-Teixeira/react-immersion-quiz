/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, questionIndex, totalQuestions, handleSubmit,
}) {
  const questionId = `question_${questionIndex}`;

  return (
    <Widget>
      <Widget.Header>
        <h1>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h1>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content
        style={{
          padding: '24px 3px 32px 6px',
        }}
      >
        {question.title.map((title) => (
          <h2
            style={{
              fontsize: '13px',
              lineBreak: true,
            }}
          >
            {title}
          </h2>
        ))}
        <p>{question.description}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId} key={`key_${alternativeId}`}>
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  style={{
                    display: 'none',
                  }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit">Confirmar</Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const router = useRouter();
  const { name } = router.query;

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestionIndex;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmit() {
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

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
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            handleSubmit={handleSubmit}
          />
        )}

        {screenState === screenStates.RESULT && <h1>Parabéns</h1>}
        <Footer />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
