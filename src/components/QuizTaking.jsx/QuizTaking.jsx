import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import useTakeQuiz from "../../hooks/useTakeQuiz";

import Confirm from "../UI/Confirm/Confirm";
import Spinner from "react-bootstrap/Spinner";
import QuizCountdown from "../QuizCountdown/QuizCountdown";

export default function QuizTaking() {
  const {
    quizById,
    currentQuestionIndex,
    questionObj,
    questionsLength,
    quizResults,
    quizMessage,
    submitAnswerHandler,
    isElementActive,
    setIsElementActive,
  } = useTakeQuiz();

  const questionOrdinalNo = currentQuestionIndex + 1;

  const buttonRef = useRef();

  if (!questionObj)
    return <Spinner animation="grow" variant="primary" size="sm" />;

  return (
    <>
      {!quizResults ? (
        <div>
          <h1 className="fw-regular fs-5 text-uppercase mb-5">
            {quizById.title}
          </h1>
          <div>
            <h2 className="fs-4">
              {questionObj.question} ({questionOrdinalNo}/{questionsLength})
            </h2>
            <Form onSubmit={submitAnswerHandler}>
              {questionObj.answers.map((a, index) => {
                return (
                  <Form.Check
                    key={`radio-${index + 1}-${questionObj.question}`}
                    label={a}
                    name="jgroup"
                    type="radio"
                    value={a}
                    className="mt-2"
                  />
                );
              })}

              <Button
                ref={buttonRef}
                type="submit"
                variant="primary"
                hidden={currentQuestionIndex + 1 === questionsLength}
                className="mt-5"
              >
                Dalje
              </Button>

              <Button
                onClick={() => setIsElementActive(true)}
                variant="primary"
                hidden={currentQuestionIndex + 1 !== questionsLength}
                className="mt-5"
              >
                Završi
              </Button>

              <Confirm
                title="Da li ste sigurni...?"
                message="Da li ste sigurni da želite završiti kviz?"
                show={isElementActive}
                onClose={() => setIsElementActive(false)}
                onConfirmAction={() => {
                  setIsElementActive(false);
                  buttonRef.current.click();
                }}
              />

              <QuizCountdown
                quizDuration={quizById.quizDuration}
                quizResults={quizResults}
              />
            </Form>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="fw-regular fs-5 text-uppercase mb-5">Rezultat</h1>
          <h2 className="fs-3">
            Vaš rezultat je <span className="fw-bold">{quizResults}%</span>
          </h2>
          <p>{quizMessage}</p>
        </div>
      )}
    </>
  );
}
