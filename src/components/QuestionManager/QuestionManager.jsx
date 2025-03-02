import { Modal, Form, Button, FloatingLabel, FormSelect } from "react-bootstrap";
import PropTypes from "prop-types";

export default function QuestionManager({ isElementActive, onHide, onSubmit, onClose, questionEditing }) {
  return (
    <Modal show={isElementActive} size="lg" onHide={onHide}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Question</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <Form.Group className="mb-3">
            <Form.Control name="id" type="text" defaultValue={questionEditing ? questionEditing.id : ""} hidden={true} />
            <Form.Label>Question Title:</Form.Label>
            <Form.Control required type="text" name="question" defaultValue={questionEditing ? questionEditing.question : ""} />
            <Form.Text className="text-muted">Keep questions short and to the point, focusing only on the key information needed for clarity</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3 d-flex flex-column gap-2">
            <FloatingLabel controlId="floatingInput" label="Answer 1">
              <Form.Control required type="text" name="answer_1" defaultValue={questionEditing ? questionEditing.answers[0] : ""}></Form.Control>{" "}
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Answer 2">
              <Form.Control required type="text" name="answer_2" defaultValue={questionEditing ? questionEditing.answers[1] : ""}></Form.Control>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Answer 3 (optional)">
              <Form.Control type="text" name="answer_3" defaultValue={questionEditing ? questionEditing.answers[2] : ""}></Form.Control>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Answer 4 (optional)">
              <Form.Control type="text" name="answer_4" defaultValue={questionEditing ? questionEditing.answers[3] : ""}></Form.Control>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Choose correct answer">
              <FormSelect
                required
                aria-label="Correct Answer"
                name="correctAnswerIndex"
                defaultValue={questionEditing?.correctAnswerIndex ? questionEditing?.correctAnswerIndex : ""}
              >
                <option value=""></option>
                <option value="0">Answer 1</option>
                <option value="1">Answer 2</option>
                <option value="2">Answer 3</option>
                <option value="3">Answer 4</option>
              </FormSelect>
            </FloatingLabel>
            <Form.Text className="text-muted">The selected correct answer is used to calculate the result</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} className="px-3" size="sm">
            Close
          </Button>
          <Button variant="primary" type="submit" className="px-3" size="sm">
            Save Question
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

QuestionManager.propTypes = {
  isElementActive: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  form2Validated: PropTypes.bool.isRequired,
  questionEditing: PropTypes.bool.isRequired,
};
