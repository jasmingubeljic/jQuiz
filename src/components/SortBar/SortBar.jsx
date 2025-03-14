import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import useStore from "../../store/useStore";

export default function SortBar({ onSortHandler }) {
  const quizzes = useStore((store) => store.quizzes);

  if (quizzes.length === 0) {
    return;
  }

  return (
    <>
      <Form
        name="sortBy"
        onChange={onSortHandler}
        className="text-primary mt-2 mt-md-5 mb-4 mb-md-5 d-flex flex-column flex-md-row gap-2 gap-md-3 justify-content-center"
      >
        <Form.Check inline label="Sort by name" name="group1" value="1" type="radio" />
        <Form.Check inline label="Sort by number of questions" name="group1" value="2" type="radio" />
      </Form>
    </>
  );
}

SortBar.propTypes = {
  onSortHandler: PropTypes.func.isRequired,
};
