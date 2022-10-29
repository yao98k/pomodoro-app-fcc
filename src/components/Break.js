import { Button,Text,Container} from "@chakra-ui/react";
import moment from "moment";


function Break({breakLength,decrementBreakOneMinute,incrementBreakOneMinute}) {
  

  const breakLengthMinutes = moment.duration(breakLength,"s").asMinutes();
  return (
    <Container className="break">
      <Text fontSize='3xl' id="break-label">Break</Text>
      <Text  fontSize='3xl' id="break-length">{breakLengthMinutes}</Text>
      <Button id ="break-decrement" onClick={decrementBreakOneMinute}>-</Button>
      <Button id ="break-increment" onClick={incrementBreakOneMinute}>+</Button>

    </Container>
  );
}

export default Break;
