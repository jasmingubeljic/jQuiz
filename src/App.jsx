import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>jQuiz</h1>,
    id: "wrapperComponent",
    children: [{ path: "/", element: <p>Quizzes</p> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
