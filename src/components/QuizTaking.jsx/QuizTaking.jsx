import { Form, Button } from "react-bootstrap";
import useTakeQuiz from "../../hooks/useTakeQuiz";

export default function QuizTaking() {
  const {
    quizById,
    currentQuestionIndex,
    questionObj,
    questionsLength,
    quizResults,
    submitAnswerHandler,
  } = useTakeQuiz();

  const questionOrdinalNo = currentQuestionIndex + 1;

  if (!questionObj) return <p>Loading ...</p>;

  return (
    <>
      {!quizResults ? (
        <div>
          <h1>{quizById.title}</h1>
          <div>
            <h2>
              {questionObj.question} ({questionOrdinalNo}/{questionsLength})
            </h2>
            <Form onSubmit={submitAnswerHandler}>
              {questionObj.answers.map((a, index) => {
                return (
                  <Form.Check
                    label={a}
                    name="jgroup"
                    type="radio"
                    key={`radio-${index + 1}`}
                    value={a}
                  />
                );
              })}
              <Button type="submit" variant="primary">
                {currentQuestionIndex + 1 === questionsLength
                  ? "Submit Quiz"
                  : "Next"}
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <div>
          <h2>Your Score: {quizResults}%</h2>
        </div>
      )}
    </>
  );
}
