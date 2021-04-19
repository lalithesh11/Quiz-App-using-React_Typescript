import React from "react";
// Types
import { AnswerObject } from "../App";
// styles
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type props = {
  question: string;
  answers: string[];
  //   not returning anything
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
};

// we are telling Question is a React functional component and passing the props to it. After that destructuring them.
const QuestionCard: React.FC<props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => (
  //   <div>
  <Wrapper>
    <p className="number">
      Question: {questionNum}/{totalQuestions}
    </p>
    {/* we are getting the text in the html format as a response from the API, here we know it is safe and also what we are getting, so we can use the dangerouslySetInnerHTML */}
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        // <div key={answer}>
        <ButtonWrapper
          key={answer}
          // optinal chaining
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
         >
          {/* disabled is expecting a boolean value,so write like below or !!userAnswer */}
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            {/* this also get the text in an HTML format */}
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
          {/* </div> */}
        </ButtonWrapper>
      ))}
    </div>
    {/* </div> */}
  </Wrapper>
);

export default QuestionCard;
