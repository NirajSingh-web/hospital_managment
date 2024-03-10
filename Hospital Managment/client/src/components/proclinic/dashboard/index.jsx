import React, { useState, useEffect } from 'react';

const TaskCountsByYear = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [taskCountsByYear, setTaskCountsByYear] = useState([]);

  // Simulated task counts data
  const taskCountsData = {
    2022: 10,
    2023: 15,
    2024: 8,
    // Add more years and their task counts here
  };

  useEffect(() => {
    // Update task counts array when the year changes
    const updateTaskCountsByYear = () => {
      const countsArray = [];
      for (let year = currentYear - 2; year <= currentYear; year++) {
        countsArray.push({ year: year, count: taskCountsData[year] || 0 });
      }
      setTaskCountsByYear(countsArray);
    }
    updateTaskCountsByYear();
  }, [currentYear]);

  const incrementCount = (year) => {
    setTaskCountsByYear((prevCounts) => {
      return prevCounts.map((item) =>
        item.year === year ? { ...item, count: item.count + 1 } : item
      );
    });
  };

  return (
    <div>
      <h2>Task Counts by Year</h2>
      <div>
        <label>Select Year:</label>
        <select
          value={currentYear}
          onChange={(e) => setCurrentYear(parseInt(e.target.value))}
        >
          {Object.keys(taskCountsData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        {taskCountsByYear.map((item) => (
          <div key={item.year}>
            <p>
              Year: {item.year}, Task Count: {item.count}
              <button onClick={() => incrementCount(item.year)}>Increment</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCountsByYear;
