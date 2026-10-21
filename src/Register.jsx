// import { useState } from 'react'

// function Register({ onLogin }) {
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [phone, setPhone] = useState('')
//     const [password, setPassword] = useState('')

//     return (
//         <div>
//             <h2>Create a RideEasy Account</h2>

//             <input
//                 type="text"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//             />

//             <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//                 type="tel"
//                 placeholder="Enter 10-digit phone number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//             />

//             <input
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />

//             <button>Register</button>
//             <p>
//                 Already have an account?{' '}
//                 <button onClick={onLogin}>Login</button>
//             </p>
//         </div>
//     )
// }

// export default Register


import { useState } from 'react'
import './Auth.css'

function Register({ onLogin }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const handleRegister = async (e) => {
        e.preventDefault()
        setMessage('')

        try {
            const response = await fetch('http://127.0.0.1:8000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password,
                    role: 'user'
                })
            })

            const data = await response.json()

            if (!response.ok) {
                if (Array.isArray(data.detail)) {
                    const errors = data.detail.map((item) => {
                        if (item.loc.includes('phone')) {
                            return 'Phone number must contain exactly 10 digits.'
                        }

                        if (item.loc.includes('password')) {
                            return 'Password must contain at least 8 characters.'
                        }

                        if (item.loc.includes('email')) {
                            return 'Please enter a valid email address.'
                        }

                        if (item.loc.includes('name')) {
                            return 'Please enter your name.'
                        }

                        return item.msg
                    })

                    setMessage(errors.join(' '))
                } else {
                    setMessage(data.detail || 'Registration failed.')
                }

                return
            }
            setMessage('SUCCESS: Registration successful! You can now log in.')
        } catch {
            setMessage('Cannot connect to the server.')
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-brand">
                    <span className="auth-brand-icon">R</span>
                    <span>
                        Ride<span className="auth-brand-accent">Easy</span>
                    </span>
                </div>

                <h1>Create a RideEasy Account</h1>

                <p className="auth-subtitle">
                    Register to start your journey.
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleRegister}
                >
                    <div className="auth-field">
                        <label htmlFor="register-name">Full name</label>
                        <input
                            id="register-name"
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="register-email">Email address</label>
                        <input
                            id="register-email"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="register-phone">Phone number</label>
                        <input
                            id="register-phone"
                            type="tel"
                            placeholder="Enter 10-digit phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="register-password">Password</label>
                        <input
                            id="register-password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="auth-submit" type="submit">
                        Register
                    </button>
                </form>

                {message && (
                    <p style={{
                        color: message.startsWith('SUCCESS:') ? 'green' : 'red',
                        marginTop: '12px'
                    }}>
                        {message.replace('SUCCESS: ', '')}
                    </p>
                )}

                <p className="auth-switch">
                    Already have an account?{' '}
                    <button
                        className="auth-link"
                        type="button"
                        onClick={onLogin}
                    >
                        Login
                    </button>
                </p>
            </section>
        </main>
    )
}

export default Register

