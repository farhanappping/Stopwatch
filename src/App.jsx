import { useState, useEffect, useRef } from "react";
import './App.css';

const Stopwatch = () => {
  const [time, setTime] = useState({ seconds: 0, milliseconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          let { seconds, milliseconds } = prevTime;

          // Increment milliseconds
          milliseconds += 10;

          // If milliseconds exceed 999, reset and increment seconds
          if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds += 1;
          }

          return { seconds, milliseconds };
        });
      }, 10); // Updates every 10ms for smooth milliseconds
    } else {
      clearInterval(intervalRef.current);
    }

    // Cleanup interval on unmount or when `isRunning` changes
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime({ seconds: 0, milliseconds: 0 });
    setIsRunning(false);
  };

  // Format time values to always display two digits
  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(time.seconds / 60); // Total minutes
  const seconds = time.seconds % 60; // Remainder of seconds

  return (
    <div className="stopwatch-div" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Stopwatch</h1>
      <div>
        <h2>
          {formatTime(minutes)}:{formatTime(seconds)}.<span className="miliseconds">{Math.floor(time.milliseconds / 10)}</span>
        </h2>
      </div>
      <div className="buttons">
        <button onClick={handleStart}>{isRunning ? "Stop" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
