import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// components
import QuestionCard from "./components/QuestionCard";
// types
import { QuestionState, Difficulty } from "./API";
// styles
import { GlobalStyle,Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Users answer
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        // answer:answer or answer both are same, introduced in es6
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if  not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };
  return (
    <>
      <GlobalStyle />
      {/* <div className="App"> */}
      <Wrapper>
        <h1>REACT-Typescript Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}

        {!gameOver ? <p className="score">Score:{score}</p> : null}

        {/* instead of ternary opeartor, we can use short circuit */}

        {loading && <p>Loading Questions...</p>}

        {/* Question card will show only when we are not loading and not game over */}

        {!loading && !gameOver && (
          <QuestionCard
            // array starts with 0, so adding +1
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {/* we are going to show next when its not game over, not loading, only user answer the current question and when user is in last question */}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            {" "}
            Next Question
          </button>
        ) : null}
      {/* </div> */}
      </Wrapper>
    </>
  );
};

export default App;
