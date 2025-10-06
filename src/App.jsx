
import { useState, useEffect } from 'react';
import './App.css';
import Homepage from './Homepage.jsx';
import ScoreAnalyzer from './ScoreAnalyzer.jsx';
import Timer from './Timer.jsx';
import DataTracker from './DataTracker.jsx';
import MixMatchCalculator from './MixMatchCalculator.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Support from './Support.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';

// LoginForm component
const LoginForm = ({ mode, onLogin, onSignup, onForgotPassword, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);

  // Clear form when mode changes
  useEffect(() => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        await onLogin(formData.email, formData.password);
      } else if (mode === 'signup') {
        // Simple direct validation - no helper functions
        const name = formData.name?.trim() || '';
        const email = formData.email?.trim() || '';
        const password = formData.password || '';
        const confirmPassword = formData.confirmPassword || '';
        
        console.log('Direct password comparison:', {
          password: password,
          confirmPassword: confirmPassword,
          passwordsMatch: password === confirmPassword,
          lengthsMatch: password.length === confirmPassword.length
        });
        
        if (!name) {
          alert('Please enter your full name.');
          setLoading(false);
          return;
        }
        
        if (!email) {
          alert('Please enter your email address.');
          setLoading(false);
          return;
        }
        
        if (!password) {
          alert('Please enter a password.');
          setLoading(false);
          return;
        }
        
        if (!confirmPassword) {
          alert('Please confirm your password.');
          setLoading(false);
          return;
        }
        
        if (password !== confirmPassword) {
          alert('The passwords you entered do not match. Please try again.');
          setLoading(false);
          return;
        }
        
        if (password.length < 6) {
          alert('Password must be at least 6 characters long.');
          setLoading(false);
          return;
        }
        
        // All validation passed
        console.log('All validation passed, calling onSignup...');
        await onSignup(name, email, password);
      } else if (mode === 'forgot') {
        await onForgotPassword(formData.email);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {mode === 'signup' && (
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      )}
      
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {mode !== 'forgot' && (
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {mode === 'signup' && (
        <>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formData.password && formData.confirmPassword && (
              <div className={`password-match-indicator ${
                formData.password === formData.confirmPassword ? 'match' : 'no-match'
              }`}>
                {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </div>
            )}
          </div>
        </>
      )}

      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? '⏳' : (
          mode === 'login' ? '🚀 Sign In' :
          mode === 'signup' ? '🎯 Create Account' :
          '📧 Send Reset Link'
        )}
      </button>

      {/* Debug info for signup mode */}
      {mode === 'signup' && (
        <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '0.5rem' }}>
          Debug: Pass="{formData.password}" | Conf="{formData.confirmPassword}" | Match={formData.password === formData.confirmPassword ? 'YES' : 'NO'}
        </div>
      )}

      <div className="form-footer">
        {mode === 'login' && (
          <>
            <button type="button" onClick={() => onSwitchMode('forgot')} className="link-button">
              Forgot password?
            </button>
            <span>Don't have an account? </span>
            <button type="button" onClick={() => onSwitchMode('signup')} className="link-button">
              Sign up
            </button>
          </>
        )}
        
        {mode === 'signup' && (
          <>
            <span>Already have an account? </span>
            <button type="button" onClick={() => onSwitchMode('login')} className="link-button">
              Sign in
            </button>
          </>
        )}
        
        {mode === 'forgot' && (
          <button type="button" onClick={() => onSwitchMode('login')} className="link-button">
            Back to sign in
          </button>
        )}
      </div>
    </form>
  );
};


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMode, setLoginMode] = useState('login'); // 'login', 'signup', 'forgot'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showOwnerPanel, setShowOwnerPanel] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Restore login state on app load
  useEffect(() => {
    const savedLoginState = localStorage.getItem('vex-user-logged-in');
    const savedEmail = localStorage.getItem('vex-user-email');
    
    if (savedLoginState === 'true' && savedEmail) {
      setIsLoggedIn(true);
      setUserEmail(savedEmail);
    }
  }, []);

  // Owner functions
  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('vex-owner-users') || '[]');
  };

  const showOwnerDashboard = () => {
    const users = getAllUsers();
    console.clear();
    console.log('🏆 VEXCELERATE OWNER DASHBOARD 🏆');
    console.log('=====================================');
    console.log(`Total Registered Users: ${users.length}`);
    console.log('=====================================');
    
    if (users.length > 0) {
      console.table(users);
      console.log('\n📊 User Statistics:');
      console.log(`- Latest Registration: ${users[users.length - 1]?.name} (${users[users.length - 1]?.email})`);
      console.log(`- Registration Date: ${new Date(users[users.length - 1]?.signupDate).toLocaleString()}`);
      
      // Ask if owner wants to export data
      if (confirm(`🎯 VEXcelerate Owner Dashboard\n\nTotal Users: ${users.length}\n\nDetailed user list is in console (F12).\n\nWould you like to export user data to CSV?`)) {
        exportUsersToCSV(users);
      }
    } else {
      alert('🎯 VEXcelerate Owner Dashboard\n\nNo users registered yet.');
    }
  };

  const exportUsersToCSV = (users) => {
    const csvHeaders = ['ID', 'Name', 'Email', 'Signup Date', 'Signup Time'];
    const csvData = users.map(user => [
      user.id,
      user.name,
      user.email,
      new Date(user.signupDate).toLocaleDateString(),
      new Date(user.signupDate).toLocaleTimeString()
    ]);
    
    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `vexcelerate-users-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`📊 User data exported successfully!\nFile: vexcelerate-users-${new Date().toISOString().split('T')[0]}.csv`);
  };

  // Check for owner access (you can change this email to your own)
  const isOwner = () => {
    return userEmail === 'YOGENDERNAIK3@GMAIL.COM' || userEmail === 'yogendernaik3@gmail.com';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest('.user-dropdown-container')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  // Navigation handler that also notifies SPA listeners (for ad refreshes)
  const handleNavigation = (page) => {
    setCurrentPage(page);
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('spa:navigate', { detail: { page } }));
      }
    } catch (e) {
      // ignore in SSR or older browsers
    }
  };

  // Authentication handlers
  const handleLogin = (email, password) => {
    // Simple mock authentication - in real app, this would call your backend
    setIsLoggedIn(true);
    setUserEmail(email);
    setShowLoginModal(false);
    // Store login state in localStorage
    localStorage.setItem('vex-user-logged-in', 'true');
    localStorage.setItem('vex-user-email', email);
  };

  const handleSignup = (name, email, password) => {
    // Simple mock signup - in real app, this would call your backend
    console.log('handleSignup called with:', { name, email, password });
    
    // Owner notification system
    const newUser = {
      id: Date.now(), // Simple ID generation
      name: name,
      email: email,
      signupDate: new Date().toISOString(),
      signupTimestamp: Date.now()
    };
    
    // Store new user in owner's user database (localStorage for now)
    const existingUsers = JSON.parse(localStorage.getItem('vex-owner-users') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('vex-owner-users', JSON.stringify(existingUsers));
    
    // Owner notification - console log and alert for immediate visibility
    console.log('🚨 NEW USER REGISTRATION ALERT! 🚨', {
      userName: name,
      userEmail: email,
      registrationTime: new Date().toLocaleString(),
      totalUsers: existingUsers.length
    });
    
    // Simulate email notification to owner (in real app, this would be a backend call)
    const ownerNotification = {
      to: 'yogendernaik3@gmail.com', // Your email
      subject: `🚀 New VEXcelerate User Registration - ${name}`,
      body: `
        NEW USER REGISTERED ON VEXCELERATE!
        
        👤 Name: ${name}
        📧 Email: ${email}
        📅 Date: ${new Date().toLocaleString()}
        👥 Total Users: ${existingUsers.length}
        
        Login to your dashboard to view full details.
      `
    };
    
    console.log('📧 EMAIL NOTIFICATION SENT TO OWNER:', ownerNotification);
    
    // Store notification for later viewing
    const notifications = JSON.parse(localStorage.getItem('vex-owner-notifications') || '[]');
    notifications.push({
      id: Date.now(),
      type: 'new_user',
      user: newUser,
      timestamp: Date.now(),
      read: false
    });
    localStorage.setItem('vex-owner-notifications', JSON.stringify(notifications));
    
    // Optional: Show owner notification (you can comment this out if too intrusive)
    if (confirm(`📧 NEW USER REGISTERED!\n\nName: ${name}\nEmail: ${email}\nTime: ${new Date().toLocaleString()}\n\nTotal Users: ${existingUsers.length}\n\nClick OK to continue, Cancel to view user list`)) {
      // Continue with normal flow
    } else {
      // Show user list
      console.table(existingUsers);
      alert('User list has been logged to console. Press F12 to view developer tools.');
    }
    
    setIsLoggedIn(true);
    setUserEmail(email);
    setShowLoginModal(false);
    setLoginMode('login'); // Reset to login mode for next time
    
    // Store user data in localStorage
    localStorage.setItem('vex-user-logged-in', 'true');
    localStorage.setItem('vex-user-email', email);
    localStorage.setItem('vex-user-name', name);
    
    // Show success message to user
    alert(`Welcome to VEXcelerate, ${name}! Your account has been created successfully.`);
  };

  const handleForgotPassword = (email) => {
    // Mock forgot password - in real app, this would send a reset email
    alert(`Password reset link sent to ${email}!`);
    setLoginMode('login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setShowUserDropdown(false);
    localStorage.removeItem('vex-user-logged-in');
    localStorage.removeItem('vex-user-email');
    localStorage.removeItem('vex-user-name');
  };

  // Check for existing login on app load
  useState(() => {
    const savedLogin = localStorage.getItem('vex-user-logged-in');
    const savedEmail = localStorage.getItem('vex-user-email');
    if (savedLogin === 'true' && savedEmail) {
      setIsLoggedIn(true);
      setUserEmail(savedEmail);
    }
  }, []);

  // Top navigation bar
  const navTabs = [
    { id: 'home', label: '🏠 Home' },
    { id: 'about', label: '🤖 About' },
    { id: 'support', label: '🛟 Support' },
    { id: 'privacy', label: '🔒 Privacy' }
  ];

  return (
    <div className="app-main-container">
      <nav className="app-navbar animated-navbar">
        <div className="nav-tabs nav-tabs-centered">
          {navTabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab${currentPage === tab.id ? ' active' : ''}`}
              onClick={() => handleNavigation(tab.id)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* Login/User Section */}
        <div className="user-section">
          {isLoggedIn ? (
            <div className="user-dropdown-container">
              <button 
                className="user-profile-button"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div className="profile-avatar">
                  {(localStorage.getItem('vex-user-name') || userEmail).charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{localStorage.getItem('vex-user-name') || 'User'}</span>
                <span className="dropdown-arrow">{showUserDropdown ? '▲' : '▼'}</span>
              </button>
              
              {showUserDropdown && (
                <div className="user-dropdown-menu">
                  <div className="dropdown-header">
                    <div className="profile-avatar-large">
                      {(localStorage.getItem('vex-user-name') || userEmail).charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <h3>{localStorage.getItem('vex-user-name') || 'User'}</h3>
                      <p>{userEmail}</p>
                    </div>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-section">
                    <div className="section-title">VEXcelerate Features</div>
                    <button className="dropdown-item feature-item" onClick={() => {
                      setShowUserDropdown(false);
                      handleNavigation('analyzer');
                    }}>
                      <span className="item-icon">📊</span>
                      <span>Score Analyzer</span>
                      <span className="feature-badge">Core</span>
                    </button>
                    
                    <button className="dropdown-item feature-item" onClick={() => {
                      setShowUserDropdown(false);
                      handleNavigation('mixmatch');
                    }}>
                      <span className="item-icon">🎯</span>
                      <span>Mix & Match Calculator</span>
                      <span className="feature-badge">Core</span>
                    </button>
                    
                    <button className="dropdown-item feature-item" onClick={() => {
                      setShowUserDropdown(false);
                      handleNavigation('datatracker');
                    }}>
                      <span className="item-icon">📈</span>
                      <span>Data Tracker</span>
                      <span className="feature-badge">Core</span>
                    </button>
                    
                    <button className="dropdown-item feature-item" onClick={() => {
                      setShowUserDropdown(false);
                      handleNavigation('timer');
                    }}>
                      <span className="item-icon">⏱️</span>
                      <span>Timer</span>
                      <span className="feature-badge">Core</span>
                    </button>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-section">
                    <button className="dropdown-item" onClick={() => alert('Profile feature coming soon!')}>
                      <span className="item-icon">👤</span>
                      <span>My Account / Profile</span>
                    </button>
                    
                    <button className="dropdown-item" onClick={() => alert('Settings feature coming soon!')}>
                      <span className="item-icon">⚙️</span>
                      <span>Settings</span>
                    </button>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-section">
                    <div className="section-title">Help & Support</div>
                    <button className="dropdown-item" onClick={() => {
                      setShowUserDropdown(false);
                      handleNavigation('contact');
                    }}>
                      <span className="item-icon">📬</span>
                      <span>Contact</span>
                    </button>
                    
                    <button className="dropdown-item" onClick={() => {
                      setShowUserDropdown(false);
                      handleNavigation('support');
                    }}>
                      <span className="item-icon">🛟</span>
                      <span>Help / Support</span>
                    </button>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-section">
                    <button className="dropdown-item" onClick={() => alert('Language settings coming soon!')}>
                      <span className="item-icon">🌐</span>
                      <span>Language / Region</span>
                    </button>
                  </div>
                  
                  {isOwner() && (
                    <>
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-section">
                        <button className="dropdown-item owner-item" onClick={() => {
                          setShowUserDropdown(false);
                          showOwnerDashboard();
                        }}>
                          <span className="item-icon">👑</span>
                          <span>Owner Dashboard</span>
                        </button>
                      </div>
                    </>
                  )}
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-section">
                    <button className="dropdown-item logout-item" onClick={() => {
                      setShowUserDropdown(false);
                      handleLogout();
                    }}>
                      <span className="item-icon">🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="login-button"
              onClick={() => {
                setLoginMode('login');
                setShowLoginModal(true);
              }}
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </nav>

      <div className="app-content app-content-padded">
  {currentPage === 'home' && <Homepage onNavigate={handleNavigation} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'support' && <Support />}
  {currentPage === 'privacy' && <PrivacyPolicy />}

        {/* Feature pages (launched from homepage) - not shown in top-nav per request */}
  {currentPage === 'mixmatch' && <MixMatchCalculator onBackToAnalyzer={() => handleNavigation('home')} />}
  {currentPage === 'datatracker' && <DataTracker onBackToAnalyzer={() => handleNavigation('home')} />}
  {currentPage === 'analyzer' && <ScoreAnalyzer onBackToHome={() => handleNavigation('home')} />}

  {currentPage === 'timer' && <div className="timer-content-wrapper"><Timer onBackToAnalyzer={() => handleNavigation('home')} /></div>}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowLoginModal(false)}
            >
              ×
            </button>
            
            <div className="modal-header">
              <h2>
                {loginMode === 'login' && '🏆 Welcome Back!'}
                {loginMode === 'signup' && '🚀 Join VEXcelerate!'}
                {loginMode === 'forgot' && '🔑 Reset Password'}
              </h2>
              <p>
                {loginMode === 'login' && 'Sign in to save your progress and sync across devices'}
                {loginMode === 'signup' && 'Create your account to unlock all features'}
                {loginMode === 'forgot' && 'Enter your email to receive a password reset link'}
              </p>
            </div>

            <LoginForm 
              mode={loginMode}
              onLogin={handleLogin}
              onSignup={handleSignup}
              onForgotPassword={handleForgotPassword}
              onSwitchMode={setLoginMode}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
