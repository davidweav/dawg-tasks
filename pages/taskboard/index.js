import DropdownMenu from "@/components/DropdownMenu"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Taskboard() {
    
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        // Call Database
        // const res = await fetch('/api/posts/readposts')
    })


    return (
        <main className={`page`}>
            <nav>
              <Link className='title' href='/'>Dawg Tasks</Link>
              <p>get help. get paid</p>
              <DropdownMenu/>
              
            </nav>

            <h1>Taskboard</h1>
        
            
        </main>
    )
}