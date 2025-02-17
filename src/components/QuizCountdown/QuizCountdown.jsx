import Countdown, { zeroPad } from "react-countdown";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

export default function QuizCountdown(props) {
  const { quizDuration, quizResults } = props;
  const quizDurationInMS = +quizDuration * 1000;
  const navigate = useNavigate();

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      if (quizResults) {
        return console.log("quiz completed withing a time limit");
      }
      setTimeout(() => {
        // in case of real project app, we would disable client interaction with the form
        navigate(`/`);
      }, 1700);
      return (
        <div>
          <Alert className="mt-5" variant="danger">
            Vrijeme za rješavanje kviza je isteklo!
          </Alert>
        </div>
      );
    } else {
      return (
        <div className="mt-5">
          <p className="text-muted">
            Preostalo vrijeme: {zeroPad(hours)}:{zeroPad(minutes)}:
            {zeroPad(seconds)}
          </p>
        </div>
      );
    }
  };

  if (!quizDuration) return;

  return <Countdown date={Date.now() + quizDurationInMS} renderer={renderer} />;
}
