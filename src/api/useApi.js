import useStore from "../store/useStore";

export default function useApi() {
  const { quizzes } = useStore();

  const simulateNetworkDelay = (time = 600) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const fetchQuizzes = async () => {
    await simulateNetworkDelay();
    return quizzes;
  };

  const fetchQuiz = async (id) => {
    await simulateNetworkDelay();
    const quiz = quizzes.find((q) => q.id === id);
    return quiz;
  };

  const addQuiz = async (quiz) => {
    await simulateNetworkDelay();
    return quiz;
  };

  const editQuiz = async (updatedQuiz) => {
    await simulateNetworkDelay();
    const quizIndex = quizzes.findIndex(
      (quiz) => quiz.id === updatedQuiz["id"]
    );
    console.log("quizIndex", quizIndex);
    if (quizIndex === -1) throw new Error("Quiz not found");
    console.log("updatedQuiz", updatedQuiz);
    return updatedQuiz;
  };

  const removeQuiz = async (id) => {
    await simulateNetworkDelay();
    const quizIndex = quizzes.findIndex((quiz) => quiz.id === id);
    console.log("index on removal", quizIndex);
    if (quizIndex === -1) throw new Error("Quiz not found");
    return id;
  };

  return {
    fetchQuizzes,
    fetchQuiz,
    addQuiz,
    editQuiz,
    removeQuiz,
  };
}
