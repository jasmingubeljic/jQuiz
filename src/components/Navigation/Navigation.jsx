import { Col, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import useStore from "../../store/useStore";

export default function Navigation() {
  const { isAdmin, setIsAdmin } = useStore();
  return (
    <Container>
      <Row>
        <Col>
          <Stack direction="horizontal" className="gap-3">
            <Link to="/" className="text-white">
              Quizzes
            </Link>
            <Link to="/create" className="text-white">
              Add Quiz
            </Link>
            <Form.Check
              type="switch"
              name="adminSwitch"
              id="custom-switch"
              label="Admin"
              defaultChecked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
