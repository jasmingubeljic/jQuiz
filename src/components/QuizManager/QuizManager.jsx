import { Col, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormSelect from "react-bootstrap/FormSelect";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useQuiz from "../../hooks/useQuiz";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { GrValidate } from "react-icons/gr";

export default function AddQuiz() {
  const {
    questions,
    updateQuestions,
    createQuiz,
    removeQuizById,
    formValidated,
    isElementActive,
    setIsElementActive,
    quizById,
    deleteQuestionById,
    questionEditing,
    setQuestionEditing,
    editMode,
  } = useQuiz();

  return (
    <Container>
      <Row>
        <Col>
          <Stack
            direction="horizontal"
            className="gap-3 align-items-center mb-5"
          >
            <h1 className="fw-regular fs-5 text-uppercase mb-3">
              {editMode ? `Uredi kviz (${quizById.title})` : "Dodaj novi kviz"}
            </h1>
            {editMode && (
              <Button
                onClick={() => {
                  removeQuizById(quizById.id);
                }}
                variant="danger"
                className="d-flex align-items-center gap-1 ms-auto"
                size="sm"
              >
                <RiDeleteBin6Line /> Izbriši kviz
              </Button>
            )}
          </Stack>
          <Form
            onSubmit={createQuiz}
            noValidate
            validated={formValidated}
            className="d-flex flex-column gap-4"
          >
            <Form.Group className="mb-3">
              <Form.Label>Naziv kviza:</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                defaultValue={quizById ? quizById.title : ""}
              />
              <Form.Text className="text-muted">Naziv vašeg kviza</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Vrijeme izrade kviza u sekundama (opcionalno):
              </Form.Label>
              <Form.Control
                type="number"
                name="quizDuration"
                min={0}
                defaultValue={quizById ? quizById.quizDuration : ""}
              ></Form.Control>
              <Form.Text className="text-muted">
                (Korisnici će imati ograničeno vrijeme za rješavanje kviza)
              </Form.Text>
            </Form.Group>
            <Stack gap={3} className="mb-3">
              {questions.map((q, index) => {
                return (
                  <Stack
                    key={index}
                    direction="horizontal"
                    className="border px-2 py-1 rounded"
                  >
                    <div>
                      <h2 className="fw-semibold fs-5">
                        {index + 1}. {q.question}
                      </h2>
                      <ul>
                        {q.answers?.map((a, index) => {
                          console.log(
                            "q.correctAnswerIndex == index",
                            q.correctAnswerIndex,
                            index
                          );
                          return (
                            <li key={index}>
                              {a}{" "}
                              {+q.correctAnswerIndex === index && (
                                <GrValidate className="text-muted" />
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="d-flex align-items-center gap-2 ms-auto">
                      <Button
                        type="button"
                        size="sm"
                        className="d-flex align-items-center gap-1"
                        onClick={() => {
                          setQuestionEditing(q);
                          setIsElementActive(true);
                        }}
                      >
                        <MdModeEdit /> Uredi
                      </Button>
                      <Button
                        type="button"
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                          deleteQuestionById(q.id);
                        }}
                      >
                        <RiDeleteBin6Line />
                      </Button>
                    </div>
                  </Stack>
                );
              })}
            </Stack>
            <Button
              variant="outline-secondary"
              onClick={() => setIsElementActive(true)}
              className="d-flex align-items-center gap-1 align-self-start"
              size="sm"
            >
              <IoMdAdd /> Dodaj pitanje
            </Button>
            <Stack className="col-md-5 mx-auto my-5">
              <Button
                type="submit"
                className="mx-auto d-flex justify-content-center align-items-center gap-1"
              >
                <IoIosSave className="mt-1 fs-5" />{" "}
                {!editMode ? "Spasi kviz" : "Spasi izmjene"}
              </Button>
            </Stack>
          </Form>

          <Modal
            show={isElementActive}
            size="lg"
            onHide={() => {
              setIsElementActive(false);
            }}
          >
            <Form
              onSubmit={updateQuestions}
              noValidate
              validated={formValidated}
            >
              <Modal.Header closeButton>
                <Modal.Title>Dodaj pitanje</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column gap-3">
                <Form.Group className="mb-3">
                  <Form.Control
                    name="id"
                    type="text"
                    defaultValue={questionEditing ? questionEditing.id : ""}
                    hidden={true}
                  />
                  <Form.Label>Sadržaj pitanja:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="question"
                    defaultValue={
                      questionEditing ? questionEditing.question : ""
                    }
                  />
                  <Form.Text className="text-muted">
                    (Pitanje treba da bude jasno)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 d-flex flex-column gap-2">
                  <FloatingLabel controlId="floatingInput" label="Odgovor 1">
                    <Form.Control
                      required
                      type="text"
                      name="answer_1"
                      defaultValue={
                        questionEditing ? questionEditing.answers[0] : ""
                      }
                    ></Form.Control>{" "}
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingInput" label="Odgovor 2">
                    <Form.Control
                      required
                      type="text"
                      name="answer_2"
                      defaultValue={
                        questionEditing ? questionEditing.answers[1] : ""
                      }
                    ></Form.Control>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Odgovor 3 (opcionalno)"
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
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Odgovor 4 (opcionalno)"
                  >
                    <Form.Control
                      type="text"
                      name="answer_4"
                      defaultValue={
                        questionEditing ? questionEditing.answers[3] : ""
                      }
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Izaberi tačan odgovor pitanja"
                  >
                    <FormSelect
                      aria-label="Tačan odgovor"
                      name="correctAnswerIndex"
                      defaultValue={questionEditing?.correctAnswerIndex}
                    >
                      <option value="0">Odgovor 1</option>
                      <option value="1">Odgovor 2</option>
                      <option value="2">Odgovor 3</option>
                      <option value="3">Odgovor 4</option>
                    </FormSelect>
                  </FloatingLabel>
                  <Form.Text className="text-muted">
                    (Tačan odgovor određen u ovom polju koristi se prilikom
                    ocjenjivanja kviza)
                  </Form.Text>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setIsElementActive(false)}
                >
                  Zatvori
                </Button>
                <Button variant="primary" type="submit">
                  Spasi izmjene
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}
