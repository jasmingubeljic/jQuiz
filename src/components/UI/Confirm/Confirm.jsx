import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Confirm(props) {
  // eslint-disable-next-line react/prop-types
  const { title, message, show, onClose, onConfirmAction } = props;
  return (
    <Modal show={show} onHide={onClose} onClose={onClose} centered>
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} variant="secondary">
          Ne
        </Button>
        <Button type="submit" variant="primary" onClick={onConfirmAction}>
          Da
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
