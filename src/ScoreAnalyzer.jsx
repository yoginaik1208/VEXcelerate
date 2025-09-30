import React, { useState } from 'react';
import './App.css'; // Reuse the existing styles

const ScoreAnalyzer = ({ onBackToHome }) => {
  const [mainTeam, setMainTeam] = useState('');
  const [pairedTeams, setPairedTeams] = useState(Array(10).fill(''));
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');

  const fetchTeamScores = (teamNumbers) => {
    setLoading(true);
    setWarning('');
    const results = [];

    // Sample data with a broader range of teams
    const teamsData = {
      '11111A': { 
        driver: 145, 
        auton: 72,
        teamworkScores: [85, 78, 92, 87, 95, 82, 89, 94, 80, 91],
        grade: 'Middle School'
      },
      '22222B': { 
        driver: 132, 
        auton: 89,
        teamworkScores: [76, 69, 83, 78, 86, 73, 80, 85, 71, 82],
        grade: 'Middle School'
      },
      '33333C': { 
        driver: 118, 
        auton: 93,
        teamworkScores: [66, 59, 73, 68, 76, 63, 70, 75, 61, 72],
        grade: 'Middle School'
      },
      '7755A': { 
        driver: 156, 
        auton: 78,
        teamworkScores: [95, 88, 102, 97, 105, 92, 99, 104, 90, 101],
        grade: 'Middle School'
      },
      '7755B': { 
        driver: 149, 
        auton: 83,
        teamworkScores: [87, 80, 94, 89, 97, 84, 91, 96, 82, 93],
        grade: 'Middle School'
      },
      '7755C': { 
        driver: 142, 
        auton: 76,
        teamworkScores: [78, 71, 85, 80, 88, 75, 82, 87, 73, 84],
        grade: 'Middle School'
      },
      '7755D': { 
        driver: 135, 
        auton: 81,
        teamworkScores: [69, 62, 76, 71, 79, 66, 73, 78, 64, 75],
        grade: 'Middle School'
      },
      '7755E': { 
        driver: 128, 
        auton: 74,
        teamworkScores: [60, 53, 67, 62, 70, 57, 64, 69, 55, 66],
        grade: 'Middle School'
      },
      '7755F': { 
        driver: 121, 
        auton: 69,
        teamworkScores: [51, 44, 58, 53, 61, 48, 55, 60, 46, 57],
        grade: 'Middle School'
      },
      '7755G': { 
        driver: 114, 
        auton: 86,
        teamworkScores: [42, 35, 49, 44, 52, 39, 46, 51, 37, 48],
        grade: 'Middle School'
      },
      '7755H': { 
        driver: 107, 
        auton: 91,
        teamworkScores: [33, 26, 40, 35, 43, 30, 37, 42, 28, 39],
        grade: 'Middle School'
      },
      '11111E': { 
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

  return (
    <div className="container">
      <div className="page-header">
        <button 
          onClick={onBackToHome}
          className="back-button-global"
          style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--cream)', border: 'none' }}
        >
          ← Back to Home
        </button>
        
        <h1>VEX IQ Team Score Analyzer</h1>
        <p style={{marginTop: '-8px', color: '#3b4ba0', fontWeight: 600}}>Designed for Mix & Match reviews - Works for both Elementary and Middle School teams</p>
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
};

export default ScoreAnalyzer;
