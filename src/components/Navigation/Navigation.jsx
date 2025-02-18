import { Col, Row, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { MdQuiz, MdAddCircle } from "react-icons/md";

export default function Navigation() {
  return (
    <Container>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={5}>
            <Link
              to="/"
              className="text-white text-decoration-none d-flex align-items-center gap-1"
            >
              <MdQuiz className="mt-1" /> Kvizovi
            </Link>
            <Link
              to="/create"
              className="text-white text-decoration-none d-flex align-items-center gap-1"
            >
              <MdAddCircle className="mt-1" /> Dodaj kviz
            </Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
