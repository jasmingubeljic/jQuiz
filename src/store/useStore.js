import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      quizzes: [],
      addQuiz: (payload) => {
        set((state) => {
          const s = state.quizzes;
          console.log(s);
          return [{ quizzes: s.push(payload) }];
        });
      },
      updateQuizById: (id) => {
        set((state) => {
          let s = state.quizzes;
          s = s.filter((q) => q.id === id);
          console.log("q to be updated: ", s);
          return { quizzes: state.quizzes };
        });
      },
      removeQuizById: (id) => {
        set((state) => {
          let s = state.quizzes;
          s = s.filter((q) => q.id != id);
          console.log("after removal: ", s);
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
