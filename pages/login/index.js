import Link from "next/link"
import { useState } from "react"


export default function Login() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [username2, setUsername2] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {

    }

    return (
        <main className={`page`}>
            <nav>
              <Link className='title' href='/'>Dawg Tasks</Link>
              <p>get help. get paid</p>
              <Link className='sign-in' href='/login'>Sign In</Link>
            </nav>

            <h3>Create Account</h3>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                            <input type="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div className="form-field">
                        <label htmlFor="username">Username</label>
                            <input type="text" 
                                id="username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                            <input type="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
                    <button type="submit">Create Account</button>
                </form>
                
            </div>

            <p>or</p>
            <h3>Sign In</h3>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-field">
                        <label htmlFor="username2">Username</label>
                            <input type="text" 
                                id="username2" 
                                value={username2}
                                onChange={(e) => setUsername2(e.target.value)}
                            />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password2">Password</label>
                            <input type="password" 
                                id="password2" 
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>

        </main>
    )
}