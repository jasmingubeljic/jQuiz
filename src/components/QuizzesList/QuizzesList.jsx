import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import PropTypes from "prop-types";

export default function QuizzesList(props) {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="fw-regular fs-5 text-uppercase mb-5">Lista kvizova</h1>
      <Stack gap={3}>
        {props.sortedQuizzes.map((q, index) => (
          <Stack key={index} direction="horizontal" className="gap-3 border border-1 rounded p-2">
            <Link to={`/quiz/${q.id}`} className="text-decoration-none">
              <h2 className="fs-4 fw-semibold">{q.title}</h2>
            </Link>
            <Button variant="primary" onClick={() => navigate("/edit/" + q.id + "?edit=true")} className="d-flex gap-1 align-items-center ms-auto" size="sm">
              <MdModeEdit />
              Uredi
            </Button>
          </Stack>
        ))}
      </Stack>
    </>
  );
}

QuizzesList.propTypes = {
  sortedQuizzes: PropTypes.func.isRequired,
};
