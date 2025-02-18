import { Col, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useQuiz from "../../hooks/useQuiz";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { GrValidate } from "react-icons/gr";
import Loader from "../Loader/Loader";
import QuestionManager from "../QuestionManager/QuestionManager";
import styles from "./QuizManager.module.css";

export default function AddQuiz() {
  const {
    questions,
    updateQuestions,
    createQuiz,
    removeQuizById,
    formValidated,
    form2Validated,
    isElementActive,
    setIsElementActive,
    quizById,
    deleteQuestionById,
    questionEditing,
    setQuestionEditing,
    editMode,
  } = useQuiz();

  if (editMode && !quizById) {
    return <Loader />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Stack direction="horizontal" className="gap-3 align-items-center mb-5">
            <h1 className="fw-regular fs-5 text-uppercase mb-3 m-auto ms-md-0">{editMode ? `Uredi kviz (${quizById.title})` : "Dodaj novi kviz"}</h1>
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
          <Form onSubmit={createQuiz} noValidate validated={formValidated} className="d-flex flex-column gap-4">
            <Form.Group className="mb-3">
              <Form.Label>Naziv kviza:</Form.Label>
              <Form.Control required type="text" name="title" defaultValue={quizById ? quizById.title : ""} />
              <Form.Text className="text-muted">Naziv vašeg kviza</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vrijeme izrade kviza u sekundama (opcionalno):</Form.Label>
              <Form.Control
                type="number"
                name="quizDuration"
                min={0}
                defaultValue={quizById ? quizById.quizDuration : ""}
                className={`${styles["quiz-duration"]}`}
              ></Form.Control>
              <Form.Text className="text-muted">(Korisnici će imati ograničeno vrijeme za rješavanje kviza)</Form.Text>
            </Form.Group>
            <Stack gap={3} className="mb-3">
              {questions.map((q, index) => {
                return (
                  <Stack key={index} direction="horizontal" className="border px-2 py-1 rounded">
                    <div>
                      <h2 className="fw-semibold fs-5">
                        {index + 1}. {q.question}
                      </h2>
                      <ul>
                        {q.answers?.map((a, index) => {
                          return (
                            <li key={index}>
                              {a} {+q.correctAnswerIndex === index && <GrValidate className="text-muted" />}
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
            <QuestionManager
              isElementActive={isElementActive}
              onHide={() => {
                setIsElementActive(false);
              }}
              onSubmit={updateQuestions}
              form2Validated={form2Validated}
              questionEditing={questionEditing}
              onClose={() => setIsElementActive(false)}
            />
            <Button variant="outline-secondary" onClick={() => setIsElementActive(true)} className="d-flex align-items-center gap-1 m-auto ms-md-0" size="sm">
              <IoMdAdd /> Dodaj pitanje
            </Button>
            <Stack className="col-md-5 mx-auto mt-2 mt-md-5 mb-5">
              <Button type="submit" className="mx-auto d-flex justify-content-center align-items-center gap-1">
                <IoIosSave className="mt-1 fs-5" /> {!editMode ? "Spasi kviz" : "Spasi izmjene"}
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
