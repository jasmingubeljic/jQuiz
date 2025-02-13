import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./components/Wrapper/Wrapper";
import AddQuiz from "./components/AddQuiz/AddQuiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    id: "wrapperComponent",
    children: [{ path: "/", element: <AddQuiz /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
