import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useApi from "../api/useApi";
import useStore from "../store/useStore";
import useControlUI from "../hooks/useControlUI";
import useValidateForm from "../hooks/useValidateForm";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function useQuiz() {
  const [questions, setQuestions] = useState([]);
  const [questionEditing, setQuestionEditing] = useState(false);
  const [quizById, setQuizById] = useState(false);
  const { addQuiz, editQuiz, fetchQuiz, removeQuiz } = useApi();
  const { addQuizToStore, updateQuizToStore, removeQuizOnStore } = useStore();
  const { isElementActive, setIsElementActive } = useControlUI();
  const { handleFormValidate, handleForm2Validate, formValidated, form2Validated } = useValidateForm();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const editMode = searchParams.get("edit") === "true";
  const quizId = params.id;

  const getQuizById = useCallback((id) => {
    fetchQuizMutation.mutate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeQuizById = useCallback((id) => {
    removeQuizMutation.mutate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (!isElementActive) {
      setQuestionEditing(false);
    }
  }, [isElementActive]);

  const updateQuestions = useCallback(
    (e) => {
      e.preventDefault();
      const valid = handleForm2Validate(e);
      if (!valid) return;
      const { id, question, answer_1, answer_2, answer_3, answer_4, correctAnswerIndex } = e.target;

      const editQuestion = id.value;
      if (question.value.trim() && answer_1.value.trim() && answer_2.value.trim() && correctAnswerIndex.value) {
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
          let updatedArray = questions.map((item) => (item.id === id.value ? questionObj : item));
          setQuestions(() => {
            return updatedArray;
          });

          console.log("questionObj: ", questionObj);
        } else {
          setQuestions((prevState) => {
            return [...prevState, questionObj];
          });
        }

        setIsElementActive(false);
        console.log("questionObj: ", questionObj);
      }
    },
    [questions, setIsElementActive, handleForm2Validate]
  );

  const deleteQuestionById = useCallback(
    (id) => {
      console.log("deleteQuestionById: ", id);
      let updatedArray = questions.filter((item) => item.id !== id);
      setQuestions(updatedArray);
    },
    [questions]
  );

  // CREATE/UPDATE QUIZ
  const createQuiz = (e) => {
    e.preventDefault();
    const valid = handleFormValidate(e);
    if (!valid || questions.length === 0) return;
    if (quizById?.id) {
      //update
      const updatedQuiz = {};
      updatedQuiz["id"] = quizById.id;
      updatedQuiz["title"] = e.target.title.value.trim();
      updatedQuiz["questions"] = questions;
      updatedQuiz["quizDuration"] = e.target.quizDuration.value;
      return editQuizMutation.mutate(updatedQuiz);
    }
    //create
    const quiz = {};
    quiz["id"] = uuidv4();
    quiz["title"] = e.target.title.value.trim();
    quiz["questions"] = questions;
    quiz["quizDuration"] = e.target.quizDuration.value;
    createQuizMutation.mutate(quiz);
  };

  const createQuizMutation = useMutation({
    mutationFn: addQuiz,
    onSuccess: (quiz) => {
      addQuizToStore(quiz);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error saving quiz", error);
    },
  });

  const editQuizMutation = useMutation({
    mutationFn: editQuiz,
    onSuccess: (quiz) => {
      updateQuizToStore(quiz);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error saving quiz", error);
    },
  });

  const fetchQuizMutation = useMutation({
    mutationFn: fetchQuiz,
    onSuccess: (quiz) => {
      setQuizById(quiz);
      setQuestions(quiz.questions);
    },
    onError: (error) => {
      console.error("Error fetchig the quiz", error);
    },
  });

  const removeQuizMutation = useMutation({
    mutationFn: removeQuiz,
    onSuccess: (id) => {
      removeQuizOnStore(id);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error removing quiz", error);
    },
  });

  return {
    questions,
    updateQuestions,
    createQuiz,
    removeQuizById,
    formValidated,
    form2Validated,
    isElementActive,
    setIsElementActive,
    quizById,
    deleteQuestionById,
    questionEditing,
    setQuestionEditing,
    editMode,
  };
}
