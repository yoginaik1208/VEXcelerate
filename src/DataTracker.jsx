import { useState, useEffect } from 'react';
import './DataTracker.css';

function DataTracker({ onBackToAnalyzer }) {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'calendar', 'dayRuns'
  const [monthlyData, setMonthlyData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [monthToDelete, setMonthToDelete] = useState('');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('vex-data-tracker');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setMonthlyData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever monthlyData changes
  useEffect(() => {
    localStorage.setItem('vex-data-tracker', JSON.stringify(monthlyData));
  }, [monthlyData]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month) => {
    const monthIndex = months.indexOf(month);
    const year = new Date().getFullYear();
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const addMonthChart = (month) => {
    if (!monthlyData[month]) {
      setMonthlyData(prev => ({
        ...prev,
        [month]: {}
      }));
    }
    setShowMonthSelector(false);
  };

  const updateScore = (month, day, score) => {
    setMonthlyData(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        [day]: score
      }
    }));
  };

  const updateDayRuns = (month, day, runs) => {
    // Calculate average of all runs for the day
    const validRuns = runs.filter(score => score !== '' && score !== null && !isNaN(score));
    const average = validRuns.length > 0 ? 
      validRuns.reduce((sum, score) => sum + parseFloat(score), 0) / validRuns.length : 0;
    
    setMonthlyData(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        [`${day}_runs`]: runs,
        [day]: parseFloat(average.toFixed(1))
      }
    }));
  };

  const openDayRuns = (month, day) => {
    setCalendarMonth(month);
    setSelectedDay(day);
    setCurrentView('dayRuns');
  };

  const openCalendar = (month) => {
    setCalendarMonth(month);
    setCurrentView('calendar');
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all saved data? This action cannot be undone.')) {
      setMonthlyData({});
      localStorage.setItem('vex-data-tracker', JSON.stringify({}));
    }
  };

  const deleteMonth = (month) => {
    setMonthToDelete(month);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteMonth = () => {
    setMonthlyData(prev => {
      const newData = { ...prev };
      delete newData[monthToDelete];
      // Immediately save to localStorage to ensure deletion persists
      localStorage.setItem('vex-data-tracker', JSON.stringify(newData));
      return newData;
    });
    setShowDeleteConfirm(false);
    setMonthToDelete('');
  };

  const cancelDeleteMonth = () => {
    setShowDeleteConfirm(false);
    setMonthToDelete('');
  };

  const getMonthScores = (month) => {
    const scores = monthlyData[month] || {};
    const sortedEntries = Object.entries(scores)
      .filter(([day, score]) => !day.includes('_runs')) // Filter out runs data, only include daily averages
      .map(([day, score]) => ({ day: parseInt(day), score: parseFloat(score) }))
      .filter(entry => !isNaN(entry.day) && !isNaN(entry.score)) // Ensure valid numbers
      .sort((a, b) => a.day - b.day);
    return sortedEntries;
  };

  const renderLineGraph = (month) => {
    const scores = getMonthScores(month);
    if (scores.length === 0) return null;

    const maxScore = Math.max(...scores.map(s => s.score));
    const minScore = Math.min(...scores.map(s => s.score));
    const scoreRange = maxScore - minScore || 1;

    const svgWidth = 500;
    const svgHeight = 250;
    const padding = 60;

    const getX = (day) => padding + ((day - 1) / 30) * (svgWidth - 2 * padding);
    const getY = (score) => svgHeight - padding - ((score - minScore) / scoreRange) * (svgHeight - 2 * padding);

    let pathData = '';
    scores.forEach((point, index) => {
      const x = getX(point.day);
      const y = getY(point.score);
      if (index === 0) {
        pathData = `M ${x} ${y}`;
      } else {
        pathData += ` L ${x} ${y}`;
      }
    });

    // Calculate intermediate Y-axis values
    const midScore = ((maxScore + minScore) / 2).toFixed(1);

    return (
      <div className="graph-container">
        <svg width={svgWidth} height={svgHeight} className="line-graph">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="rgba(255,248,220,0.15)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Axes */}
          <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} 
                stroke="var(--cream-light)" strokeWidth="2" />
          <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} 
                stroke="var(--cream-light)" strokeWidth="2" />
          
          {/* Y-axis labels with better spacing */}
          <text x={padding - 15} y={padding + 5} textAnchor="end" fill="var(--cream-light)" 
                fontSize="14" fontFamily="'Segoe UI', 'Roboto', 'Inter', sans-serif" fontWeight="500">
            {maxScore}
          </text>
          <text x={padding - 15} y={(svgHeight / 2) + 5} textAnchor="end" fill="var(--cream-light)" 
                fontSize="14" fontFamily="'Segoe UI', 'Roboto', 'Inter', sans-serif" fontWeight="500">
            {midScore}
          </text>
          <text x={padding - 15} y={svgHeight - padding + 5} textAnchor="end" fill="var(--cream-light)" 
                fontSize="14" fontFamily="'Segoe UI', 'Roboto', 'Inter', sans-serif" fontWeight="500">
            {minScore}
          </text>
          
          {/* X-axis labels with better spacing */}
          <text x={padding} y={svgHeight - padding + 25} textAnchor="middle" fill="var(--cream-light)" 
                fontSize="14" fontFamily="'Segoe UI', 'Roboto', 'Inter', sans-serif" fontWeight="500">
            1
          </text>
          <text x={padding + (svgWidth - 2 * padding) / 3} y={svgHeight - padding + 25} textAnchor="middle" fill="var(--cream-light)" 
                fontSize="14" fontFamily="'Segoe UI', 'Roboto', 'Inter', sans-serif" fontWeight="500">
            10
          </text>
          <text x={padding + 2 * (svgWidth - 2 * padding) / 3} y={svgHeight - padding + 25} textAnchor="middle" fill="var(--cream-light)" 
                fontSize="14" fontFamily="'Segoe UI', 'Roboto', 'Inter', sans-serif" fontWeight="500">
            20
          </text>
          <text x={svgWidth - padding} y={svgHeight - padding + 25} textAnchor="middle" fill="var(--cream-light)" 
                fontSize="14" fontFamily="'Segoe UI', 'Roboto', 'Inter', sans-serif" fontWeight="500">
            31
          </text>
          
          {/* Line */}
          {pathData && (
            <path d={pathData} fill="none" stroke="#4FC3F7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          )}
          
          {/* Data points - NO TEXT ON TOP */}
          {scores.map((point, index) => (
            <circle 
              key={index}
              cx={getX(point.day)} 
              cy={getY(point.score)} 
              r="7" 
              fill="#4FC3F7" 
              stroke="white" 
              strokeWidth="3"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
            />
          ))}
        </svg>
      </div>
    );
  };

  if (currentView === 'calendar') {
    return <CalendarView 
      month={calendarMonth}
      scores={monthlyData[calendarMonth] || {}}
      onUpdateScore={(day, score) => updateScore(calendarMonth, day, score)}
      onOpenDayRuns={(day) => openDayRuns(calendarMonth, day)}
      onBack={() => setCurrentView('main')}
      getDaysInMonth={getDaysInMonth}
    />;
  }

  if (currentView === 'dayRuns') {
    return <DayRunsView 
      month={calendarMonth}
      day={selectedDay}
      runs={monthlyData[calendarMonth]?.[`${selectedDay}_runs`] || Array(20).fill('')}
      onUpdateRuns={(runs) => updateDayRuns(calendarMonth, selectedDay, runs)}
      onBack={() => setCurrentView('calendar')}
    />;
  }

  return (
    <div className="data-tracker-container">
      <div className="tracker-header">
        <h1>Team Data Tracker</h1>
        <p style={{marginTop: '-8px', color: '#3b4ba0', fontWeight: 600}}>
          Track your team's progress with monthly score charts
        </p>
      </div>

      <div className="tracker-content">
        <div className="add-chart-section">
          <div className="chart-controls">
            <button 
              onClick={() => setShowMonthSelector(!showMonthSelector)} 
              className="add-chart-button"
            >
              + Add Monthly Chart
            </button>
            
            {Object.keys(monthlyData).length > 0 && (
              <button 
                onClick={clearAllData} 
                className="clear-data-button"
                style={{marginLeft: '10px'}}
              >
                Clear All Data
              </button>
            )}
          </div>
          
          {showMonthSelector && (
            <div className="month-selector">
              <h3>Select a Month:</h3>
              <div className="month-grid">
                {months.map(month => (
                  <button 
                    key={month}
                    onClick={() => addMonthChart(month)}
                    className="month-option"
                    disabled={!!monthlyData[month]}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="charts-section">
          {Object.keys(monthlyData).map(month => (
            <div key={month} className="month-chart">
              <div className="month-header">
                <div 
                  className="month-box"
                  onClick={() => openCalendar(month)}
                >
                  {month}
                </div>
                <button 
                  className="delete-month-button"
                  onClick={() => deleteMonth(month)}
                  title={`Delete ${month}`}
                >
                  🗑️
                </button>
              </div>
              
              <div className="chart-content">
                <h3 style={{ color: 'var(--cream-dark)', marginBottom: '1rem' }}>
                  {month} Performance Chart
                </h3>
                
                {getMonthScores(month).length > 0 ? (
                  renderLineGraph(month)
                ) : (
                  <div className="no-data-message">
                    Click the month box above to add scores for {month}
                  </div>
                )}
                
                {getMonthScores(month).length > 0 && (
                  <div className="score-summary">
                    <div className="summary-stats">
                      <span>Total Entries: {getMonthScores(month).length}</span>
                      <span>Avg Score: {(getMonthScores(month).reduce((sum, s) => sum + s.score, 0) / getMonthScores(month).length).toFixed(1)}</span>
                      <span>Best: {Math.max(...getMonthScores(month).map(s => s.score))}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {Object.keys(monthlyData).length === 0 && (
          <div className="empty-state">
            <h3>No charts added yet</h3>
            <p>Click "Add Monthly Chart" to start tracking your team's progress</p>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h3>Delete {monthToDelete}?</h3>
            <p>Are you sure you want to delete <strong>{monthToDelete}</strong>?</p>
            <p style={{color: '#dc3545', fontWeight: 'bold', fontSize: '0.9rem'}}>
              All your data for this month will be permanently deleted and cannot be recovered.
            </p>
            <div className="modal-buttons">
              <button 
                className="confirm-button"
                onClick={confirmDeleteMonth}
              >
                Yes, Delete
              </button>
              <button 
                className="cancel-button"
                onClick={cancelDeleteMonth}
              >
                No, Keep It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Calendar View Component
function CalendarView({ month, scores, onUpdateScore, onOpenDayRuns, onBack, getDaysInMonth }) {
  const [selectedDay, setSelectedDay] = useState('');
  const [scoreInput, setScoreInput] = useState('');

  const daysInMonth = getDaysInMonth(month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDayClick = (day) => {
    onOpenDayRuns(day);
  };

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    if (selectedDay && scoreInput) {
      onUpdateScore(selectedDay, parseFloat(scoreInput));
      setScoreInput('');
      setSelectedDay('');
    }
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <h1>{month} Score Entry</h1>
        <p style={{color: '#3b4ba0', fontWeight: 600}}>
          Click on a day to enter multiple practice run scores
        </p>
      </div>

      <div className="calendar-grid">
        {days.map(day => (
          <div 
            key={day}
            className={`calendar-day ${scores[day] ? 'has-score' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <div className="day-number">{day}</div>
            {scores[day] && <div className="day-score">{scores[day]}</div>}
          </div>
        ))}
      </div>

      <div className="calendar-footer">
        <button onClick={onBack} className="done-button">
          Back to Main View
        </button>
      </div>
    </div>
  );
}

// Day Runs View Component - 20 practice runs per day
function DayRunsView({ month, day, runs, onUpdateRuns, onBack }) {
  const [dayRuns, setDayRuns] = useState(runs);

  const handleRunChange = (runIndex, score) => {
    const newRuns = [...dayRuns];
    newRuns[runIndex] = score;
    setDayRuns(newRuns);
    onUpdateRuns(newRuns);
  };

  const clearAllRuns = () => {
    const emptyRuns = Array(20).fill('');
    setDayRuns(emptyRuns);
    onUpdateRuns(emptyRuns);
  };

  const calculateAverage = () => {
    const validRuns = dayRuns.filter(score => score !== '' && score !== null && !isNaN(score));
    return validRuns.length > 0 ? 
      (validRuns.reduce((sum, score) => sum + parseFloat(score), 0) / validRuns.length).toFixed(1) : 0;
  };

  return (
    <div className="day-runs-view">
      <div className="day-runs-header">
        <h1>{month} - Day {day} Practice Runs</h1>
        <p style={{color: '#3b4ba0', fontWeight: 600}}>
          Enter scores for up to 20 practice runs. The average will be used as the day's score.
        </p>
        <div className="average-display">
          <span className="average-label">Current Average: </span>
          <span className="average-score">{calculateAverage()}</span>
        </div>
      </div>

      <div className="runs-grid">
        {dayRuns.map((score, index) => (
          <div key={index} className="run-input-item">
            <label className="run-label">Run {index + 1}:</label>
            <input
              type="number"
              value={score}
              onChange={(e) => handleRunChange(index, e.target.value)}
              placeholder="Score"
              className="run-score-input"
              min="0"
              step="0.1"
            />
          </div>
        ))}
      </div>

      <div className="day-runs-footer">
        <button onClick={clearAllRuns} className="clear-runs-button">
          Clear All Runs
        </button>
        <button onClick={onBack} className="done-button">
          Back to Calendar
        </button>
      </div>
    </div>
  );
}

export default DataTracker;
