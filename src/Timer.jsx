import { useState, useEffect, useRef } from 'react';
import './Timer.css';

function Timer({ onBackToAnalyzer }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('ready'); // 'ready', 'countdown', 'running', 'finished'
  const [countdownValue, setCountdownValue] = useState(3);
  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Generate beep sound
  const playBeep = (frequency = 800, duration = 200, volume = 0.3) => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  // Play different sound effects
  const playStartCountdown = () => playBeep(1000, 500, 0.4);
  const playDriverSwitch = () => {
    // Double beep for driver switch
    playBeep(600, 300, 0.4);
    setTimeout(() => playBeep(600, 300, 0.4), 100);
  };
  const playFinalCountdown = () => playBeep(1200, 200, 0.5);
  const playEndBuzzer = () => playBeep(400, 1000, 0.6);

  const startTimer = async () => {
    // Resume audio context if needed
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    setPhase('countdown');
    setCountdownValue(3);
    
    // 3-2-1 countdown
    const countdownInterval = setInterval(() => {
      setCountdownValue(prev => {
        if (prev > 1) {
          playStartCountdown();
          return prev - 1;
        } else {
          clearInterval(countdownInterval);
          playStartCountdown();
          setTimeout(() => {
            setPhase('running');
            setIsRunning(true);
          }, 1000);
          return 0;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setPhase('ready');
    setTimeLeft(60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
  };

  // Main timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          
          // Driver switch sounds - VEX IQ format
          if (newTime === 35) { // 25 seconds elapsed - first driver switch
            playDriverSwitch();
          } else if (newTime === 25) { // 35 seconds elapsed - second driver switch
            playDriverSwitch();
          }
          
          // Final 10-second countdown
          if (newTime <= 10 && newTime > 0) {
            playFinalCountdown();
          }
          
          // End buzzer
          if (newTime === 0) {
            playEndBuzzer();
            setIsRunning(false);
            setPhase('finished');
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'countdown':
        return countdownValue > 0 ? countdownValue.toString() : 'GO!';
      case 'running':
        return 'MATCH IN PROGRESS';
      case 'finished':
        return 'MATCH COMPLETE';
      default:
        return 'READY TO START';
    }
  };

  const getTimeColor = () => {
    if (phase === 'finished') return '#ff4444';
    if (timeLeft <= 10 && phase === 'running') return '#ffaa00';
    return 'var(--cream)';
  };

  return (
    <div className="timer-container">
      <div className="timer-header">
        <button onClick={onBackToAnalyzer} className="back-button">
          ← Back to Score Analyzer
        </button>
        <h1>VEX IQ Match Timer</h1>
        <p style={{marginTop: '-8px', color: '#3b4ba0', fontWeight: 600}}>
          Official 1-minute match timer with driver switch alerts
        </p>
      </div>

      <div className="timer-display">
        <div className="phase-indicator">
          {phase === 'countdown' && countdownValue > 0 && (
            <div className="countdown-number">{countdownValue}</div>
          )}
          <div className="phase-text">{getPhaseText()}</div>
        </div>
        
        <div className="time-display" style={{ color: getTimeColor() }}>
          {formatTime(timeLeft)}
        </div>

        <div className="driver-switches">
          <div className={`switch-indicator ${timeLeft <= 35 && timeLeft > 25 ? 'active' : ''}`}>
            Driver Switch 1: {timeLeft > 35 ? '25s' : timeLeft > 25 ? 'ACTIVE' : 'COMPLETE'}
          </div>
          <div className={`switch-indicator ${timeLeft <= 25 && timeLeft > 0 ? 'active' : ''}`}>
            Driver Switch 2: {timeLeft > 25 ? '35s' : 'ACTIVE'}
          </div>
        </div>

        <div className="timer-controls">
          {!isRunning && phase !== 'countdown' && (
            <button 
              onClick={startTimer} 
              className="start-button"
              disabled={phase === 'finished'}
            >
              {phase === 'finished' ? 'Match Complete' : 'Start Match'}
            </button>
          )}
          
          {(isRunning || phase === 'countdown') && (
            <button onClick={stopTimer} className="stop-button">
              Stop
            </button>
          )}
          
          <button onClick={resetTimer} className="reset-button">
            Reset
          </button>
        </div>

        {phase === 'running' && (
          <div className="match-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((60 - timeLeft) / 60) * 100}%` }}
              ></div>
            </div>
            <div className="progress-milestones">
              <div className={`milestone ${timeLeft <= 25 ? 'passed' : ''}`}>35s</div>
              <div className={`milestone ${timeLeft <= 35 ? 'passed' : ''}`}>25s</div>
              <div className={`milestone ${timeLeft <= 50 ? 'passed' : ''}`}>10s</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer;
