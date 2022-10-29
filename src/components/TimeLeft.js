import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import {
  Button,
  Text,
  Container,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

momentDurationFormatSetup(moment);

function TimeLeft({ timeLeft, startStop, timerLabel, handleStartStop }) {
  const formatted = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });
  return (
    <Container className="timer">
      <Text fontSize="3xl" id="timer-label">
        {timerLabel}
      </Text>
      <CircularProgress size='120px'  value={0} color="green.400">
        <CircularProgressLabel id="time-left" >{formatted}</CircularProgressLabel>
      </CircularProgress>
      <br/>
      <Button id="start_stop" className="mt-3" onClick={handleStartStop}>
        {startStop}
      </Button>
    </Container>
  );
}

export default TimeLeft;
