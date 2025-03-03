import { Col, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useManageQuiz from "../../hooks/useManageQuiz";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { RiSave2Line } from "react-icons/ri";
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
    quizTitle,
    setQuizTitle,
    editMode,
  } = useManageQuiz();

  if (editMode && !quizById) {
    return <Loader />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Stack direction="horizontal" className="gap-3 align-items-center mb-5">
            <h1 className="text-primary fw-regular fs-5 text-uppercase mb-3 m-auto ms-md-0">{editMode ? `Edit Quiz (${quizById.title})` : "Add New Quiz"}</h1>
            {editMode && (
              <Button
                onClick={() => {
                  removeQuizById(quizById.id);
                }}
                variant="danger"
                className="d-flex align-items-center gap-1 ms-auto"
                size="sm"
              >
                <RiDeleteBin6Line /> Delete Quiz
              </Button>
            )}
          </Stack>
          <Form onSubmit={createQuiz} noValidate validated={formValidated} className="d-flex flex-column gap-4">
            <Form.Group className="mb-3">
              <Form.Label>Quiz Title:</Form.Label>
              <Form.Control required type="text" name="title" value={quizTitle} size="lg" onChange={(e) => setQuizTitle(e.target.value)} />
              <Form.Text className="text-muted">Add a descriptive title for your quiz</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time Limit (optional):</Form.Label>
              <Form.Control
                type="number"
                name="quizDuration"
                min={0}
                defaultValue={quizById ? quizById.quizDuration : ""}
                className={`${styles["quiz-duration"]}`}
                size="sm"
              ></Form.Control>
              <Form.Text className="text-muted">Users will have a limited time to complete the quiz</Form.Text>
            </Form.Group>
            <Stack gap={3} className="mb-3">
              {questions.map((q, index) => {
                return (
                  <Stack key={index} direction="horizontal" className="border px-2 px-md-3 py-1 py-md-2 rounded">
                    <div>
                      <h2 className="fw-semibold fs-5 text-primary">
                        {index + 1}. {q.question}
                      </h2>
                      <ul>
                        {q.answers?.map((a, index) => {
                          return (
                            <li key={index}>
                              {a} {+q.correctAnswerIndex === index && <GrValidate className="text-secondary ms-1" />}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="d-flex align-items-center gap-2 ms-auto">
                      <Button
                        type="button"
                        size="sm"
                        className="d-flex align-items-center gap-1 pe-3"
                        onClick={() => {
                          setQuestionEditing(q);
                          setIsElementActive(true);
                        }}
                      >
                        <MdModeEdit /> Edit
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
              className="d-flex align-items-center gap-1 m-auto ms-md-0 pe-3"
              size="sm"
            >
              <IoMdAdd /> Add Question
            </Button>
            <Stack className="col-md-5 mx-auto mt-2 mt-md-5 mb-5">
              <Button type="submit" className="mx-auto d-flex justify-content-center align-items-center gap-1">
                <RiSave2Line className="fs-5" /> {!editMode ? "Save Quiz" : "Update Quiz"}
              </Button>
            </Stack>
          </Form>
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
        </Col>
      </Row>
    </Container>
  );
}
