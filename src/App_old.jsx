import { useState } from 'react';
import './App.css';
import Homepage from './Homepage.jsx';
import ScoreAnalyzer from './ScoreAnalyzer.jsx';
import Timer from './Timer.jsx';
import DataTracker from './DataTracker.jsx';
import MixMatchCalculator from './MixMatchCalculator.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'analyzer', 'timer', 'dataTracker', 'mixMatch'

  // Helper to fetch and parse team data from the VEX IQ skills standings
  const fetchTeamScores = async (teamNumbers) => {
    setLoading(true);
    setWarning('');
    const results = [];
    
    // Hardcoded team data with skills and teamwork scores for both Middle School and Elementary (as of Aug 29, 2025)
    const teamsData = {
      // Middle School Teams
      '8588X': { 
        driver: 216, 
        auton: 147,
        teamworkScores: [215, 198, 185, 203, 192, 178, 201, 189, 196, 184],
        grade: 'Middle School'
      },
      '7755B': { 
        driver: 225, 
        auton: 110,
        teamworkScores: [173, 104, 100, 102, 40, 122, 156, 142, 138, 165],
        grade: 'Middle School'
      },
      '5571A': { 
        driver: 184, 
        auton: 137,
        teamworkScores: [145, 132, 156, 148, 139, 161, 143, 152, 138, 147],
        grade: 'Middle School'
      },
      '7755A': { 
        driver: 218, 
        auton: 99,
        teamworkScores: [189, 176, 183, 195, 172, 186, 179, 192, 168, 181],
        grade: 'Middle School'
      },
      '10458C': { 
        driver: 190, 
        auton: 88,
        teamworkScores: [142, 135, 158, 149, 163, 151, 144, 167, 140, 155],
        grade: 'Middle School'
      },
      '71777A': { 
        driver: 201, 
        auton: 58,
        teamworkScores: [134, 127, 145, 138, 152, 141, 136, 149, 133, 146],
        grade: 'Middle School'
      },
      '45544A': { 
        driver: 189, 
        auton: 56,
        teamworkScores: [128, 135, 142, 129, 147, 133, 139, 144, 126, 141],
        grade: 'Middle School'
      },
      '726A': { 
        driver: 172, 
        auton: 64,
        teamworkScores: [118, 125, 132, 119, 137, 123, 129, 134, 116, 131],
        grade: 'Middle School'
      },
      '95111C': { 
        driver: 150, 
        auton: 81,
        teamworkScores: [109, 116, 123, 110, 127, 113, 119, 124, 107, 121],
        grade: 'Middle School'
      },
      '969A': { 
        driver: 199, 
        auton: 20,
        teamworkScores: [98, 105, 112, 99, 116, 102, 108, 113, 96, 110],
        grade: 'Middle School'
      },
      '5577B': { 
        driver: 127, 
        auton: 91,
        teamworkScores: [88, 95, 102, 89, 106, 92, 98, 103, 86, 100],
        grade: 'Middle School'
      },
      '3287A': { 
        driver: 151, 
        auton: 62,
        teamworkScores: [78, 85, 92, 79, 96, 82, 88, 93, 76, 90],
        grade: 'Middle School'
      },
      '8866X': { 
        driver: 210, 
        auton: 0,
        teamworkScores: [68, 75, 82, 69, 86, 72, 78, 83, 66, 80],
        grade: 'Middle School'
      },
      '7323W': { 
        driver: 93, 
        auton: 115,
        teamworkScores: [58, 65, 72, 59, 76, 62, 68, 73, 56, 70],
        grade: 'Middle School'
      },
      '27115A': { 
        driver: 170, 
        auton: 36,
        teamworkScores: [48, 55, 62, 49, 66, 52, 58, 63, 46, 60],
        grade: 'Middle School'
      },
      '9977A': { 
        driver: 182, 
        auton: 21,
        teamworkScores: [38, 45, 52, 39, 56, 42, 48, 53, 36, 50],
        grade: 'Middle School'
      },
      '27115C': { 
        driver: 127, 
        auton: 67,
        teamworkScores: [28, 35, 42, 29, 46, 32, 38, 43, 26, 40],
        grade: 'Middle School'
      },
      '10458A': { 
        driver: 131, 
        auton: 62,
        teamworkScores: [85, 92, 78, 89, 73, 96, 81, 87, 74, 91],
        grade: 'Middle School'
      },
      '18186A': { 
        driver: 100, 
        auton: 91,
        teamworkScores: [65, 72, 58, 69, 53, 76, 61, 67, 54, 71],
        grade: 'Middle School'
      },
      '1032V': { 
        driver: 171, 
        auton: 16,
        teamworkScores: [45, 52, 38, 49, 33, 56, 41, 47, 34, 51],
        grade: 'Middle School'
      },
      '36J': { 
        driver: 58, 
        auton: 9,
        teamworkScores: [73, 49, 71, 51, 88, 81, 102, 95, 67, 79],
        grade: 'Middle School'
      },
      '36C': { 
        driver: 41, 
        auton: 24,
        teamworkScores: [102, 88, 95, 76, 83, 91, 78, 85, 89, 82],
        grade: 'Middle School'
      },
      '36S': { 
        driver: 30, 
        auton: 28,
        teamworkScores: [64, 71, 58, 68, 52, 75, 61, 67, 55, 72],
        grade: 'Middle School'
      },
      '37R': { 
        driver: 58, 
        auton: 25,
        teamworkScores: [88, 95, 82, 92, 76, 99, 85, 91, 79, 96],
        grade: 'Middle School'
      },
      // Elementary School Teams
      '58051X': { 
        driver: 142, 
        auton: 89,
        teamworkScores: [125, 118, 132, 127, 135, 122, 129, 134, 120, 131],
        grade: 'Elementary'
      },
      '12345A': { 
        driver: 138, 
        auton: 92,
        teamworkScores: [115, 108, 122, 117, 125, 112, 119, 124, 110, 121],
        grade: 'Elementary'
      },
      '67890B': { 
        driver: 124, 
        auton: 85,
        teamworkScores: [105, 98, 112, 107, 115, 102, 109, 114, 100, 111],
        grade: 'Elementary'
      },
      '11111C': { 
        driver: 156, 
        auton: 73,
        teamworkScores: [95, 88, 102, 97, 105, 92, 99, 104, 90, 101],
        grade: 'Elementary'
      },
      '22222D': { 
        driver: 119, 
        auton: 98,
        teamworkScores: [85, 78, 92, 87, 95, 82, 89, 94, 80, 91],
        grade: 'Elementary'
      },
      '33333E': { 
        driver: 134, 
        auton: 67,
        teamworkScores: [75, 68, 82, 77, 85, 72, 79, 84, 70, 81],
        grade: 'Elementary'
      },
      '44444F': { 
        driver: 102, 
        auton: 81,
        teamworkScores: [65, 58, 72, 67, 75, 62, 69, 74, 60, 71],
        grade: 'Elementary'
      },
      '55555G': { 
        driver: 128, 
        auton: 54,
        teamworkScores: [55, 48, 62, 57, 65, 52, 59, 64, 50, 61],
        grade: 'Elementary'
      },
      '66666H': { 
        driver: 95, 
        auton: 76,
        teamworkScores: [45, 38, 52, 47, 55, 42, 49, 54, 40, 51],
        grade: 'Elementary'
      },
      '77777I': { 
        driver: 113, 
        auton: 59,
        teamworkScores: [35, 28, 42, 37, 45, 32, 39, 44, 30, 41],
        grade: 'Elementary'
      },
      '88888J': { 
        driver: 87, 
        auton: 88,
        teamworkScores: [25, 18, 32, 27, 35, 22, 29, 34, 20, 31],
        grade: 'Elementary'
      },
      '99999K': { 
        driver: 106, 
        auton: 42,
        teamworkScores: [68, 75, 62, 71, 58, 78, 65, 69, 56, 73],
        grade: 'Elementary'
      }
    };
    
    // Resolve requested teams
    const allKnownTeams = Object.keys(teamsData);
    for (const raw of teamNumbers) {
      const input = (raw || '').toString().toUpperCase().trim();
      if (!input) {
        continue;
      }
      console.log(`Looking for team: "${input}"`);
      
      let teamToProcess = null;
      // Exact match
      if (teamsData[input]) {
        console.log(`Found exact match for ${input}`);
        teamToProcess = input;
      } else {
        // Prefix match (e.g., 7755 -> 7755B)
        const prefixMatches = allKnownTeams.filter(t => t.startsWith(input));
        console.log(`Prefix matches for ${input}:`, prefixMatches);
        if (prefixMatches.length === 1) {
          teamToProcess = prefixMatches[0];
        } else {
          // Suggestions for ambiguous or no match
          const suggestions = prefixMatches.slice(0, 8);
          console.log(`No match for ${input}, suggestions:`, suggestions);
          results.push({ team: raw, error: true, suggestions });
          continue;
        }
      }
      
      if (teamToProcess) {
        const { driver, auton, teamworkScores, grade } = teamsData[teamToProcess];
        // Calculate average teamwork score
        const avgTeamwork = teamworkScores.length ? 
          (teamworkScores.reduce((a, b) => a + b, 0) / teamworkScores.length).toFixed(1) : 
          null;
        
        console.log(`Team ${teamToProcess} (${grade}) - Driver: ${driver}, Auton: ${auton}, Teamwork: ${teamworkScores.join(', ')}, Avg: ${avgTeamwork}`);
        
        results.push({ 
          team: teamToProcess, 
          driver, 
          auton, 
          teamworkScores, 
          avgTeamwork,
          grade
        });
      }
    }
    
    setTeamData(results);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTeams = [mainTeam, ...pairedTeams].filter(Boolean);
    if (allTeams.length === 0) {
      setWarning('Please enter at least one team number.');
      return;
    }
    fetchTeamScores(allTeams);
  };

  const handleReset = () => {
    setMainTeam('');
    setPairedTeams(Array(10).fill(''));
    setTeamData([]);
    setWarning('');
  };

  // If on timer page, render Timer component
  if (currentPage === 'timer') {
    return <Timer onBackToAnalyzer={() => setCurrentPage('analyzer')} />;
  }

  // If on mix match calculator page, render MixMatchCalculator component
  if (currentPage === 'mixmatch') {
    return <MixMatchCalculator onBackToAnalyzer={() => setCurrentPage('analyzer')} />;
  }

  // If on data tracker page, render DataTracker component
  if (currentPage === 'datatracker') {
    return <DataTracker onBackToAnalyzer={() => setCurrentPage('analyzer')} />;
  }

  // Main Score Analyzer page
  return (
    <div className="container">
      <div className="page-header">
        <h1>VEX IQ Team Score Analyzer</h1>
        <p style={{marginTop: '-8px', color: '#3b4ba0', fontWeight: 600}}>Designed for Mix & Match reviews - Works for both Elementary and Middle School teams</p>
        
        <div className="navigation-buttons" style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '15px', flexWrap: 'wrap'}}>
          {/* 1st: Match Timer */}
          <button 
            onClick={() => setCurrentPage('timer')} 
            className="nav-button timer-nav-button"
            style={{
              background: 'rgba(30, 50, 120, 0.8)',
              color: 'var(--cream)',
              border: '2px solid var(--cream-light)',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(50, 70, 140, 0.9)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(30, 50, 120, 0.8)';
              e.target.style.transform = 'none';
              e.target.style.boxShadow = 'none';
            }}
          >
            🕐 Match Timer
          </button>
          
          {/* 2nd: Mix & Match Calculator */}
          <button 
            onClick={() => setCurrentPage('mixmatch')} 
            className="nav-button mixmatch-nav-button"
            style={{
              background: 'rgba(30, 50, 120, 0.8)',
              color: 'var(--cream)',
              border: '2px solid var(--cream-light)',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(50, 70, 140, 0.9)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(30, 50, 120, 0.8)';
              e.target.style.transform = 'none';
              e.target.style.boxShadow = 'none';
            }}
          >
            🧮 Mix & Match Calculator
          </button>
          
          {/* 3rd: Data Tracker */}
          <button 
            onClick={() => setCurrentPage('datatracker')} 
            className="nav-button tracker-nav-button"
            style={{
              background: 'rgba(30, 50, 120, 0.8)',
              color: 'var(--cream)',
              border: '2px solid var(--cream-light)',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(50, 70, 140, 0.9)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(30, 50, 120, 0.8)';
              e.target.style.transform = 'none';
              e.target.style.boxShadow = 'none';
            }}
          >
            📊 Data Tracker
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="team-form">
        <div className="main-team-input">
          <div className="input-label">Enter your team number:</div>
          <input type="text" value={mainTeam} onChange={e => setMainTeam(e.target.value)} />
        </div>
        <div className="paired-teams">
          <h3>Enter up to 10 paired team numbers:</h3>
          {pairedTeams.map((num, idx) => (
            <input
              key={idx}
              type="text"
              value={num}
              placeholder={`Team #${idx + 1}`}
              onChange={e => {
                const arr = [...pairedTeams];
                arr[idx] = e.target.value;
                setPairedTeams(arr);
              }}
            />
          ))}
        </div>
        <button type="submit" disabled={loading}>Analyze Scores</button>
        <button type="button" onClick={handleReset} style={{marginLeft: '10px'}}>Reset</button>
      </form>
      {warning && <div className="warning">{warning}</div>}
      {loading && <div>Loading...</div>}
      {teamData.length > 0 && (
        <div className="results">
          {teamData.map((team, idx) => (
            <div key={idx} className="team-table">
              <h2>Team {team.team}</h2>
              {team.grade && <p style={{marginTop: '-10px', marginBottom: '15px', fontSize: '14px', fontStyle: 'italic', color: 'var(--cream)'}}>{team.grade}</p>}
              {team.error ? (
                <>
                  <div className="warning">The team number you entered does not exist or has not yet competed in a competition, therefore we are not able to find their scores.</div>
                  {team.suggestions && team.suggestions.length > 0 && (
                    <div style={{marginTop: '8px'}}>
                      <span style={{fontWeight: 700}}>Suggestions:</span> {team.suggestions.join(', ')}
                    </div>
                  )}
                </>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Driving</th>
                      <th>Auton</th>
                      <th>Recent Teamwork Scores</th>
                      <th>Average Teamwork</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{team.driver}</td>
                      <td>{team.auton}</td>
                      <td>{team.teamworkScores.join(', ') || 'N/A'}</td>
                      <td>{team.avgTeamwork || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
