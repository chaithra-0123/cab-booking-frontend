
import 'leaflet/dist/leaflet.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MyBooking from './MyBooking.jsx'
import { Routes, Route } from 'react-router-dom'
import RatingReview from './RatingReview.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/rating-review" element={<RatingReview />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
