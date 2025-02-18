import useStore from "../../store/useStore";
import Button from "react-bootstrap/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function NoQuizzesPlaceholder() {
  const navigate = useNavigate();
  const quizzes = useStore((store) => store.quizzes);
  const noQuizes = quizzes.length === 0;

  if (noQuizes) {
    return (
      <div className="d-flex flex-column h-100 mt-5">
        <p className="text-center">Za rješavanje kviza neophodno je da dodate svoj prvi kviz</p>
        <Button
          onClick={() => {
            navigate("/create");
          }}
          className="mx-auto d-flex align-items-center gap-1"
        >
          <IoMdAddCircleOutline /> Dodaj
        </Button>
      </div>
    );
  }
}
