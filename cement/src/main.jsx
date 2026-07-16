import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { FamilyProvider } from './context/FamilyContext'
import { ThemeProvider } from './context/ThemeContext'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <ThemeProvider>
      <FamilyProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FamilyProvider>
    </ThemeProvider>
  </StrictMode>
)
