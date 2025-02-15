import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      quizzes: [],
      addQuizToStore: (payload) => {
        set((state) => {
          const s = state.quizzes;
          console.log(s);
          return [{ quizzes: s.push(payload) }];
        });
      },
      updateQuizToStore: (quiz) => {
        set((state) => {
          let s = state.quizzes;
          const quizIndex = s.findIndex((q) => q.id === quiz.id);

          let sq = state.quizzes;
          sq[quizIndex] = quiz;
          return { quizzes: sq };
        });
      },
      removeQuizOnStore: (id) => {
        set((state) => {
          let s = state.quizzes;
          s = s.filter((q) => q.id != id);
          return { quizzes: s };
        });
      },
    }),
    {
      name: "quizzes",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
