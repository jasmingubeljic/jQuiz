import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./components/Wrapper/Wrapper";
import Homepage from "./pages/Homepage/Homepage";
import AddQuiz from "./components/AddQuiz/AddQuiz";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    id: "wrapperComponent",
    children: [
      { path: "/", element: <Homepage /> }, // All quizzes
      { path: "/quiz/:id", element: <p>Take a quiz</p> },
      { path: "/create", element: <AddQuiz /> },
      { path: "/edit/:id", element: <AddQuiz /> },
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
