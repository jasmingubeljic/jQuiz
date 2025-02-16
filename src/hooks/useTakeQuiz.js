import { useState, useCallback, useEffect } from "react";
import useQuiz from "./useQuiz";

export default function useTakeQuiz() {
  const { quizById } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResults, setQuizResults] = useState(false);
  const [answerResultsArray, setAnswerResultsArray] = useState([]);

  useEffect(() => {
    if (quizById) {
      console.log("quizById: ", quizById);
    }
  }, [quizById]);

  // define some literals
  let questionsLength;
  let questionObj;
  if (quizById) {
    questionsLength = quizById.questions.length;
    questionObj = quizById.questions[currentQuestionIndex];
  }

  useEffect(() => {
    // total score
    if (answerResultsArray.length === questionsLength) {
      console.log("answerResultsArray: ", answerResultsArray);
      const correctAnswersLength = answerResultsArray.filter((a) => a).length;
      const scorePercentage = (correctAnswersLength / questionsLength) * 100;
      setQuizResults(Math.round(scorePercentage));
    }
  }, [currentQuestionIndex, questionsLength, answerResultsArray]);

  const submitAnswerHandler = useCallback(
    (e) => {
      e.preventDefault();
      const selectedRadioValue = e.target.elements["jgroup"].value;
      const selectedAnswerIndex =
        questionObj.answers.indexOf(selectedRadioValue);
      const correctAnswerIndex = questionObj.correctAnswerIndex;
      if (selectedAnswerIndex === +correctAnswerIndex) {
        setAnswerResultsArray((prevState) => {
          return [...prevState, true];
        });
      } else {
        setAnswerResultsArray((prevState) => {
          return [...prevState, false];
        });
      }

      if (currentQuestionIndex + 1 === questionsLength) return;

      setCurrentQuestionIndex((prevState) => prevState + 1);
    },
    [currentQuestionIndex, questionsLength, questionObj]
  );

  return {
    quizById,
    currentQuestionIndex,
    questionObj,
    questionsLength,
    quizResults,
    submitAnswerHandler,
  };
}
