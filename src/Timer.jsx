import { useState, useEffect, useRef, useCallback } from 'react';
import './Timer.css';

function Timer({ onBackToAnalyzer }) {
  const audioRef = useRef(null);
  const audioRef2 = useRef(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [phase, setPhase] = useState('ready');
  const [countdownValue, setCountdownValue] = useState(0);
  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);
  
  // Track previous time to detect when we cross audio trigger points
  const prevTimeRef = useRef(60);
  const countdownAudioStartedRef = useRef(false);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

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

  const playDriverSwitch = () => {
    playBeep(600, 300, 0.4);
    setTimeout(() => playBeep(600, 300, 0.4), 100);
  };

  const playEndBuzzer = () => playBeep(400, 1000, 0.6);

  const speakRemotesDown = () => {
    if ('speechSynthesis' in window) {
      const speakRemotesDownOnce = () => {
        const utterance = new SpeechSynthesisUtterance('Remotes down');
        const voices = speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          (voice.name.includes('Male') || voice.name.includes('David') || voice.name.includes('Daniel'))
        ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
        utterance.volume = 1.0;
        utterance.rate = 0.8;
        utterance.pitch = 0.7;
        return utterance;
      };

      // Say "remotes down" first time
      const firstUtterance = speakRemotesDownOnce();
      speechSynthesis.speak(firstUtterance);
      
      // Say "remotes down" second time after a short delay
      firstUtterance.onend = () => {
        setTimeout(() => {
          const secondUtterance = speakRemotesDownOnce();
          speechSynthesis.speak(secondUtterance);
        }, 500); // 500ms delay between announcements
      };
    }
  };

  // Function to start countdown audio
  const startCountdownAudio = () => {
    if (audioRef2.current && !countdownAudioStartedRef.current) {
      console.log('Starting 10-second countdown audio');
      countdownAudioStartedRef.current = true;
      audioRef2.current.currentTime = 0;
      try {
        audioRef2.current.play();
      } catch (error) {
        console.log('Countdown audio play failed:', error);
        countdownAudioStartedRef.current = false;
      }
    }
  };

  // Function to stop countdown audio
  const stopCountdownAudio = () => {
    if (audioRef2.current && countdownAudioStartedRef.current) {
      console.log('Stopping countdown audio');
      audioRef2.current.pause();
      audioRef2.current.currentTime = 0;
      countdownAudioStartedRef.current = false;
    }
  };

  // Function to pause countdown audio
  const pauseCountdownAudio = () => {
    if (audioRef2.current && countdownAudioStartedRef.current) {
      console.log('Pausing countdown audio');
      audioRef2.current.pause();
    }
  };

  // Function to resume countdown audio
  const resumeCountdownAudio = () => {
    if (audioRef2.current && countdownAudioStartedRef.current) {
      console.log('Resuming countdown audio');
      try {
        audioRef2.current.play();
      } catch (error) {
        console.log('Countdown audio resume failed:', error);
      }
    }
  };

  // Function to handle time changes and trigger audio
  const handleTimeChange = useCallback((newTime, wasScrubbedTo = false) => {
    const prevTime = prevTimeRef.current;
    
    console.log(`Time changed: ${prevTime} -> ${newTime}, scrubbed: ${wasScrubbedTo}`);
    
    // Handle driver switch beeps (only when naturally counting down, not scrubbing)
    if (!wasScrubbedTo && prevTime > newTime) {
      if (newTime === 35) playDriverSwitch();
      else if (newTime === 25) playDriverSwitch();
    }
    
    // Handle 11-second countdown audio (starts 1 second early)
    if (newTime <= 11 && newTime > 0) {
      // If we're at 11 seconds or less and countdown hasn't started, start it
      if (!countdownAudioStartedRef.current) {
        startCountdownAudio();
      }
    } else {
      // If we're above 11 seconds, stop countdown audio
      stopCountdownAudio();
    }
    
    // Handle end of match
    if (newTime === 0) {
      playEndBuzzer();
      speakRemotesDown();
      setIsRunning(false);
      setPhase('finished');
      stopCountdownAudio();
    }
    
    prevTimeRef.current = newTime;
  }, []);

  const startTimer = async () => {
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    setPhase('countdown');
    setCountdownValue(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      
      // Define the audio end handler
      const handleAudioEnd = () => {
        console.log('Trumpet audio ended - starting timer immediately');
        // Use requestAnimationFrame for immediate execution
        requestAnimationFrame(() => {
          setPhase('running');
          setIsRunning(true);
          setIsPaused(false);
          setTimeLeft(60);
          prevTimeRef.current = 60;
          // Trigger immediate countdown to eliminate delay
          setTimeout(() => {
            setTimeLeft(59);
            handleTimeChange(59, false);
          }, 0);
        });
        audioRef.current.removeEventListener('ended', handleAudioEnd);
      };
      
      // Remove any existing event listeners and add new one
      audioRef.current.onended = null;
      audioRef.current.addEventListener('ended', handleAudioEnd);
      
      try {
        await audioRef.current.play();
      } catch (error) {
        console.log('Audio play failed:', error);
        // Fallback: start immediately if audio fails
        requestAnimationFrame(() => {
          setPhase('running');
          setIsRunning(true);
          setIsPaused(false);
          setTimeLeft(60);
          prevTimeRef.current = 60;
          // Trigger immediate countdown to eliminate delay
          setTimeout(() => {
            setTimeLeft(59);
            handleTimeChange(59, false);
          }, 0);
        });
      }
    } else {
      // No audio element: start immediately
      requestAnimationFrame(() => {
        setPhase('running');
        setIsRunning(true);
        setIsPaused(false);
        setTimeLeft(60);
        prevTimeRef.current = 60;
        // Trigger immediate countdown to eliminate delay
        setTimeout(() => {
          setTimeLeft(59);
          handleTimeChange(59, false);
        }, 0);
      });
    }
  };

  const pauseTimer = () => {
    if (!isPaused) {
      // Pausing the timer
      setIsPaused(true);
      pauseCountdownAudio();
    } else {
      // Resuming the timer
      setIsPaused(false);
      // Resume countdown audio if we're in the countdown phase (≤ 11 seconds)
      if (timeLeft <= 11 && timeLeft > 0 && countdownAudioStartedRef.current) {
        resumeCountdownAudio();
      }
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setPhase('ready');
    setTimeLeft(60);
    prevTimeRef.current = 60;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    stopCountdownAudio();
  };

  const resetTimer = () => {
    stopTimer();
  };

  // Main timer countdown effect
  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      // Start countdown immediately when timer becomes active
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Timer is about to reach 0
            return 0;
          }
          const newTime = prev - 1;
          handleTimeChange(newTime, false); // Natural countdown, not scrubbed
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
  }, [isRunning, isPaused]); // Remove timeLeft from dependencies to prevent constant re-setup

  // Watch for direct timeLeft changes and trigger audio logic
  useEffect(() => {
    // Only trigger if we're paused
    if (isPaused) {
      handleTimeChange(timeLeft, true);
    }
  }, [timeLeft, isPaused, handleTimeChange]);

  // Stop countdown audio when timer reaches 0 or goes above 11 seconds
  useEffect(() => {
    if ((timeLeft === 0 || timeLeft > 11) && countdownAudioStartedRef.current) {
      stopCountdownAudio();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseText = () => {
    if (isPaused) return 'PAUSED';
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
    if (timeLeft <= 11 && phase === 'running') return '#ffaa00';
    return 'white';
  };

  return (
      <div 
      className="timer-container"
      style={{
        position: 'fixed',
        left: '40px',
        top: '140px',
        zIndex: 1000,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        userSelect: 'none',
        minWidth: '450px'
      }}
    >
      {/* Header */}
      <div 
        className="timer-header" 
        style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px 15px 0 0',
          position: 'relative'
        }}
      >
  <button onClick={onBackToAnalyzer} className="back-button">← Back to Home</button>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h1 style={{ 
            color: 'white', 
            margin: '0 0 8px 0', 
            fontSize: '2rem',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            VEX IQ Match Timer
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)', 
            margin: '0',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Official 1-minute match timer with driver switch alerts
          </p>
        </div>
        
        <audio ref={audioRef} preload="auto">
          <source src="/vex music.mp4" type="audio/mp4" />
          <source src="/vex music.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={audioRef2} preload="auto">
          <source src="/vex music 2.mp4" type="audio/mp4" />
          <source src="/vex music 2.mp3" type="audio/mpeg" />
        </audio>
      </div>

      {/* Time Display */}
        <div 
          className="time-display" 
          style={{ 
            fontSize: '4rem', 
            fontWeight: '900',
            textAlign: 'center',
            margin: '20px 0',
            color: getTimeColor(),
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            fontFamily: 'monospace',
            userSelect: 'none'
          }}
        >
          {formatTime(timeLeft)}
          {timeLeft <= 11 && timeLeft > 0 && countdownAudioStartedRef.current && (
            <div style={{
              fontSize: '1rem',
              color: '#ffaa00',
              marginTop: '5px',
              fontWeight: '600',
              animation: 'pulse 1s infinite'
            }}>
              �� COUNTDOWN AUDIO PLAYING
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="match-progress" style={{ margin: '25px 0' }}>
          <div 
            className="progress-bar" 
            style={{
              width: '100%',
              height: '20px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '15px',
              border: '2px solid rgba(255,255,255,0.3)',
              position: 'relative'
            }}
          >
            <div 
              className="progress-fill" 
              style={{ 
                background: timeLeft <= 11 && timeLeft > 0 ?
                  'linear-gradient(90deg, #ff6b6b, #ff8e53)' :
                  'linear-gradient(90deg, #4CAF50, #8BC34A)',
                transition: 'width 1s ease',
                borderRadius: '8px'
              }}
            ></div>
            
            {/* Draggable Handle */}
            <div style={{
              position: 'absolute',
              left: `${((60 - timeLeft) / 60) * 100}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '24px',
              height: '24px',
              background: timeLeft <= 11 && timeLeft > 0 ? '#ff6b6b' : 'white',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              border: '3px solid rgba(255,255,255,0.8)',
              transition: 'all 0.2s ease'
            }}></div>
          </div>
          
          {/* Milestone markers */}
          <div className="progress-milestones" style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.8)',
            position: 'relative'
          }}>
            <div className={`milestone ${timeLeft <= 25 ? 'passed' : ''}`} 
                 style={{ position: 'absolute', left: '58.3%' }}>35s</div>
            <div className={`milestone ${timeLeft <= 35 ? 'passed' : ''}`} 
                 style={{ position: 'absolute', left: '41.7%' }}>25s</div>
            <div className={`milestone ${timeLeft <= 50 ? 'passed' : ''}`} 
                 style={{ position: 'absolute', left: '16.7%' }}>10s</div>
            <div style={{ position: 'absolute', left: '0%' }}>60s</div>
            <div style={{ position: 'absolute', right: '0%' }}>0s</div>
          </div>
        </div>
        
        {/* Driver switches */}
        <div className="driver-switches" style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '25px',
          justifyContent: 'center'
        }}>
          <div className={`switch-indicator ${timeLeft <= 35 && timeLeft > 25 ? 'active' : ''}`} style={{
            background: timeLeft <= 35 && timeLeft > 25 ? 
              'linear-gradient(135deg, #ff6b6b, #ee5a24)' : 
              'rgba(255,255,255,0.1)',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9rem',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            Driver Switch 1: {timeLeft > 35 ? '25s' : timeLeft > 25 ? 'ACTIVE' : 'COMPLETE'}
          </div>
          <div className={`switch-indicator ${timeLeft <= 25 && timeLeft > 0 ? 'active' : ''}`} style={{
            background: timeLeft <= 25 && timeLeft > 0 ? 
              'linear-gradient(135deg, #ff6b6b, #ee5a24)' : 
              'rgba(255,255,255,0.1)',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9rem',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            Driver Switch 2: {timeLeft > 25 ? '35s' : 'ACTIVE'}
          </div>
        </div>
        
        {/* Controls */}
        <div className="timer-controls" style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {!isRunning && phase !== 'countdown' && (
            <button 
              onClick={startTimer} 
              disabled={phase === 'finished'}
              style={{
                background: phase === 'finished' ? 
                  'linear-gradient(135deg, #95a5a6, #7f8c8d)' :
                  'linear-gradient(135deg, #4CAF50, #45a049)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: phase === 'finished' ? 'not-allowed' : 'pointer',
                minWidth: '140px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              {phase === 'finished' ? 'Match Complete' : 'Start Match'}
            </button>
          )}
          {isRunning && (
            <button 
              onClick={pauseTimer} 
              style={{
                background: 'linear-gradient(135deg, #FF9800, #F57F17)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                minWidth: '140px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
          )}
          {(isRunning || phase === 'countdown') && (
            <button 
              onClick={stopTimer} 
              style={{
                background: 'linear-gradient(135deg, #f44336, #d32f2f)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                minWidth: '140px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              ⏹ Stop
            </button>
          )}
          <button 
            onClick={resetTimer} 
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              minWidth: '140px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            🔄 Reset
          </button>
        </div>
      </div>
  );
}

export default Timer;
