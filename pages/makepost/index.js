import DropdownMenu from "@/components/DropdownMenu"
import Link from "next/link"
import { useState } from "react"

export default function Makepost() {

    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [dateExpired, setDateExpired] = useState('');
    const [priceAmount, setPriceAmount] = useState('');

    const handleCreatePost = async (e) => {
        e.preventDefault();
        // call to server side API
        try {

            const res = await fetch('/api/posts/makeposts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({subject, body, user, dateExpired, priceAmount})
            })
            if (res.ok) {
                router.push('/taskboard')
            } else { 
                const errorData = await res.json();
                console.error('Post creation failed:', errorData);
            }
        }
        catch (error) {      
            console.error('Error creating a post:', error);
        }
    }

    return (
        <main className={`page`}>
            <nav>
              <Link className='title' href='/'>Dawg Tasks</Link>
              <p>get help. get paid</p>
              <DropdownMenu/>
            </nav>

            <h1>Make Post Page</h1>
            <br/>

            <div className="form-container">
                <form onSubmit={handleCreatePost}>
                    <div className="form-field">
                        <label htmlFor="subject">Subject</label>
                            <input type="subject" 
                                id="subject" 
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                    </div>
                    <div className="form-field">
                        <label htmlFor="body">Body</label>
                            <textarea 
                                rows="20"
                                cols="60"
                                id="body" 
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                    </div>
                    <div className="form-field">
                        <label htmlFor="priceAmount">Amount Paying</label>
                            <input type="priceAmount" 
                                id="priceAmount" 
                                value={priceAmount}
                                onChange={(e) => setPriceAmount(e.target.value)}
                            />
                    </div>
                    <div className="form-field">
                        <label htmlFor="dateExpired">Epiry Date</label>
                            <input type="dateExpired" 
                                id="dateExpired" 
                                value={dateExpired}
                                onChange={(e) => setDateExpired(e.target.value)}
                            />
                    </div>
                    <button type="submit">Create Post</button>
                </form>
                
            </div>

        </main>
    )
}