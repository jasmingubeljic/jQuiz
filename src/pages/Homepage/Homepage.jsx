import useSortQuizzes from "../../hooks/useSortQuizzes";
import SortBar from "../../components/SortBar/SortBar";
import QuizzesList from "../../components/QuizzesList/QuizzesList";
import Container from "react-bootstrap/Container";

export default function Homepage() {
  const { sortedQuizzes, handleSortQuizzes } = useSortQuizzes();
  return (
    <Container>
      <SortBar onSortHandler={handleSortQuizzes} />
      <QuizzesList sortedQuizzes={sortedQuizzes} />
    </Container>
  );
}
