import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import PropTypes from "prop-types";
import NoQuizzesPlaceholder from "../NoQuizzesPlaceholder/NoQuizzesPlaceholder";

export default function QuizzesList({ sortedQuizzes }) {
  const navigate = useNavigate();

  return (
    <>
      {/* <h1 className="fw-regular fs-5 text-uppercase mb-5">Lista kvizova</h1> */}
      <Stack gap={3}>
        {sortedQuizzes.map((q, index) => (
          <Stack key={index} className="flex-column flex-md-row gap-3 border border-1 shadow-sm rounded px-3 px-md-4 py-3 py-md-4">
            <div className="d-flex flex-column flex-md-row align-items-center gap-1 gap-md-3 m-auto ms-md-0">
              <h2 className="fs-5 m-0 text-primary">{q.title}</h2>
              <p className="text-muted m-0 opacity-50">
                {q.questions.length} {q.questions.length > 1 ? "questions" : "question"}
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center m-auto me-md-0">
              <Button variant="outline-primary" onClick={() => navigate(`/quiz/${q.id}`)} size="md" className="d-flex gap-1 align-items-center">
                Start Quiz
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/edit/" + q.id + "?edit=true")}
                size="sm"
                className="text-primary d-flex gap-1 align-items-center"
              >
                <MdModeEdit />
                Edit
              </Button>
            </div>
          </Stack>
        ))}
        <NoQuizzesPlaceholder />
      </Stack>
    </>
  );
}

QuizzesList.propTypes = {
  sortedQuizzes: PropTypes.func.isRequired,
};
