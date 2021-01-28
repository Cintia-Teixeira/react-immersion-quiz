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

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.reduce((actualSum, actualResult) => {
            const isRightAnswer = actualResult === true;
            if (isRightAnswer) {
              return actualSum + 1;
            }
            return actualSum;
          }, 0)}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`result__${index}_${result}`}>
              #0
              {index + 1}
              {' '}
              Resultado:
              {' '}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content
        style={{ padding: 0 }}
      >
        <img
          src="https://media.giphy.com/media/7qV3yswT0K8hi/giphy.gif"
          alt="Loading"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
          }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, questionIndex, totalQuestions, handleSubmit, addResult,
}) {
  const questionId = `question_${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const rightAnswer = question.answer;
  const isCorrect = selectedAlternative === rightAnswer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

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
        {question.title.map((title, titleIndex) => {
          const titleId = `title_${titleIndex}`;
          return (
            <h2
              key={`key_${titleId}`}
              style={{
                fontsize: '13px',
                lineBreak: true,
              }}
            >
              {title}
            </h2>
          );
        })}

        <p>{question.description}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              handleSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId} key={`key_${alternativeId}`}>
                <input
                  style={{
                    display: 'none',
                  }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={(e) => {
                    e.preventDefault();
                    setSelectedAlternative(alternativeIndex);
                  }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>
          {isQuestionSubmited && isCorrect && <p>Parabéns, você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Poxa, essa você errou, mas não desanime!</p>}
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
  const [results, setResults] = React.useState([]);
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

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ
          && (
            <h2>
              Vamos jogar,
              {' '}
              {name}
              !
            </h2>
          )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            handleSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
        <Footer />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
