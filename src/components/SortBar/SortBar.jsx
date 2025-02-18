import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import useStore from "../../store/useStore";

export default function SortBar(props) {
  const quizzes = useStore((store) => store.quizzes);

  if (quizzes.length === 0) {
    return;
  }

  return (
    <>
      <Form
        name="sortBy"
        onChange={props.onSortHandler}
        className="mt-2 mt-md-5 mb-4 mb-md-5 p-3 d-flex flex-column flex-md-row gap-2 gap-md-3 justify-content-center"
      >
        <Form.Check inline label="Sortiraj prema nazivu" name="group1" value="1" type="radio" />
        <Form.Check inline label="Sortiraj prema broju pitanja" name="group1" value="2" type="radio" />
      </Form>
    </>
  );
}

SortBar.propTypes = {
  onSortHandler: PropTypes.func.isRequired,
};
