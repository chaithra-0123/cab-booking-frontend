
// import { useState, useEffect } from 'react'
// import './Auth.css'
// function Login({ onRegister, onLoginSuccess }) {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [message, setMessage] = useState('')
//     const [step, setStep] = useState('login')
//     const [otp, setOtp] = useState('')
//     const [timeLeft, setTimeLeft] = useState(300)
//     const [newPassword, setNewPassword] = useState('')
//     const [confirmPassword, setConfirmPassword] = useState('')
//     const [resetToken, setResetToken] = useState('')

//     useEffect(() => {
//         if (step !== 'otp' || timeLeft <= 0) return

//         const timer = setInterval(() => {
//             setTimeLeft((time) => time - 1)
//         }, 1000)

//         return () => clearInterval(timer)
//     }, [step, timeLeft])

//     const handleForgotPassword = async () => {
//         if (!email) {
//             setMessage('Please enter your email address first.')
//             return
//         }

//         setMessage('')

//         try {
//             const response = await fetch(
//                 'http://127.0.0.1:8000/forgot-password',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ email })
//                 }
//             )

//             const data = await response.json()

//             if (!response.ok) {
//                 setMessage(data.detail || 'Unable to send OTP.')
//                 return
//             }

//             setMessage('OTP request completed. Check your email if registered.')
//             setOtp('')
//             setTimeLeft(300)
//             setStep('otp')
//         } catch {
//             setMessage('Cannot connect to the server.')
//         }
//     }

//     const handleVerifyOTP = async () => {
//         if (!otp) {
//             setMessage('Please enter the OTP.')
//             return
//         }

//         if (timeLeft <= 0) {
//             setMessage('OTP expired. Please request a new OTP.')
//             return
//         }

//         setMessage('')

//         try {
//             const response = await fetch(
//                 'http://127.0.0.1:8000/verify-otp',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ email, otp })
//                 }
//             )

//             const data = await response.json()

//             if (!response.ok) {
//                 setMessage(data.detail || 'OTP verification failed.')
//                 return
//             }

//             setResetToken(data.reset_token)
//             setMessage('OTP verified successfully.')
//             setStep('reset')
//         } catch {
//             setMessage('Cannot connect to the server.')
//         }
//     }

//     const handleLogin = async (e) => {
//         e.preventDefault()
//         setMessage('')

//         try {
//             const response = await fetch(
//                 'http://127.0.0.1:8000/login',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ email, password })
//                 }
//             )

//             const data = await response.json()

//             if (!response.ok) {
//                 setMessage(data.detail || 'Login failed.')
//                 return
//             }

//             setMessage('Login successful!')
//             console.log('Login response:', data)
//             onLoginSuccess(data.user_id)
//         } catch {
//             setMessage('Cannot connect to the server.')
//         }
//     }


//     const handleResetPassword = async () => {
//         if (!newPassword || !confirmPassword) {
//             setMessage('Please fill in both password fields.')
//             return
//         }

//         if (newPassword !== confirmPassword) {
//             setMessage('Passwords do not match.')
//             return
//         }

//         if (!resetToken) {
//             setMessage('Reset token missing. Please verify your OTP again.')
//             return
//         }

//         setMessage('')

//         try {
//             const response = await fetch(
//                 'http://127.0.0.1:8000/reset-password',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         email,
//                         reset_token: resetToken,
//                         new_password: newPassword
//                     })
//                 }
//             )

//             const data = await response.json()

//             if (!response.ok) {
//                 setMessage(data.detail || 'Password reset failed.')
//                 return
//             }

//             setMessage('Password reset successfully! Please log in.')
//             setPassword('')
//             setNewPassword('')
//             setConfirmPassword('')
//             setOtp('')
//             setResetToken('')
//             setStep('login')
//         } catch (error) {
//             console.error('Login connection error:', error)
//             setMessage('Cannot connect to the server. Check the backend.')
//         }
//     }


//     return (
//         <div className="auth-page">
//             <div className="auth-card">
//                 <div className="auth-brand">
//                     <span className="auth-brand-icon">R</span>
//                     <span>
//                         Ride<span className="auth-brand-accent">Easy</span>
//                     </span>
//                 </div>

//                 <h1>Login to RideEasy</h1>

//                 <p className="auth-subtitle">
//                     Sign in to continue your journey.
//                 </p>

//                 <form className="auth-form" onSubmit={handleLogin}>
//                     <div className="auth-field">
//                         <label htmlFor="login-email">Email address</label>
//                         <input
//                             id="login-email"
//                             type="email"
//                             placeholder="Enter email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     {step === 'login' && (
//                         <>
//                             <div className="auth-field">
//                                 <label htmlFor="login-password">Password</label>
//                                 <input
//                                     id="login-password"
//                                     type="password"
//                                     placeholder="Enter password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </div>

//                             <button
//                                 type="button"
//                                 className="auth-link"
//                                 onClick={handleForgotPassword}
//                             >
//                                 Forgot Password?
//                             </button>

//                             <button className="auth-submit" type="submit">
//                                 Login
//                             </button>
//                         </>
//                     )}

//                     {step === 'otp' && (
//                         <div className="auth-field">
//                             <label htmlFor="otp">Enter OTP</label>
//                             <input
//                                 id="otp"
//                                 type="text"
//                                 inputMode="numeric"
//                                 maxLength={6}
//                                 placeholder="Enter 6-digit OTP"
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                             />

//                             <p>
//                                 Time remaining: {Math.floor(timeLeft / 60)}:
//                                 {String(timeLeft % 60).padStart(2, '0')}
//                             </p>

//                             <button
//                                 type="button"
//                                 className="auth-submit"
//                                 onClick={handleVerifyOTP}
//                             >
//                                 Verify OTP
//                             </button>

//                             {timeLeft <= 0 && (
//                                 <button
//                                     type="button"
//                                     className="auth-link"
//                                     onClick={handleForgotPassword}
//                                 >
//                                     Send OTP Again
//                                 </button>
//                             )}
//                         </div>
//                     )}

//                     {step === 'reset' && (
//                         <div className="auth-field">
//                             <label htmlFor="new-password">New Password</label>
//                             <input
//                                 id="new-password"
//                                 type="password"
//                                 placeholder="Enter new password"
//                                 value={newPassword}
//                                 onChange={(e) => setNewPassword(e.target.value)}
//                             />

//                             <label htmlFor="confirm-password">
//                                 Confirm Password
//                             </label>
//                             <input
//                                 id="confirm-password"
//                                 type="password"
//                                 placeholder="Confirm new password"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />

//                             <button
//                                 type="button"
//                                 className="auth-submit"
//                                 onClick={handleResetPassword}
//                             >
//                                 Reset Password
//                             </button>
//                         </div>
//                     )}

//                     {message && <p role="status">{message}</p>}
//                 </form>

//                 {step === 'login' && (
//                     <p className="auth-switch">
//                         Don't have an account?{' '}
//                         <button
//                             className="auth-link"
//                             type="button"
//                             onClick={onRegister}
//                         >
//                             Register
//                         </button>
//                     </p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Login


import { useState, useEffect } from 'react'
import './Auth.css'

function Login({ onRegister, onLoginSuccess }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [step, setStep] = useState('login')
    const [otp, setOtp] = useState('')
    const [timeLeft, setTimeLeft] = useState(300)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [resetToken, setResetToken] = useState('')

    useEffect(() => {
        if (step !== 'otp' || timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft((time) => time - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [step, timeLeft])

    const handleForgotPassword = async () => {
        if (!email) {
            setMessage('Please enter your email address first.')
            return
        }

        setMessage('')

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/forgot-password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                setMessage(data.detail || 'Unable to send OTP.')
                return
            }

            setMessage(
                'OTP request completed. Check your email if registered.'
            )
            setOtp('')
            setTimeLeft(300)
            setStep('otp')
        } catch (error) {
            console.error('Forgot password error:', error)
            setMessage('Cannot connect to the server.')
        }
    }

    const handleVerifyOTP = async () => {
        if (!otp) {
            setMessage('Please enter the OTP.')
            return
        }

        if (timeLeft <= 0) {
            setMessage('OTP expired. Please request a new OTP.')
            return
        }

        setMessage('')

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/verify-otp',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, otp })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                setMessage(data.detail || 'OTP verification failed.')
                return
            }

            setResetToken(data.reset_token)
            setMessage('OTP verified successfully.')
            setStep('reset')
        } catch (error) {
            console.error('OTP verification error:', error)
            setMessage('Cannot connect to the server.')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setMessage('')

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                setMessage(data.detail || 'Login failed.')
                return
            }

            if (data.user_id == null) {
                setMessage('Login response is missing the user ID.')
                console.error('Login response missing user_id:', data)
                return
            }

            console.log('Login successful:', data)
            localStorage.setItem('user_id', data.user_id)
            onLoginSuccess(data.user_id)
        } catch (error) {
            console.error('Login error:', error)
            setMessage('Login request failed. Check the browser console.')
        }
    }

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            setMessage('Please fill in both password fields.')
            return
        }

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.')
            return
        }

        if (!resetToken) {
            setMessage('Reset token missing. Please verify your OTP again.')
            return
        }

        setMessage('')

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/reset-password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        reset_token: resetToken,
                        new_password: newPassword
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                setMessage(data.detail || 'Password reset failed.')
                return
            }

            setMessage('Password reset successfully! Please log in.')
            setPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setOtp('')
            setResetToken('')
            setStep('login')
        } catch (error) {
            console.error('Password reset error:', error)
            setMessage('Cannot connect to the server.')
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <span className="auth-brand-icon">R</span>
                    <span>
                        Ride<span className="auth-brand-accent">Easy</span>
                    </span>
                </div>

                <h1>Login to RideEasy</h1>

                <p className="auth-subtitle">
                    Sign in to continue your journey.
                </p>

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="auth-field">
                        <label htmlFor="login-email">Email address</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {step === 'login' && (
                        <>
                            <div className="auth-field">
                                <label htmlFor="login-password">Password</label>
                                <input
                                    id="login-password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="button"
                                className="auth-link"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </button>

                            <button className="auth-submit" type="submit">
                                Login
                            </button>
                        </>
                    )}

                    {step === 'otp' && (
                        <div className="auth-field">
                            <label htmlFor="otp">Enter OTP</label>
                            <input
                                id="otp"
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            <p>
                                Time remaining: {Math.floor(timeLeft / 60)}:
                                {String(timeLeft % 60).padStart(2, '0')}
                            </p>

                            <button
                                type="button"
                                className="auth-submit"
                                onClick={handleVerifyOTP}
                            >
                                Verify OTP
                            </button>

                            {timeLeft <= 0 && (
                                <button
                                    type="button"
                                    className="auth-link"
                                    onClick={handleForgotPassword}
                                >
                                    Send OTP Again
                                </button>
                            )}
                        </div>
                    )}

                    {step === 'reset' && (
                        <div className="auth-field">
                            <label htmlFor="new-password">New Password</label>
                            <input
                                id="new-password"
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            <label htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                className="auth-submit"
                                onClick={handleResetPassword}
                            >
                                Reset Password
                            </button>
                        </div>
                    )}

                    {message && <p role="status">{message}</p>}
                </form>

                {step === 'login' && (
                    <p className="auth-switch">
                        Don't have an account?{' '}
                        <button
                            className="auth-link"
                            type="button"
                            onClick={onRegister}
                        >
                            Register
                        </button>
                    </p>
                )}
            </div>
        </div>
    )
}

export default Login

