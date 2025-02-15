import { Col, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormSelect from "react-bootstrap/FormSelect";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useQuiz from "../../hooks/useQuiz";

export default function AddQuiz() {
  const {
    questions,
    updateQuestions,
    createQuiz,
    validated,
    showModal,
    setShowModal,
    quizById,
    questionEditing,
    setQuestionEditing,
    editMode,
  } = useQuiz();

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mb-3">Create a Quiz</h1>
          <Form onSubmit={createQuiz} noValidate validated={validated}>
            <Form.Group className="mb-3">
              <Form.Label>Quiz name:</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                defaultValue={quizById ? quizById.title : ""}
                // defaultValue={quiz.title}
              ></Form.Control>
              <Form.Text className="text-muted">
                Give a descriptive title for your quiz
              </Form.Text>
            </Form.Group>
            <div>
              {questions.map((q, index) => {
                return (
                  <Stack key={index}>
                    <h2>
                      {index + 1}. {q.question}
                    </h2>
                    <ul>
                      {q.answers?.map((a, index) => (
                        <li key={index}>{a}</li>
                      ))}
                    </ul>
                    <Button
                      type="button"
                      onClick={() => {
                        setQuestionEditing(q);
                        setShowModal(true);
                      }}
                    >
                      edit {index + 1}
                    </Button>
                  </Stack>
                );
              })}
            </div>
            <Stack direction="vertical" className="gap-5">
              <Button variant="text" onClick={() => setShowModal(true)}>
                + Add Question
              </Button>
              <Button type="submit">
                {!editMode ? "CREATE QUIZ" : "UPDATE QUIZ"}
              </Button>
            </Stack>
          </Form>

          <Modal
            show={showModal}
            size="lg"
            onHide={() => {
              setShowModal(false);
            }}
          >
            <Form onSubmit={updateQuestions} noValidate validated={validated}>
              <Modal.Header closeButton>
                <Modal.Title>Add Question</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Control
                    name="id"
                    type="text"
                    defaultValue={questionEditing ? questionEditing.id : ""}
                    hidden={true}
                  />
                  <Form.Label>Question:</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    name="question"
                    defaultValue={
                      questionEditing ? questionEditing.question : ""
                    }
                  />
                  <Form.Text className="text-muted">
                    Give a clear question
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="floatingInput" label="Answer 1">
                    <Form.Control
                      required
                      type="text"
                      name="answer_1"
                      defaultValue={
                        questionEditing ? questionEditing.answers[0] : ""
                      }
                    ></Form.Control>{" "}
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel controlId="floatingInput" label="Answer 2">
                    <Form.Control
                      required
                      type="text"
                      name="answer_2"
                      defaultValue={
                        questionEditing ? questionEditing.answers[1] : ""
                      }
                    ></Form.Control>
                  </FloatingLabel>
                  {/* <Form.Text className="text-muted"></Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Answer 3 (optional)"
                  >
                    <Form.Control
                      type="text"
                      name="answer_3"
                      defaultValue={
                        questionEditing ? questionEditing.answers[2] : ""
                      }
                    ></Form.Control>
                  </FloatingLabel>
                  {/* <Form.Text className="text-muted"></Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Answer 4 (optional)"
                  >
                    <Form.Control
                      type="text"
                      name="answer_4"
                      defaultValue={
                        questionEditing ? questionEditing.answers[3] : ""
                      }
                    ></Form.Control>
                  </FloatingLabel>
                  {/* <Form.Text className="text-muted"></Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Select correct answer for the question"
                  >
                    <FormSelect
                      aria-label="Correct answer"
                      name="correctAnswerIndex"
                      defaultValue={questionEditing?.correctAnswerIndex}
                    >
                      <option value="0">Answer 1</option>
                      <option value="1">Answer 2</option>
                      <option value="2">Answer 3</option>
                      <option value="3">Answer 4</option>
                    </FormSelect>
                  </FloatingLabel>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}
