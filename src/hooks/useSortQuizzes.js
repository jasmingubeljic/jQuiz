import { useCallback, useState } from "react";
import useStore from "../store/useStore";

export default function useSortQuizzes() {
  const quizzes = useStore((store) => store.quizzes);
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
