import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./components/Wrapper/Wrapper";
import QuizScoresPage from "./pages/QuizScoresPage/QuizScoresPage";
import Homepage from "./pages/Homepage/Homepage";
import QuizPage from "./pages/QuizPage/QuizPage";
import ManageQuizPage from "./pages/ManageQuizPage/ManageQuizPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    id: "wrapperComponent",
    children: [
      { path: "/", element: <Homepage /> }, // All quizzes
      { path: "/quiz/:id", element: <QuizPage /> },
      { path: "/scores", element: <QuizScoresPage /> },
      { path: "/create", element: <ManageQuizPage /> },
      { path: "/edit/:id", element: <ManageQuizPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
