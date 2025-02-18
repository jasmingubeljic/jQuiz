import { useRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import useTakeQuiz from "../../hooks/useTakeQuiz";

import Confirm from "../UI/Confirm/Confirm";
import Loader from "../Loader/Loader";
import QuizCountdown from "../QuizCountdown/QuizCountdown";

export default function QuizTaking() {
  const { quizById, currentQuestionIndex, questionObj, questionsLength, quizResults, quizMessage, submitAnswerHandler, isElementActive, setIsElementActive } =
    useTakeQuiz();

  const questionOrdinalNo = currentQuestionIndex + 1;

  const buttonRef = useRef();

  if (!questionObj) return <Loader />;

  return (
    <>
      {!quizResults ? (
        <div>
          <h1 className="fw-regular fs-5 text-uppercase mb-5 text-center text-md-start">{quizById.title}</h1>
          <div>
            <Form onSubmit={submitAnswerHandler} className="d-flex flex-column">
              <div className="m-auto ms-md-0">
                <h2 className="fs-4 text-primary">
                  {questionObj.question}{" "}
                  <span className="text-secondary fs-5">
                    ({questionOrdinalNo}/{questionsLength})
                  </span>
                </h2>
                {questionObj.answers.map((a, index) => {
                  return <Form.Check key={`radio-${index + 1}-${questionObj.question}`} label={a} name="jgroup" type="radio" value={a} className="mt-2" />;
                })}
              </div>
              <div className="m-auto ms-md-0">
                <Button ref={buttonRef} type="submit" variant="primary" hidden={currentQuestionIndex + 1 === questionsLength} className="mt-5">
                  Dalje
                </Button>

                <Button onClick={() => setIsElementActive(true)} variant="primary" hidden={currentQuestionIndex + 1 !== questionsLength} className="mt-5">
                  Završi
                </Button>

                <Confirm
                  title="Da li ...?"
                  message="Da li ste sigurni da želite završiti kviz?"
                  show={isElementActive}
                  onClose={() => setIsElementActive(false)}
                  onConfirmAction={() => {
                    setIsElementActive(false);
                    buttonRef.current.click();
                  }}
                />

                <QuizCountdown quizDuration={quizById.quizDuration} quizResults={quizResults} />
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="fw-regular fs-5 text-uppercase my-5">Rezultat</h1>
          <h2 className="text-primary fs-2 ms-md-0">
            Vaš rezultat je <span className="fw-bold">{quizResults}%</span>
          </h2>
          <Alert variant="secondary" className="text-primary mt-2 m-auto">
            {quizMessage}
          </Alert>
        </div>
      )}
    </>
  );
}
