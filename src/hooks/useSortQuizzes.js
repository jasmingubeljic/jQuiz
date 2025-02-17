import { useCallback, useState } from "react";
import useStore from "../store/useStore";

export default function useQuiz() {
  const { quizzes } = useStore();
  const [sortedQuizzes, setSortedQuizzes] = useState(quizzes);

  const handleSortQuizzes = useCallback(
    (e) => {
      const selectedValue = e.target.value;
      const data = [...quizzes];
      if (+selectedValue === 1) {
        data.sort((a, b) => a.title.localeCompare(b.title));
        setSortedQuizzes(data);
      } else if (+selectedValue === 2) {
        data.sort((a, b) => a.questions.length - b.questions.length);
        setSortedQuizzes(data);
      }
    },
    [quizzes]
  );

  return {
    handleSortQuizzes,
    sortedQuizzes,
  };
}
