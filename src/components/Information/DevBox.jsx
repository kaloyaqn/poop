import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function DevBox() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [loadTime, setLoadTime] = useState(null);
  const [cpuUsage, setCpuUsage] = useState(null);

  // Function to calculate load time
  const calculateLoadTime = () => {
    const endTime = performance.now();
    const timeInMilliseconds = endTime - startTime.current;
    setLoadTime(timeInMilliseconds);
  };

  // Start time when component mounts
  const startTime = useRef(performance.now());

  // Callback for the PerformanceObserver
  const handleObserver = (list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    const cpuUsagePercent = lastEntry.workStart / lastEntry.duration;
    setCpuUsage((cpuUsagePercent * 100).toFixed(2));
  };

  useEffect(() => {
    // Set up the PerformanceObserver
    const observer = new PerformanceObserver(handleObserver);
    observer.observe({ entryTypes: ["task"], buffered: true });

    // Simulate loading or any other operation
    // ...

    // Call calculateLoadTime when the operation is completed
    calculateLoadTime();

    // Disconnect the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array to ensure it runs only once after the initial render

  return (
    <>
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 0, top: -700, bottom: 0 }}
        className="absolute z-99 bg-green-300 w-64 p-3 bottom-20 right-0"
        style={{ zIndex: 99 }}
      >
        <h2>Width: <b className="font-bold">{windowSize.current[0]}px</b></h2>
        <h2>Height: <b className="font-bold">{windowSize.current[1]}px</b></h2>
        {loadTime !== null && <p>Load Time: {loadTime} milliseconds</p>}
        {cpuUsage !== null && <p>CPU Usage: {cpuUsage}%</p>}
      </motion.div>
    </>
  );
}
