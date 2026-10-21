
import { useEffect, useMemo, useState } from 'react';
import './MyBooking.css';

function MyBooking() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [cabFilter, setCabFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [deletingId, setDeletingId] = useState(null);
  const [receiptLoadingId, setReceiptLoadingId] = useState(null);

  const userId = localStorage.getItem('user_id');

  async function fetchBookings() {
    if (!userId) {
      setError('Please log in again to view your bookings.');
      setLoading(false);
      return;
    }

    try {
      setError('');
      const response = await fetch(
        `http://127.0.0.1:8000/rides?user_id=${userId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      setRides(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Unable to load bookings. Please check the backend.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  const cabTypes = useMemo(
    () => [
      'All',
      ...new Set(rides.map(ride => ride.cab_type).filter(Boolean))
    ],
    [rides]
  );

  // Display booking numbers starting from 1 for each user.
  // The real database ride_id remains unchanged.
  const displayBookingNumbers = useMemo(() => {
    const chronologicalRides = [...rides].sort(
      (a, b) => Number(a.ride_id) - Number(b.ride_id)
    );

    return new Map(
      chronologicalRides.map((ride, index) => [
        String(ride.ride_id),
        index + 1
      ])
    );
  }, [rides]);

  const filteredRides = useMemo(() => {
    const term = search.trim().toLowerCase();

    return rides
      .filter(ride => {
        const displayNumber = String(
          displayBookingNumbers.get(String(ride.ride_id)) ?? ''
        );

        const databaseId = String(ride.ride_id ?? '').trim();

        const matchesId =
          databaseId === term || displayNumber === term;

        const matchesText = [
          ride.pickup_location,
          ride.drop_location,
          ride.cab_type,
          ride.cab_id,
        ].some(value =>
          String(value ?? '').toLowerCase().includes(term)
        );

        const matchesSearch =
          term === '' || matchesId || matchesText;

        const matchesCab =
          cabFilter === 'All' ||
          String(ride.cab_type ?? '').toLowerCase() ===
          cabFilter.toLowerCase();

        return matchesSearch && matchesCab;
      })
      .sort((a, b) =>
        sortOrder === 'newest'
          ? Number(b.ride_id) - Number(a.ride_id)
          : Number(a.ride_id) - Number(b.ride_id)
      );
  }, [rides, search, cabFilter, sortOrder, displayBookingNumbers]);

  async function handleDelete(ride) {
    const bookingNumber = displayBookingNumbers.get(
      String(ride.ride_id)
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete booking #${bookingNumber}?`
    );

    if (!confirmed) return;

    setDeletingId(ride.ride_id);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/rides/${ride.ride_id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'Booking could not be deleted. Check the backend DELETE route.'
            : 'Could not delete this booking.'
        );
      }

      setRides(current =>
        current.filter(item => item.ride_id !== ride.ride_id)
      );

      alert(`Booking #${bookingNumber} deleted successfully!`);
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.message || 'Unable to delete booking.');
    } finally {
      setDeletingId(null);
    }
  }

  async function handleDownloadReceipt(ride) {
    if (!userId) {
      alert('Please log in again.');
      return;
    }

    setReceiptLoadingId(ride.ride_id);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/rides/${ride.ride_id}/receipt?user_id=${userId}`
      );

      if (!response.ok) {
        throw new Error('Unable to download receipt.');
      }

      const pdfBlob = await response.blob();
      const pdfUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');

      link.href = pdfUrl;
      link.download = `ride_receipt_${ride.ride_id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(pdfUrl);
    } catch (err) {
      alert(err.message || 'Receipt download failed.');
    } finally {
      setReceiptLoadingId(null);
    }
  }

  return (
    <main className="my-bookings-page">
      <header className="bookings-header">
        <div>
          <p className="bookings-eyebrow">YOUR JOURNEYS</p>
          <h1>My Bookings</h1>
          <p className="bookings-subtitle">
            View and manage your cab bookings.
          </p>
        </div>

        <div className="booking-count">
          <strong>{rides.length}</strong>
          <span>Total bookings</span>
        </div>
      </header>

      <section className="booking-tools">
        <input
          type="search"
          placeholder="Search booking ID, pickup or destination..."
          aria-label="Search bookings"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />

        <select
          aria-label="Filter by cab type"
          value={cabFilter}
          onChange={event => setCabFilter(event.target.value)}
        >
          {cabTypes.map(type => (
            <option key={type} value={type}>
              {type === 'All' ? 'All cab types' : type}
            </option>
          ))}
        </select>

        <select
          aria-label="Sort bookings"
          value={sortOrder}
          onChange={event => setSortOrder(event.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </section>

      {loading ? (
        <p className="bookings-message">Loading bookings...</p>
      ) : error ? (
        <div className="bookings-message bookings-error">
          <p>{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              fetchBookings();
            }}
          >
            Try again
          </button>
        </div>
      ) : filteredRides.length === 0 ? (
        <div className="bookings-empty">
          <h2>
            {rides.length
              ? 'No matching bookings'
              : 'No bookings yet'}
          </h2>
          <p>
            {rides.length
              ? 'Try a different search or filter.'
              : 'Your saved trips will appear here.'}
          </p>
        </div>
      ) : (
        <section className="booking-list">
          {filteredRides.map(ride => (
            <article
              className="booking-item"
              key={ride.ride_id}
            >
              <div className="booking-item-header">
                <div>
                  <span className="booking-label">BOOKING ID</span>
                  <h2>
                    #{displayBookingNumbers.get(String(ride.ride_id))}
                  </h2>
                </div>

                <span className="cab-badge">
                  {ride.cab_type || 'Cab'}
                </span>
              </div>

              <div className="booking-route">
                <div className="route-point">
                  <span className="route-dot pickup-dot" />
                  <div>
                    <span className="booking-label">PICKUP</span>
                    <p>{ride.pickup_location || 'Not available'}</p>
                  </div>
                </div>

                <div className="route-point">
                  <span className="route-dot drop-dot" />
                  <div>
                    <span className="booking-label">DROP</span>
                    <p>{ride.drop_location || 'Not available'}</p>
                  </div>
                </div>
              </div>

              <div className="booking-details">
                <div>
                  <span className="booking-label">CAB ID</span>
                  <p>{ride.cab_id ?? 'Not assigned'}</p>
                </div>

                <div>
                  <span className="booking-label">PICKUP TIME</span>
                  <p>
                    {ride.pickup_datetime
                      ? new Date(ride.pickup_datetime).toLocaleString()
                      : 'Not available'}
                  </p>
                </div>

                <div>
                  <span className="booking-label">DROP TIME</span>
                  <p>
                    {ride.drop_datetime
                      ? new Date(ride.drop_datetime).toLocaleString()
                      : 'Not available'}
                  </p>
                </div>

                <div>
                  <span className="booking-label">ESTIMATED FARE</span>
                  <p>
                    {ride.estimated_fare != null
                      ? `₹${Number(ride.estimated_fare).toFixed(2)}`
                      : 'Not available'}
                  </p>
                </div>

                <div>
                  <span className="booking-label">PAYMENT METHOD</span>
                  <p>{ride.payment_method || 'Not available'}</p>
                </div>

                <div>
                  <span className="booking-label">PAYMENT STATUS</span>
                  <p style={{ color: 'red', fontWeight: 'bold' }}>
                    {ride.payment_status || 'Pending'}
                  </p>
                </div>
              </div>

              <div className="booking-actions">
                <button
                  type="button"
                  className="download-receipt-button"
                  onClick={() => handleDownloadReceipt(ride)}
                  disabled={receiptLoadingId === ride.ride_id}
                >
                  {receiptLoadingId === ride.ride_id
                    ? 'Generating receipt...'
                    : 'Download Receipt'}
                </button>
                <button
                  className="delete-booking-button"
                  onClick={() => handleDelete(ride)}
                  disabled={deletingId === ride.ride_id}
                >
                  {deletingId === ride.ride_id
                    ? 'Deleting...'
                    : 'Delete booking'}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {!loading && !error && rides.length > 0 && (
        <p className="booking-results-count">
          Showing {filteredRides.length} of {rides.length} bookings
        </p>
      )}
    </main>
  );
}

export default MyBooking;

