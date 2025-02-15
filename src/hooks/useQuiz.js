import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useStore from "../store/useStore";
import { useParams, useSearchParams } from "react-router-dom";

export default function useQuiz() {
  const [questions, setQuestions] = useState([]);
  const [questionEditing, setQuestionEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quizById, setQuizById] = useState(false);
  const { quizzes, addQuiz } = useStore();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const editMode = searchParams.get("edit") === "true";
  const quizId = params.id;

  const getQuizById = useCallback(
    (id) => {
      const quiz = quizzes.find((q) => q.id === id);
      setQuizById(quiz);
      setQuestions(quiz.questions);
    },
    [quizzes]
  );

  useEffect(() => {
    // get quiz by id
    if (quizId) {
      getQuizById(quizId);
    } else {
      setQuizById(false);
      setQuestions([]);
    }
  }, [editMode, quizId, getQuizById]);

  useEffect(() => {
    if (!showModal) {
      setQuestionEditing(false);
    }
  }, [showModal]);

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

  const updateQuestions = useCallback(
    (e) => {
      e.preventDefault();
      const valid = onValidateHandler(e);
      if (!valid) return;
      const {
        id,
        question,
        answer_1,
        answer_2,
        answer_3,
        answer_4,
        correctAnswerIndex,
      } = e.target;

      const editQuestion = id.value;
      if (
        question.value.trim() &&
        answer_1.value.trim() &&
        answer_2.value.trim() &&
        correctAnswerIndex.value
      ) {
        const questionObj = {};
        if (editQuestion) {
          questionObj["id"] = id.value;
        } else {
          questionObj["id"] = uuidv4();
        }

        questionObj["question"] = question.value.trim();
        questionObj["answers"] = [answer_1.value.trim(), answer_2.value.trim()];
        questionObj["correctAnswerIndex"] = correctAnswerIndex.value.trim();

        if (answer_3.value.trim()) {
          questionObj["answers"].push(answer_3.value.trim());
        }
        if (answer_4.value.trim()) {
          questionObj["answers"].push(answer_4.value.trim());
        }

        if (editQuestion) {
          console.log("questions: ", questions);
          let updatedArray = questions.map((item) =>
            item.id === id.value ? questionObj : item
          );
          setQuestions(() => {
            return updatedArray;
          });

          console.log("questionObj: ", questionObj);
        } else {
          setQuestions((prevState) => {
            return [...prevState, questionObj];
          });
        }

        setShowModal(false);
        console.log("questionObj: ", questionObj);
      }
    },
    [questions]
  );

  // CREATE/UPDATE QUIZ
  const createQuiz = useCallback(
    (e) => {
      e.preventDefault();
      const valid = onValidateHandler(e);
      if (!valid || questions.length === 0) return;
      if (quizById?.id) {
        // perform update quiz by id, do not add new quiz to store
        const updatedQuiz = {};
        updatedQuiz["id"] = quizById.id;
        updatedQuiz["title"] = e.target.title.value.trim();
        updatedQuiz["questions"] = questions;
        console.log("updatedQuiz", updatedQuiz);
        navigate("/");
        return;
      }
      const quiz = {};
      quiz["id"] = uuidv4();
      quiz["title"] = e.target.title.value.trim();
      quiz["questions"] = questions;
      addQuiz(quiz);
      navigate("/");
    },
    [questions, addQuiz, navigate, quizById]
  );

  return {
    questions,
    updateQuestions,
    createQuiz,
    validated,
    showModal,
    setShowModal,
    quizById,
    questionEditing,
    setQuestionEditing,
    editMode,
  };
}
