import { Col, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { MdQuiz, MdAddCircle } from "react-icons/md";
import useStore from "../../store/useStore";

export default function Navigation() {
  const { isAdmin, setIsAdmin } = useStore();
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
            <Form.Check
              type="switch"
              name="adminSwitch"
              label="Admin"
              defaultChecked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="ms-auto d-flex gap-2 align-items-center"
            ></Form.Check>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
