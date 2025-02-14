import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./components/Wrapper/Wrapper";
import Homepage from "./pages/Homepage/Homepage";
import AddQuiz from "./components/AddQuiz/AddQuiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    id: "wrapperComponent",
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/add", element: <AddQuiz /> },
      { path: "/quizzes/:id", element: <AddQuiz /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
