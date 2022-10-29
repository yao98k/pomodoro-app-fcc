import { useState, useEffect, useRef } from "react";
import "./App.css";
import { ChakraProvider, Button, Text } from "@chakra-ui/react";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const audioElement = useRef(null);
  const [mode, setMode] = useState("Session");
  const [intervalId, setIntervalId] = useState(null);
  const [breakLength, setBreakLength] = useState(300);
  // 25 minutes -> 1500 seconds

  const [sessionLength, setSessionLength] = useState(1500);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  //changing time left
  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  useEffect(() => {
    if (timeLeft === 0) {
      audioElement.current.play();
      if (mode === "Session") {
        setMode("Break");
        setTimeLeft(breakLength);
      } else if (mode === "Break") {
        setMode("Session");
        setTimeLeft(sessionLength);
      }
    }
  }, [timeLeft, mode, sessionLength, breakLength]);

  const incrementBreakOneMinute = () => {
    const temp = breakLength + 60;
    if (temp <= 60 * 60) {
      setBreakLength(temp);
    }
  };

  const decrementBreakOneMinute = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };

  const decrementSessionOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };

  const incrementSessionOneMinute = () => {
    const temp = sessionLength + 60;
    if (temp <= 3600) {
      setSessionLength(temp);
    }
  };

  const isStarted = intervalId !== null;
  function handleStartStop() {
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const tempId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setIntervalId(tempId);
    }
  }

  const handleReset = () => {
    audioElement.current.load();
    clearInterval(intervalId);
    setIntervalId(null);
    setMode("Session");
    setSessionLength(1500);
    setBreakLength(300);
    setTimeLeft(1500);
  };

  return (
    <div className="text-center App main">
      <ChakraProvider>
        <div className="row">
          <div className="col-8">
          <TimeLeft
            className="timer"
            handleStartStop={handleStartStop}
            timeLeft={timeLeft}
            startStop={isStarted ? "Stop" : "Start"}
            timerLabel={mode}
            breakLength={breakLength}
            sessionLength={sessionLength}
          />
          <Button id="reset" className="reset" onClick={handleReset}>
            Reset
          </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-4"> <Break
            className="break"
            breakLength={breakLength}
            decrementBreakOneMinute={decrementBreakOneMinute}
            incrementBreakOneMinute={incrementBreakOneMinute}
          />
          </div>
         <div className="col-4">
         <Session
            className="session"
            sessionLength={sessionLength}
            incrementSessionOneMinute={incrementSessionOneMinute}
            decrementSessionOneMinute={decrementSessionOneMinute}
          />
        
         </div>
          
        </div>

        <audio id="beep" ref={audioElement}>
          <source src="./beep.mp3" type="audio/mpeg" />
        </audio>
      </ChakraProvider>
    </div>
  );
}

export default App;
