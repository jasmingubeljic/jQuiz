import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { AiOutlineGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <Container fluid className="mt-5 bg-dark text-light">
      <Container className="py-4">
        <Row>
          <Col>
            <p className="d-flex align-items-center gap-2 opacity-75">
              <AiOutlineGithub className="fs-5" /> https://github.com/jasmingubeljic/jQuiz
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
