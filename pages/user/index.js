import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router";
import DropdownMenu from "@/components/DropdownMenu";


export default function EditUser() {


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    /* This method handles if the user desides to register.
    *  It works by making an http request to the endpoint in /api/auth/register
    */
    

    return (
        <main className={`page`}>
            <nav>
              <Link className='title' href='/'>Dawg Tasks</Link>
              <p>get help. get paid</p>
              <DropdownMenu/>
            </nav>

            <h3>Edit Account</h3>

            <div className="form-container">
                <form >
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

        </main>
    )
}