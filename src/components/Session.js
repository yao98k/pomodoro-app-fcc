import moment from "moment";
import { Button ,Text,Container} from "@chakra-ui/react";


function Session({sessionLength,incrementSessionOneMinute,decrementSessionOneMinute}) {


  const sessionLengthMinutes = moment.duration(sessionLength,"s").asMinutes();
  return (
    <Container className="session">
      <Text  fontSize='3xl'  id="session-label">Session</Text>
      <Text  fontSize='3xl' id="session-length">{sessionLengthMinutes}</Text>
      <Button id ="session-decrement" onClick={decrementSessionOneMinute}>-</Button>
      <Button id ="session-increment" onClick={incrementSessionOneMinute}>+</Button>

    </Container>
  );
}

export default Session;
