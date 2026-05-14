import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WeddingWebsite from './WeddingWebsite.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeddingWebsite />
  </StrictMode>,
)