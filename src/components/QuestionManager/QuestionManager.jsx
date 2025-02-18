import { Modal, Form, Button, FloatingLabel, FormSelect } from "react-bootstrap";
import PropTypes from "prop-types";

export default function QuestionManager({ isElementActive, onHide, onSubmit, onClose, questionEditing }) {
  return (
    <Modal show={isElementActive} size="lg" onHide={onHide}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj pitanje</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <Form.Group className="mb-3">
            <Form.Control name="id" type="text" defaultValue={questionEditing ? questionEditing.id : ""} hidden={true} />
            <Form.Label>Sadržaj pitanja:</Form.Label>
            <Form.Control required type="text" name="question" defaultValue={questionEditing ? questionEditing.question : ""} />
            <Form.Text className="text-muted">(Pitanje treba da bude jasno)</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3 d-flex flex-column gap-2">
            <FloatingLabel controlId="floatingInput" label="Odgovor 1">
              <Form.Control required type="text" name="answer_1" defaultValue={questionEditing ? questionEditing.answers[0] : ""}></Form.Control>{" "}
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Odgovor 2">
              <Form.Control required type="text" name="answer_2" defaultValue={questionEditing ? questionEditing.answers[1] : ""}></Form.Control>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Odgovor 3 (opcionalno)">
              <Form.Control type="text" name="answer_3" defaultValue={questionEditing ? questionEditing.answers[2] : ""}></Form.Control>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Odgovor 4 (opcionalno)">
              <Form.Control type="text" name="answer_4" defaultValue={questionEditing ? questionEditing.answers[3] : ""}></Form.Control>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Izaberi tačan odgovor pitanja">
              <FormSelect
                required
                aria-label="Tačan odgovor"
                name="correctAnswerIndex"
                defaultValue={questionEditing?.correctAnswerIndex ? questionEditing?.correctAnswerIndex : ""}
              >
                <option value=""></option>
                <option value="0">Odgovor 1</option>
                <option value="1">Odgovor 2</option>
                <option value="2">Odgovor 3</option>
                <option value="3">Odgovor 4</option>
              </FormSelect>
            </FloatingLabel>
            <Form.Text className="text-muted">(Tačan odgovor određen u ovom polju koristi se prilikom ocjenjivanja kviza)</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} className="px-3" size="sm">
            Zatvori
          </Button>
          <Button variant="primary" type="submit" className="px-3" size="sm">
            Spasi izmjene
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
