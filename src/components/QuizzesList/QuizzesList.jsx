import useStore from "../../store/useStore";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

export default function QuizzesList() {
  const { quizzes, isAdmin } = useStore();
  const navigate = useNavigate();

  return (
    <ul>
      {quizzes.map((q, index) => (
        <li key={index}>
          <Stack direction="horizontal" className="gap-3">
            <Link to={`/quiz/${q.id}`}>{q.title}</Link>
            <Button
              variant="secondary"
              onClick={() => navigate("/edit/" + q.id + "?edit=true")}
              hidden={!isAdmin}
            >
              Edit
            </Button>
          </Stack>
        </li>
      ))}
    </ul>
  );
}
