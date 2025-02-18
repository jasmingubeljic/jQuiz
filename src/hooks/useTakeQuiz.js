import { useState, useCallback, useEffect } from "react";
import useManageQuiz from "./useManageQuiz";
import useControlUI from "./useControlUI";

export default function useTakeQuiz() {
  const { quizById, editQuizMutation } = useManageQuiz();
  const { isElementActive, setIsElementActive } = useControlUI();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResults, setQuizResults] = useState(false);
  const [quizMessage, setQuizMessage] = useState(false);
  const [answerResultsArray, setAnswerResultsArray] = useState([]);
  const [scoreStoredHelper, setScoreStoredHelper] = useState(false);

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
      const formattedValue = Math.round(scorePercentage).toString(); // we need string since in case of number 0, it is falsy value
      let quizMessage = "Nažalost, niste prošli kviz. Pokušajte ponovo!";
      if (scorePercentage >= 60) {
        quizMessage = "Čestitamo! Kviz ste uspješno završili";
      }
      //
      setQuizResults(formattedValue);
      setQuizMessage(quizMessage);
    }
  }, [currentQuestionIndex, questionsLength, answerResultsArray]);

  useEffect(() => {
    // Store quiz scores history
    if (!quizById || !quizResults || scoreStoredHelper) return;
    const updatedQuiz = { ...quizById };
    const score = {
      score: quizResults,
      createdAt: new Date().toISOString(),
    };
    if (updatedQuiz["scoresHistory"]) {
      updatedQuiz["scoresHistory"].push(score);
    } else {
      updatedQuiz["scoresHistory"] = [score];
    }
    editQuizMutation.mutate(updatedQuiz);
    setScoreStoredHelper(true);
  }, [quizById, quizResults, editQuizMutation, scoreStoredHelper]);

  const submitAnswerHandler = useCallback(
    (e) => {
      e.preventDefault();
      const selectedRadioValue = e.target.elements["jgroup"].value;
      if (!selectedRadioValue) {
        return;
      }
      const selectedAnswerIndex = questionObj.answers.indexOf(selectedRadioValue);
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
    quizMessage,
    submitAnswerHandler,
    isElementActive,
    setIsElementActive,
  };
}
