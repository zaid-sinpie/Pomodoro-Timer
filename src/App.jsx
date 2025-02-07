import { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(25 * 60); // Default 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Pomodoro Timer ⏳</h1>
      <div className="text-5xl font-mono mb-4">{formatTime(time)}</div>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-green-500 rounded-lg"
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-red-500 rounded-lg"
          onClick={() => setIsRunning(false)}
        >
          Stop
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 rounded-lg"
          onClick={() => { setTime(25 * 60); setIsRunning(false); }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
