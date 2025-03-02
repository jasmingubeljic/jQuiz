import { Col, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { MdQuiz, MdAddCircle } from "react-icons/md";
import { IoListCircle } from "react-icons/io5";

export default function Navigation() {
  return (
    <Container>
      <Row>
        <Col>
          <Stack direction="horizontal" className="gap-4 gap-md-5">
            <Link to="/" className="text-white text-decoration-none d-flex align-items-center gap-1">
              <MdQuiz /> Quizzes
            </Link>
            <Link to="/create" className="text-white text-decoration-none d-flex align-items-center gap-1">
              <MdAddCircle /> Add Quiz
            </Link>
            <Link to="/scores" className="text-white text-decoration-none d-flex align-items-center gap-1">
              <IoListCircle /> Results
            </Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
