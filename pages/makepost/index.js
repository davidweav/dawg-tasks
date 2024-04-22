import DropdownMenu from "@/components/DropdownMenu"
import styles from '../../styles/Makepost.module.css'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"

export default function Makepost() {

    const router = useRouter();
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [price, setPrice] = useState('');

    const handleCreatePost = async (e) => {
        console.log("hello");
        e.preventDefault();
        // call to server side API
       
        try {

            const res = await fetch('/api/posts/makepost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({subject, body, dueDate, price})
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
                        <label htmlFor="price">Amount Paying</label>
                            <input type="number" 
                                id="price" 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                min="0.01" 
                                step="0.01" 
                                max="10000" 
                            />
                    </div>
                    <div className="form-field">
                        <label htmlFor="dueDate">Expiry Date</label>
                            <input type="date" 
                                id="dueDate" 
                                value={dueDate}
                                name="trip-start"  
                                min="2024-01-01" 
                                max="2024-12-31"
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                    </div>
                    <button type="submit" className={styles.createPostButton}>Create Post</button>
                </form>
                
            </div>

        </main>
    )
}