/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import { Lottie } from '@crello/react-lottie';

import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import Footer from '../../components/Footer';
import GitHubCorner from '../../components/GitHubCorner';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import loadingAnimation from './animations/loading.json';

function ResultWidget({ results, name }) {
  return (
    <Widget>
      <Widget.Header>
        <strong>
          {name}
          , veja seu resultado:
        </strong>
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
              {index + 1 < 10 ? '#0' : '#'}
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
        <Lottie
          width="100%"
          height="200px"
          objectFit="cover"
          className="lottie-container basic"
          config={{
            animationData: loadingAnimation, loop: true, autoplay: true,
          }}
          speed="2.5"
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
        <BackLinkArrow href="/" />
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
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm
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
            const isSelected = selectedAlternative === alternativeIndex;
            const alternativeSelectedStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={`key_${alternativeId}`}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeSelectedStatus}
              >
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
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalBg, externalQuestions }) {
  const router = useRouter();
  const { name } = router.query;

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const questionIndex = currentQuestionIndex;
  const totalQuestions = externalQuestions.length;
  const question = externalQuestions[questionIndex];
  const bg = externalBg;

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
    <QuizBackground backgroundImage={bg}>
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

        {screenState === screenStates.RESULT && <ResultWidget results={results} name={name} />}
        <Footer />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
