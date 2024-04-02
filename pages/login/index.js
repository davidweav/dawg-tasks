import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router";


export default function Login() {

    /* Variables to hold the values of what the user enters in form
    *  2 corresponds the login form the rest correspond to registering
    */ 
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [username2, setUsername2] = useState('');
    const [password2, setPassword2] = useState('');
    const router = useRouter();


    /* This method handles if the user desides to register.
    *  It works by making an http request to the endpoint in /api/auth/register
    */
    const handleCreateAccount = async (e) => {
    
        e.preventDefault();
        try {
            
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, username, password})
            })
            if (res.ok) {
                // const data = await res.json();
                // localStorage.setItem('token', data.token)
                router.push('/taskboard')
            }
            else {
                // Handle error response
                const errorData = await res.json();
                console.error('Account creation failed:', errorData);
              }
        }
        catch (error) {      
            console.error('Error creating account:', error);
        }
    }

    /* This method handles if the user desides to Login.
    *  It works by making an http request to the endpoint in /api/auth/login
    */
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username2, password: password2}),
            });

            if (res.ok) {
                router.push('/taskboard')
            }
            else {
                // Handle error response
                const errorData = await res.json();
                console.error('Account creation failed:', errorData);
              }
        }
        catch (error) {
            console.error('Error creating account:', error);
        }
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
                <form onSubmit={handleCreateAccount}>
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
                <form onSubmit={handleLogin}>
                    
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