



import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MapView from './MapView'
import './App.css'
import Login from './Login'
import Register from './Register'

function App() {
  const [pickup, setPickup] = useState('')
  const [drop, setDrop] = useState('')
  const [distance, setDistance] = useState(0)
  const [pickupTime, setPickupTime] = useState('2026-10-16T10:00')
  const [dropTime, setDropTime] = useState('2026-10-16T12:00')
  const [cabType, setCabType] = useState('Sedan')
  const [page, setPage] = useState('login')
  const [userId, setUserId] = useState(null)

  const showLogin = page === 'login'
  const showRegister = page === 'register'

  const [pickupPosition, setPickupPosition] = useState([12.9716, 77.5946])
  const [dropPosition, setDropPosition] = useState([13.0033, 77.5700])

  const [pickupResults, setPickupResults] = useState([])
  const [dropResults, setDropResults] = useState([])
  const [pickupSelected, setPickupSelected] = useState(false)
  const [dropSelected, setDropSelected] = useState(false)

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingResult, setBookingResult] = useState(null)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [error, setError] = useState('')

  const [fare, setFare] = useState(100)
  const [paymentMethod, setPaymentMethod] = useState('Cash')

  useEffect(() => {
    if (distance > 0) {
      setFare(100 + distance * 15)
    }
  }, [distance])

  const searchLocation = async (place) => {
    if (!place.trim()) {
      setError('Please enter a location to search.')
      return []
    }

    try {
      setError('')

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          place
        )}&format=jsonv2&addressdetails=1&limit=10&countrycodes=in`
      )

      if (!response.ok) {
        throw new Error('Location search failed.')
      }

      const data = await response.json()

      if (data.length === 0) {
        setError('No matching locations found. Try another search.')
        return []
      }

      return data
    } catch (err) {
      setError(err.message || 'Unable to search locations.')
      return []
    }
  }

  const handlePickupSearch = async () => {
    setPickupResults(await searchLocation(pickup))
  }

  const handleDropSearch = async () => {
    setDropResults(await searchLocation(drop))
  }

  const selectPickup = (place) => {
    setPickup(place.display_name)
    setPickupPosition([Number(place.lat), Number(place.lon)])
    setPickupResults([])
    setPickupSelected(true)
    setError('')
  }

  const selectDrop = (place) => {
    setDrop(place.display_name)
    setDropPosition([Number(place.lat), Number(place.lon)])
    setDropResults([])
    setDropSelected(true)
    setError('')
  }

  const handleBookCab = () => {
    setError('')

    const selectedPickup = new Date(pickupTime)
    const currentTime = new Date()

    if (selectedPickup < currentTime) {
      setError('Pickup date and time cannot be in the past.')
      return
    }

    if (!pickupSelected || !dropSelected) {
      setError('Please search and select both locations from the results.')
      return
    }

    if (!pickupTime) {
      setError('Please select the pickup date and time.')
      return
    }

    if (!dropTime) {
      setError('Please select the drop date and time.')
      return
    }

    if (new Date(pickupTime).getTime() < Date.now()) {
      setError('Pickup date and time cannot be in the past.')
      return
    }

    if (new Date(dropTime) <= new Date(pickupTime)) {
      setError('Drop time must be later than pickup time.')
      return
    }

    setShowConfirmation(true)
  }

  const handleConfirmBooking = async () => {
    if (bookingLoading) return

    setBookingLoading(true)
    setError('')

    const bookingData = {
      pickup_location: pickup,
      drop_location: drop,
      pickup_datetime: pickupTime,
      drop_datetime: dropTime,
      cab_type: cabType,
      user_id: userId,
      estimated_fare: fare,
      payment_method: paymentMethod,
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()

      if (!response.ok || result.available === false) {
        setError(
          result.message || result.detail || 'Booking could not be completed.'
        )
        return
      }

      setBookingResult(result)
      setBookingConfirmed(true)
      setShowConfirmation(false)
    } catch (err) {
      console.error('Booking error:', err)
      setError('Unable to save the booking. Please check the backend.')
    } finally {
      setBookingLoading(false)
    }
  }

  const editTrip = () => {
    setShowConfirmation(false)
    setError('')
  }

  const resetBooking = () => {
    setPickup('')
    setDrop('')
    setPickupSelected(false)
    setDropSelected(false)
    setPickupResults([])
    setDropResults([])
    setCabType('Sedan')
    setBookingResult(null)
    setBookingConfirmed(false)
    setShowConfirmation(false)
    setError('')
    setDistance(0)
    setFare(100)
    setPaymentMethod('Cash')
  }

  const formatDate = (value) => {
    if (!value) return 'Not provided'

    return new Date(value).toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  // Login page
  if (showLogin) {
    return (
      <Login
        onRegister={() => setPage('register')}
        onLoginSuccess={(userId) => {
          setUserId(userId)
          setPage('home')
        }}
      />
    )
  }

  // Registration page
  if (showRegister) {
    return (
      <Register
        onLogin={() => setPage('login')}
      />
    )
  }

  // Home page / dashboard
  return (
    <main className="app-container">
      <nav className="top-navigation">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">↗</span>
          <span>
            Ride<span className="brand-accent">Easy</span>
          </span>
        </Link>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#book-cab">Book a ride</a>
          <Link to="/my-booking" state={{ userId }}>My Bookings</Link>
          <Link to="/rating-review" state={{ userId }}>
            Ratings & Reviews
          </Link>
        </div>
      </nav>

      <header className="app-header" id="home">
        <span className="hero-eyebrow">YOUR JOURNEY, YOUR WAY</span>
        <h1>Where would you like to go?</h1>
        <p>Choose your route, select your ride and travel with ease.</p>
      </header>

      {!bookingConfirmed && (
        <section className="booking-card" id="book-cab">
          <div className="section-heading">
            <div>
              <span className="step-label">01 · YOUR ROUTE</span>
              <h2>Plan your journey</h2>
              <p>Enter and select your pickup and destination.</p>
            </div>
            <span className="heading-icon">⌖</span>
          </div>

          <div className="location-grid">
            <div className="location-group">
              <label htmlFor="pickup">Pickup location</label>
              <div className="search-row">
                <input
                  id="pickup"
                  value={pickup}
                  placeholder="Where should we pick you up?"
                  onChange={(e) => {
                    setPickup(e.target.value)
                    setPickupSelected(false)
                  }}
                />
                <button
                  className="search-button"
                  type="button"
                  onClick={handlePickupSearch}
                >
                  Search
                </button>
              </div>

              {pickupResults.length > 0 && (
                <div className="results-list">
                  {pickupResults.map((place) => (
                    <button
                      type="button"
                      className="result-item"
                      key={place.place_id}
                      onClick={() => selectPickup(place)}
                    >
                      {place.display_name}
                    </button>
                  ))}
                </div>
              )}

              {pickupSelected && (
                <span className="location-selected">
                  ✓ Pickup selected
                </span>
              )}
            </div>

            <div className="location-group">
              <label htmlFor="drop">Drop location</label>
              <div className="search-row">
                <input
                  id="drop"
                  value={drop}
                  placeholder="Where are you going?"
                  onChange={(e) => {
                    setDrop(e.target.value)
                    setDropSelected(false)
                  }}
                />
                <button
                  className="search-button"
                  type="button"
                  onClick={handleDropSearch}
                >
                  Search
                </button>
              </div>

              {dropResults.length > 0 && (
                <div className="results-list">
                  {dropResults.map((place) => (
                    <button
                      type="button"
                      className="result-item"
                      key={place.place_id}
                      onClick={() => selectDrop(place)}
                    >
                      {place.display_name}
                    </button>
                  ))}
                </div>
              )}

              {dropSelected && (
                <span className="location-selected">
                  ✓ Destination selected
                </span>
              )}
            </div>
          </div>

          <div className="time-grid">
            <div className="location-group">
              <label htmlFor="pickupTime">Pickup date and time</label>
              <input
                id="pickupTime"
                type="datetime-local"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>

            <div className="location-group">
              <label htmlFor="dropTime">Drop date and time</label>
              <input
                id="dropTime"
                type="datetime-local"
                value={dropTime}
                onChange={(e) => setDropTime(e.target.value)}
              />
            </div>
          </div>

          <div className="vehicle-section">
            <div className="section-heading vehicle-heading">
              <div>
                <span className="step-label">02 · SELECT YOUR RIDE</span>
                <h2>Choose your ride</h2>
                <p>Select the vehicle that suits your journey.</p>
              </div>
            </div>

            <div className="vehicle-grid">
              {[
                {
                  type: 'Hatchback',
                  icon: '🚗',
                  description: 'Compact everyday travel',
                },
                {
                  type: 'Sedan',
                  icon: '🚘',
                  description: 'Comfortable city rides',
                },
                {
                  type: 'SUV',
                  icon: '🚙',
                  description: 'More room for your trip',
                },
              ].map((vehicle) => (
                <button
                  type="button"
                  key={vehicle.type}
                  className={`vehicle-card ${cabType === vehicle.type ? 'selected' : ''
                    }`}
                  onClick={() => setCabType(vehicle.type)}
                >
                  <span className="vehicle-icon">{vehicle.icon}</span>
                  <strong>{vehicle.type}</strong>
                  <span className="vehicle-description">
                    {vehicle.description}
                  </span>
                  <span className="vehicle-selected">
                    {cabType === vehicle.type ? '✓ Selected' : 'Select ride'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          {!showConfirmation && (
            <button
              className="primary-button book-button"
              type="button"
              onClick={handleBookCab}
            >
              Review your trip <span>→</span>
            </button>
          )}

          {showConfirmation && (
            <section className="booking-confirmation">
              <div className="confirmation-top">
                <span className="confirmation-icon">✓</span>
                <div>
                  <span className="step-label">03 · FINAL CHECK</span>
                  <h2>Review your trip</h2>
                  <p>Please verify your details before confirming.</p>
                </div>
              </div>

              <div className="trip-route-summary">
                <div className="summary-location">
                  <span className="summary-dot pickup-summary-dot" />
                  <div>
                    <span className="summary-label">PICKUP</span>
                    <strong>{pickup}</strong>
                    <span>{formatDate(pickupTime)}</span>
                  </div>
                </div>

                <div className="summary-location">
                  <span className="summary-dot drop-summary-dot" />
                  <div>
                    <span className="summary-label">DESTINATION</span>
                    <strong>{drop}</strong>
                    <span>{formatDate(dropTime)}</span>
                  </div>
                </div>
              </div>

              <div className="review-vehicle">
                <span className="review-vehicle-icon">
                  {cabType === 'SUV' ? '🚙' : cabType === 'Sedan' ? '🚘' : '🚗'}
                </span>

                <div>
                  <span className="summary-label">YOUR SELECTED RIDE</span>
                  <strong>{cabType}</strong>

                  <p>
                    <strong>Distance:</strong> {distance.toFixed(2)} km
                  </p>

                  <p>
                    <strong>Estimated Fare:</strong> ₹{fare.toFixed(2)}
                  </p>

                  <div className="payment-method">
                    <h3>Select Payment Method</h3>

                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash"
                        checked={paymentMethod === 'Cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      Cash
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={paymentMethod === 'UPI'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      UPI
                    </label>
                  </div>

                  <p>
                    <strong>Payment Status:</strong>{' '}
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                      Pending
                    </span>
                  </p>
                </div>
              </div>

              <p className="confirmation-note">
                Your booking will be submitted to check vehicle availability.
              </p>

              {error && <p className="error-message">{error}</p>}

              <div className="confirmation-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={editTrip}
                  disabled={bookingLoading}
                >
                  ← Edit trip
                </button>

                <button
                  type="button"
                  className="primary-button confirm-button"
                  onClick={handleConfirmBooking}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Confirming…' : 'Confirm booking →'}
                </button>
              </div>
            </section>
          )}
        </section>
      )}

      {bookingConfirmed && bookingResult && (
        <section className="trip-confirmed">
          <div className="success-mark">✓</div>
          <span className="success-eyebrow">BOOKING COMPLETE</span>
          <h1>Your ride is confirmed!</h1>
          <p className="success-description">
            Your booking was saved successfully. Keep your booking ID for
            reference.
          </p>

          <div className="success-booking-id">
            <span>BOOKING REFERENCE</span>
            <strong>#{bookingResult.ride_id}</strong>
          </div>

          <div className="success-details">
            <div>
              <span>SELECTED VEHICLE</span>
              <strong>{bookingResult.cab_type || cabType}</strong>
            </div>
            <div>
              <span>ASSIGNED CAB ID</span>
              <strong>{bookingResult.cab_id ?? 'Not provided'}</strong>
            </div>
            <div>
              <span>PICKUP TIME</span>
              <strong>{formatDate(pickupTime)}</strong>
            </div>
          </div>

          <div className="success-route">
            <div>
              <span className="summary-dot pickup-summary-dot" />
              <p>
                <strong>Pickup</strong>
                {pickup}
              </p>
            </div>
            <div>
              <span className="summary-dot drop-summary-dot" />
              <p>
                <strong>Destination</strong>
                {drop}
              </p>
            </div>
          </div>

          <div className="success-actions">
            <Link className="primary-button" to="/my-booking">
              View my bookings →
            </Link>
            <button
              className="secondary-button"
              type="button"
              onClick={resetBooking}
            >
              Book another ride
            </button>
          </div>
        </section>
      )}

      <section className="map-card">
        <div className="map-heading">
          <div>
            <span className="step-label">YOUR JOURNEY</span>
            <h2>Route overview</h2>
            <p>Your selected locations appear on the map.</p>
          </div>
          <span className="map-pin-icon">⌖</span>
        </div>

        <MapView
          pickupPosition={pickupPosition}
          dropPosition={dropPosition}
          pickupName={pickup}
          dropName={drop}
          onDistanceChange={setDistance}
        />
      </section>

      <footer className="app-footer">
        Made for easier journeys <span>♥</span>
      </footer>
    </main>
  )
}

export default App
