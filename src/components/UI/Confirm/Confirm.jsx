import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

export default function Confirm(props) {
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
        <Button onClick={onClose} variant="secondary" className="px-4">
          Ne
        </Button>
        <Button type="submit" variant="primary" onClick={onConfirmAction} className="px-4">
          Da
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

Confirm.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmAction: PropTypes.func.isRequired,
};
