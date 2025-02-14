import { Col, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <Container>
      <Row>
        <Col>
          <Stack direction="horizontal" className="gap-3">
            <Link to="/" className="text-white">
              Quizzes
            </Link>
            <Link to="/add" className="text-white">
              Add Quiz
            </Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
