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
          // return [{ quizzes: s.push(payload) }];
          return { quizzes: [...state.quizzes, payload] };
        });
      },
      updateQuizToStore: (quiz) => {
        set((state) => {
          const updatedQuizzes = state.quizzes.map((q) => (q.id === quiz.id ? quiz : q));
          return { quizzes: updatedQuizzes };
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
