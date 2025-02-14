import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useStore from "../store/useStore";

export default function useQuiz() {
  const [questions, setQuestions] = useState([]);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { addQuiz } = useStore();
  const navigate = useNavigate();

  const onValidateHandler = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (!form.checkValidity()) {
      return false;
    } else {
      return true;
    }
  };

  const updateQuestions = useCallback((e) => {
    e.preventDefault();
    const valid = onValidateHandler(e);
    if (!valid) return;
    const {
      question,
      answer_1,
      answer_2,
      answer_3,
      answer_4,
      correctAnswerIndex,
    } = event.target;
    const questionObj = {};
    if (
      question.value.trim() &&
      answer_1.value.trim() &&
      answer_2.value.trim() &&
      correctAnswerIndex.value
    ) {
      questionObj["question"] = question.value.trim();
      questionObj["answers"] = [answer_1.value.trim(), answer_2.value.trim()];
      questionObj["correctAnswerIndex"] = correctAnswerIndex.value.trim();

      if (answer_3.value.trim()) {
        questionObj["answers"].push(answer_3.value.trim());
      }
      if (answer_4.value.trim()) {
        questionObj["answers"].push(answer_4.value.trim());
      }
      setQuestions((prevState) => {
        return [...prevState, questionObj];
      });
      setShowModal(false);
    }
  }, []);

  const createQuiz = useCallback(
    (e) => {
      e.preventDefault();
      const valid = onValidateHandler(e);
      if (!valid || questions.length === 0) return;
      const quiz = {};
      quiz["id"] = uuidv4();
      quiz["title"] = e.target.title.value.trim();
      quiz["questions"] = questions;
      addQuiz(quiz);
      navigate("/");
    },
    [questions, addQuiz, navigate]
  );

  return {
    questions,
    updateQuestions,
    createQuiz,
    validated,
    showModal,
    setShowModal,
  };
}
