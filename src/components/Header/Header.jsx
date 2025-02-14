import Navigation from "../Navigation/Navigation";
import Container from "react-bootstrap/Container";

export default function Header() {
  return (
    <Container fluid className="bg-primary py-3 mb-4">
      <Navigation />
    </Container>
  );
}
