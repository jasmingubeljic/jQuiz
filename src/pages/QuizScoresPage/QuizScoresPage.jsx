import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import useStore from "../../store/useStore";

export default function QuizScores() {
  const quizzes = useStore((store) => store.quizzes);
  const noContent = quizzes.length === 0;

  return (
    <Container>
      <h1 className="text-primary fw-regular fs-5 text-uppercase mb-3 m-auto ms-md-0">Pregled historije rezultata</h1>
      <Stack gap={3}>
        {!noContent &&
          quizzes.map((q, index) => (
            <Stack key={index} className="flex-column gap-3 border border-1 shadow-sm rounded px-3 py-3">
              <div className="d-flex flex-column flex-md-row align-items-center gap-1 gap-md-3 m-auto ms-md-0">
                <h2 className="fs-5 m-0 text-primary">{q.title}</h2>
                <p className="text-muted m-0 opacity-50">
                  {q.questions.length} {q.questions.length > 1 ? "pitanja" : "pitanje"}
                </p>
              </div>
              <div>
                {q.scoresHistory.map((data, index) => {
                  const formattedDate = data.createdAt?.split("T")[0];
                  const ordinalNo = index + 1;
                  return (
                    <div key={index}>
                      {ordinalNo}. <span className="fw-bold">{data.score}%</span> <span className="text-muted">({formattedDate})</span>
                    </div>
                  );
                })}
              </div>
            </Stack>
          ))}
        {noContent && <p>Statistika kvizova će biti prikazana kada se prikupe podaci prilikom rješavanja kvizova.</p>}
      </Stack>
    </Container>
  );
}
