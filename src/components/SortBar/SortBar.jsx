import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default function SortBar(props) {
  return (
    <>
      <Form
        name="sortBy"
        onChange={props.onSortHandler}
        className="mt-4 mb-3 d-flex gap-4 justify-content-center"
      >
        <Form.Check
          inline
          label="Sortiraj prema nazivu kviza"
          name="group1"
          value="1"
          type="radio"
        />
        <Form.Check
          inline
          label="Sortiraj prema broju odgovora"
          name="group1"
          value="2"
          type="radio"
        />
      </Form>
    </>
  );
}

SortBar.propTypes = {
  onSortHandler: PropTypes.func.isRequired,
};
