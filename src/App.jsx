import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./components/Wrapper/Wrapper";
import Homepage from "./pages/Homepage/Homepage";
import QuizPage from "./pages/QuizPage/QuizPage";
import ManageQuizPage from "./pages/ManageQuizPage/ManageQuizPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    id: "wrapperComponent",
    children: [
      { path: "/", element: <Homepage /> }, // All quizzes
      { path: "/quiz/:id", element: <QuizPage /> },
      { path: "/create", element: <ManageQuizPage /> },
      { path: "/edit/:id", element: <ManageQuizPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
