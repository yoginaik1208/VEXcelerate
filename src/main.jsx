import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import robotBg from './assets/robot-bg.jpg'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Set robot background image CSS variable if available
if (robotBg) {
  document.documentElement.style.setProperty('--robot-bg-image', `url(${robotBg})`)
}
