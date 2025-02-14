import { Button, Stack } from "react-bootstrap";
import useStore from "../../store/useStore";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const { quizzes } = useStore();
  const navigate = useNavigate();

  return (
    <ul>
      {quizzes.map((q, index) => (
        <li key={index}>
          <Stack direction="horizontal" className="gap-3">
            {q.title}{" "}
            <Button
              variant="secondary"
              onClick={() => navigate("/quizzes/" + q.id + "?edit=true")}
            >
              Edit
            </Button>
          </Stack>
        </li>
      ))}
    </ul>
  );
}
