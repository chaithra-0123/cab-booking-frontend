
// import { useState } from 'react'
// import { useLocation, Link } from 'react-router-dom'
// import './RatingReview.css'

// function RatingReview() {
//     const location = useLocation()
//     const userId = location.state?.userId

//     const [rideId, setRideId] = useState('')
//     const [rating, setRating] = useState(0)
//     const [reviewText, setReviewText] = useState('')
//     const [message, setMessage] = useState('')
//     const [error, setError] = useState('')
//     const [reviews, setReviews] = useState([])

//     const loadReviews = async () => {
//         if (!rideId) {
//             setError('Enter a ride ID first.')
//             return
//         }

//         try {
//             setError('')
//             const response = await fetch(
//                 `http://127.0.0.1:8000/reviews?ride_id=${rideId}`
//             )

//             if (!response.ok) {
//                 throw new Error('Unable to load reviews.')
//             }

//             setReviews(await response.json())
//         } catch (err) {
//             setError(err.message)
//         }
//     }

//     const submitReview = async (e) => {
//         e.preventDefault()
//         setMessage('')
//         setError('')

//         if (!userId) {
//             setError('Please log in again to submit a review.')
//             return
//         }

//         if (!rideId || rating < 1 || rating > 5) {
//             setError('Enter a ride ID and select a rating.')
//             return
//         }

//         try {
//             const response = await fetch('http://127.0.0.1:8000/reviews', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     ride_id: Number(rideId),
//                     user_id: Number(userId),
//                     rating,
//                     review_text: reviewText,
//                 }),
//             })

//             const result = await response.json()

//             if (!response.ok) {
//                 throw new Error(result.detail || 'Unable to submit review.')
//             }

//             setMessage('Review submitted successfully!')
//             setReviewText('')
//             setRating(0)
//             await loadReviews()
//         } catch (err) {
//             setError(err.message)
//         }
//     }

//     return (


//             <form onSubmit={submitReview}>
//                 <label htmlFor="rideId">Ride ID</label>
//                 <input
//                     id="rideId"
//                     type="number"
//                     min="1"
//                     value={rideId}
//                     onChange={(e) => setRideId(e.target.value)}
//                     required
//                     style={{ display: 'block', width: '100%', margin: '8px 0 16px' }}
//                 />

//                 <p>How was your ride?</p>
//                 <div aria-label="Choose a rating">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                             key={star}
//                             type="button"
//                             aria-label={`${star} star${star > 1 ? 's' : ''}`}
//                             aria-pressed={rating === star}
//                             onClick={() => setRating(star)}
//                             style={{
//                                 fontSize: 30,
//                                 border: 'none',
//                                 background: 'none',
//                                 cursor: 'pointer',
//                                 color: star <= rating ? '#f5b301' : '#aaa',
//                             }}
//                         >
//                             ★
//                         </button>
//                     ))}
//                 </div>

//                 <label htmlFor="reviewText">Write your review</label>
//                 <textarea
//                     id="reviewText"
//                     value={reviewText}
//                     onChange={(e) => setReviewText(e.target.value)}
//                     placeholder="Tell us about your ride..."
//                     rows="4"
//                     style={{ display: 'block', width: '100%', margin: '8px 0 16px' }}
//                 />

//                 <button type="submit">Submit Review</button>
//                 <button type="button" onClick={loadReviews} style={{ marginLeft: 8 }}>
//                     View Reviews
//                 </button>
//             </form>

//             {message && <p role="status">{message}</p>}
//             {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

//             <h2>Customer Reviews</h2>
//             {reviews.length === 0 ? (
//                 <p>No reviews loaded yet.</p>
//             ) : (
//                 reviews.map((review) => (
//                     <article
//                         key={review.review_id}
//                         style={{ borderBottom: '1px solid #ddd', padding: '12px 0' }}
//                     >
//                         <strong>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</strong>
//                         <p>{review.review_text || 'No written comment.'}</p>
//                         <small>Ride #{review.ride_id}</small>
//                     </article>
//                 ))
//             )}

//             <p><Link to="/">Back to Home</Link></p>
//         </main>
//     )
// }

// export default RatingReview

import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import './RatingReview.css'

function RatingReview() {
    const location = useLocation()
    const userId = location.state?.userId

    const [rideId, setRideId] = useState('')
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [reviews, setReviews] = useState([])

    const loadReviews = async () => {
        if (!rideId) {
            setError('Enter a ride ID first.')
            return
        }

        try {
            setError('')

            const response = await fetch(
                `http://127.0.0.1:8000/reviews?ride_id=${rideId}`
            )

            if (!response.ok) {
                throw new Error('Unable to load reviews.')
            }

            const data = await response.json()
            setReviews(data)
        } catch (err) {
            setError(err.message)
        }
    }

    const submitReview = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')

        if (!userId) {
            setError('Please log in again to submit a review.')
            return
        }

        if (!rideId || rating < 1 || rating > 5) {
            setError('Enter a ride ID and select a rating.')
            return
        }

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/reviews',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ride_id: Number(rideId),
                        user_id: Number(userId),
                        rating: rating,
                        review_text: reviewText,
                    }),
                }
            )

            const result = await response.json()

            if (!response.ok) {
                throw new Error(
                    result.detail || 'Unable to submit review.'
                )
            }

            setMessage('Review submitted successfully!')
            setReviewText('')
            setRating(0)

            await loadReviews()
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <main className="rating-page">
            <nav className="top-navigation">
                <Link to="/" className="nav-brand">
                    <span className="brand-icon">↗</span>
                    <span>
                        Ride<span className="brand-accent">Easy</span>
                    </span>
                </Link>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link
                        to="/my-booking"
                        state={{ userId }}
                    >
                        My Bookings
                    </Link>
                </div>
            </nav>

            <header className="rating-header">
                <span className="hero-eyebrow">
                    YOUR EXPERIENCE MATTERS
                </span>
                <h1>Ratings &amp; Reviews</h1>
                <p>
                    Share your ride experience and read customer feedback.
                </p>
            </header>

            <section className="rating-card">
                <h2>Rate your ride</h2>
                <p className="rating-description">
                    Tell us how your RideEasy journey went.
                </p>

                <form
                    className="rating-form"
                    onSubmit={submitReview}
                >
                    <label htmlFor="rideId">Ride ID</label>
                    <input
                        id="rideId"
                        type="number"
                        min="1"
                        value={rideId}
                        onChange={(e) => setRideId(e.target.value)}
                        required
                    />

                    <p className="rating-question">
                        How was your ride?
                    </p>

                    <div
                        className="star-buttons"
                        role="group"
                        aria-label="Choose a rating"
                    >
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`star-button ${star <= rating ? 'selected' : ''
                                    }`}
                                aria-label={`${star} star${star > 1 ? 's' : ''
                                    }`}
                                aria-pressed={rating === star}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <label htmlFor="reviewText">
                        Write your review
                    </label>
                    <textarea
                        id="reviewText"
                        value={reviewText}
                        onChange={(e) =>
                            setReviewText(e.target.value)
                        }
                        placeholder="Tell us about your ride..."
                        rows="4"
                    />

                    <div className="rating-actions">
                        <button
                            type="submit"
                            className="rating-submit-button"
                        >
                            Submit Review
                        </button>

                        <button
                            type="button"
                            className="rating-load-button"
                            onClick={loadReviews}
                        >
                            View Reviews
                        </button>
                    </div>
                </form>

                {message && (
                    <p className="rating-message" role="status">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="rating-error" role="alert">
                        {error}
                    </p>
                )}

                <div className="customer-reviews">
                    <h2>Customer Reviews</h2>

                    {reviews.length === 0 ? (
                        <p>No reviews loaded yet.</p>
                    ) : (
                        reviews.map((review) => (
                            <article
                                key={review.review_id}
                                className="rating-review-item"
                            >
                                <strong className="rating-review-stars">
                                    {'★'.repeat(review.rating)}
                                    {'☆'.repeat(5 - review.rating)}
                                </strong>

                                <p className="rating-review-text">
                                    {review.review_text ||
                                        'No written comment.'}
                                </p>

                                <small className="rating-review-meta">
                                    Ride #{review.ride_id}
                                </small>
                            </article>
                        ))
                    )}
                </div>

                <p className="rating-back-link">
                    <Link to="/">Back to Home</Link>
                </p>
            </section>
        </main>
    )
}

export default RatingReview
