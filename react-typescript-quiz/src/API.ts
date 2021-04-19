import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

// the below one will take the properties from Question and add answers property to it and all these properties will store in the QuestionState

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  // first await (await fetch(endpoint)) is for fetch the data from endpoint and second await is to convert it into json.
  const data = await (await fetch(endpoint)).json();
  // console.log(data);
  return data.results.map((question: Question) => ({
    // we want correct answer should be shuffled everytime, so we have a created a function inside utils.ts
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
