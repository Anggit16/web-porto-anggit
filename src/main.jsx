import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Font self-hosted (Fontsource variable): token di src/index.css mengacu ke
// "Inter Variable" & "JetBrains Mono Variable". Satu berkas per family mencakup
// SEMUA bobot (100–900), jauh lebih ringan daripada memuat tiap bobot terpisah.
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
