import { useState, useEffect } from 'react';
import './MixMatchCalculator.css';

function MixMatchCalculator({ onBackToAnalyzer }) {
  const [scores, setScores] = useState({
    connectedPins: 0,
    connectedBeams: 0,
    twoColorStackBonus: 0,
    threeColorStackBonus: 0,
    matchingGoals: 0,
    standoffGoal: 0,
    clearedStartingPins: 0,
    endOfMatchContact: 0
  });

  const [totalScore, setTotalScore] = useState(0);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Official VEX IQ Mix and Match 2025-26 Scoring Values
  const scoringValues = {
    connectedPins: 1,           // 1 point each connected pin
    connectedBeams: 10,         // 10 points each connected beam
    twoColorStackBonus: 5,      // 5 points per 2-color stack bonus
    threeColorStackBonus: 15,   // 15 points per 3-color stack bonus
    matchingGoals: 10,          // 10 points per matching goal bonus
    standoffGoal: 10,           // 10 points per stack on standoff goal
    clearedStartingPins: 2,     // 2 points per cleared starting pin
    endOfMatchContact: 2        // 2 points per robot in contact with scoring objects
  };

  // Calculate total score whenever scores change
  useEffect(() => {
    const total = 
      scores.connectedPins * scoringValues.connectedPins +
      scores.connectedBeams * scoringValues.connectedBeams +
      scores.twoColorStackBonus * scoringValues.twoColorStackBonus +
      scores.threeColorStackBonus * scoringValues.threeColorStackBonus +
      scores.matchingGoals * scoringValues.matchingGoals +
      scores.standoffGoal * scoringValues.standoffGoal +
      scores.clearedStartingPins * scoringValues.clearedStartingPins +
      scores.endOfMatchContact * scoringValues.endOfMatchContact;
    
    setTotalScore(total);
  }, [scores, scoringValues.connectedPins, scoringValues.connectedBeams, scoringValues.twoColorStackBonus, 
      scoringValues.threeColorStackBonus, scoringValues.matchingGoals, scoringValues.standoffGoal, 
      scoringValues.clearedStartingPins, scoringValues.endOfMatchContact]);

  const updateScore = (category, value) => {
    setScores(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getCurrentMonth = () => {
    const now = new Date();
    return months[now.getMonth()];
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.getDate();
  };

  const handleSaveToDataTracker = () => {
    if (totalScore === 0) {
      alert('Please calculate a score first before saving!');
      return;
    }
    
    // Initialize with current date
    const currentMonth = getCurrentMonth();
    const currentDay = getCurrentDate();
    
    setSelectedMonth(currentMonth);
    setSelectedDate(currentDay.toString());
    setShowSaveDialog(true);
  };

  const confirmSave = () => {
    if (!selectedMonth || !selectedDate) {
      alert('Please select both a month and date!');
      return;
    }

    try {
      // Load existing data
      const savedData = localStorage.getItem('vex-data-tracker');
      let monthlyData = savedData ? JSON.parse(savedData) : {};
      
      console.log('Mix&Match saving - before:', monthlyData);

      // Ensure month exists
      if (!monthlyData[selectedMonth]) {
        monthlyData[selectedMonth] = {};
      }

      // Save the score to the selected date
      monthlyData[selectedMonth][selectedDate] = totalScore;
      
      console.log('Mix&Match saving - after:', monthlyData);

      // Save back to localStorage
      localStorage.setItem('vex-data-tracker', JSON.stringify(monthlyData));
      
      console.log('Mix&Match saved successfully:', {
        month: selectedMonth,
        date: selectedDate,
        score: totalScore
      });

      // Show success message
      setSaveSuccess(true);
      setShowSaveDialog(false);

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error saving to data tracker:', error);
      alert('Error saving to data tracker. Please try again.');
    }
  };

  const cancelSave = () => {
    setShowSaveDialog(false);
    setSelectedMonth('');
    setSelectedDate('');
  };

  const clearAllScores = () => {
    setScores({
      connectedPins: 0,
      connectedBeams: 0,
      twoColorStackBonus: 0,
      threeColorStackBonus: 0,
      matchingGoals: 0,
      standoffGoal: 0,
      clearedStartingPins: 0,
      endOfMatchContact: 0
    });
  };

  const ScoreInput = ({ label, category, pointValue, max = 50 }) => (
    <div className="score-input-item">
      <div className="score-label">
        <span className="label-text">{label}</span>
        <span className="point-value">({pointValue} pts each)</span>
      </div>
      <div className="input-controls">
        <button 
          onClick={() => updateScore(category, Math.max(0, scores[category] - 1))}
          className="control-button minus"
          disabled={scores[category] <= 0}
        >
          −
        </button>
        <input
          type="number"
          value={scores[category]}
          onChange={(e) => updateScore(category, Math.max(0, Math.min(max, parseInt(e.target.value) || 0)))}
          className="score-input-field"
          min="0"
          max={max}
        />
        <button 
          onClick={() => updateScore(category, Math.min(max, scores[category] + 1))}
          className="control-button plus"
          disabled={scores[category] >= max}
        >
          +
        </button>
      </div>
      <div className="category-score">
        {scores[category] * pointValue} pts
      </div>
    </div>
  );

  return (
    <div className="mixmatch-container">
      {/* Back Button */}
      <button 
        onClick={onBackToAnalyzer}
        className="back-button"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
      >
        ← Home
      </button>

      <div className="mixmatch-header">
        <h1>Mix & Match Calculator</h1>
        <p style={{marginTop: '-8px', color: 'var(--cream)', fontWeight: 600, fontSize: '1.1rem', textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)', background: 'rgba(0, 0, 0, 0.2)', padding: '0.5rem 1rem', borderRadius: '8px', display: 'inline-block'}}>
          Calculate your VEX IQ 2025-26 Mix & Match match scores
        </p>
      </div>

      <div className="calculator-content">
        <div className="score-sections">
          {/* Left Column - Basic Scoring */}
          <div className="scoring-column">
            <div className="score-section">
              <h2>Basic Scoring</h2>
              <div className="score-inputs">
                <ScoreInput 
                  label="Connected Pins"
                  category="connectedPins"
                  pointValue={scoringValues.connectedPins}
                  max={100}
                />
                <ScoreInput 
                  label="Connected Beams"
                  category="connectedBeams"
                  pointValue={scoringValues.connectedBeams}
                  max={30}
                />
                <ScoreInput 
                  label="Cleared Starting Pins"
                  category="clearedStartingPins"
                  pointValue={scoringValues.clearedStartingPins}
                  max={20}
                />
              </div>
            </div>

            {/* End of Match Section - moved under Basic Scoring */}
            <div className="score-section" style={{marginTop: '2rem'}}>
              <h2>End of Match</h2>
              <div className="score-inputs">
                <ScoreInput 
                  label="Robots in Contact with Scoring Objects"
                  category="endOfMatchContact"
                  pointValue={scoringValues.endOfMatchContact}
                  max={2}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Stack Bonuses */}
          <div className="score-section">
            <h2>Stack Bonuses</h2>
            <div className="score-inputs">
              <ScoreInput 
                label="2-Color Stack Bonus"
                category="twoColorStackBonus"
                pointValue={scoringValues.twoColorStackBonus}
                max={20}
              />
              <ScoreInput 
                label="3-Color Stack Bonus"
                category="threeColorStackBonus"
                pointValue={scoringValues.threeColorStackBonus}
                max={15}
              />
              <ScoreInput 
                label="Matching Goals"
                category="matchingGoals"
                pointValue={scoringValues.matchingGoals}
                max={10}
              />
              <ScoreInput 
                label="Standoff Goal"
                category="standoffGoal"
                pointValue={scoringValues.standoffGoal}
                max={5}
              />
            </div>
          </div>
        </div>

        {/* Total Score Display */}
        <div className="total-score-section">
          <div className="total-score-display">
            <h2>Total Score</h2>
            <div className="total-score-number">{totalScore}</div>
            <div className="total-score-label">Points</div>
          </div>
          
          <div className="calculator-actions">
            <button onClick={handleSaveToDataTracker} className="save-button">
              💾 Save to Data Tracker
            </button>
            <button onClick={clearAllScores} className="clear-button">
              Clear All Scores
            </button>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="score-breakdown">
          <h3>Score Breakdown</h3>
          <div className="breakdown-grid">
            <div className="breakdown-item">
              <span>Connected Pins:</span>
              <span>{scores.connectedPins} × {scoringValues.connectedPins} = {scores.connectedPins * scoringValues.connectedPins}</span>
            </div>
            <div className="breakdown-item">
              <span>Connected Beams:</span>
              <span>{scores.connectedBeams} × {scoringValues.connectedBeams} = {scores.connectedBeams * scoringValues.connectedBeams}</span>
            </div>
            <div className="breakdown-item">
              <span>2-Color Stack Bonus:</span>
              <span>{scores.twoColorStackBonus} × {scoringValues.twoColorStackBonus} = {scores.twoColorStackBonus * scoringValues.twoColorStackBonus}</span>
            </div>
            <div className="breakdown-item">
              <span>3-Color Stack Bonus:</span>
              <span>{scores.threeColorStackBonus} × {scoringValues.threeColorStackBonus} = {scores.threeColorStackBonus * scoringValues.threeColorStackBonus}</span>
            </div>
            <div className="breakdown-item">
              <span>Matching Goals:</span>
              <span>{scores.matchingGoals} × {scoringValues.matchingGoals} = {scores.matchingGoals * scoringValues.matchingGoals}</span>
            </div>
            <div className="breakdown-item">
              <span>Standoff Goal:</span>
              <span>{scores.standoffGoal} × {scoringValues.standoffGoal} = {scores.standoffGoal * scoringValues.standoffGoal}</span>
            </div>
            <div className="breakdown-item">
              <span>Cleared Starting Pins:</span>
              <span>{scores.clearedStartingPins} × {scoringValues.clearedStartingPins} = {scores.clearedStartingPins * scoringValues.clearedStartingPins}</span>
            </div>
            <div className="breakdown-item">
              <span>End of Match Contact:</span>
              <span>{scores.endOfMatchContact} × {scoringValues.endOfMatchContact} = {scores.endOfMatchContact * scoringValues.endOfMatchContact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save to Data Tracker Dialog */}
      {showSaveDialog && (
        <div className="modal-overlay" onClick={cancelSave}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>💾 Save Score to Data Tracker</h3>
              <button className="modal-close" onClick={cancelSave}>×</button>
            </div>
            <div className="modal-body">
              <p>Save your score of <strong>{totalScore} points</strong> to the monthly calendar?</p>
              
              <div className="date-selector">
                <div className="input-group">
                  <label>Month:</label>
                  <select 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="month-select"
                  >
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
                
                <div className="input-group">
                  <label>Date:</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="31" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="date-input"
                    placeholder="Day"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={cancelSave} className="cancel-button">Cancel</button>
              <button onClick={confirmSave} className="confirm-button">Save Score</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {saveSuccess && (
        <div className="success-notification">
          <div className="success-content">
            <span className="success-icon">✅</span>
            <span>Score saved to Data Tracker successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MixMatchCalculator;
