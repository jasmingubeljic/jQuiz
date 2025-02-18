import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 ">
      <Spinner variant="primary" />
    </div>
  );
}
