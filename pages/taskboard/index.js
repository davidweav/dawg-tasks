import DropdownMenu from "@/components/DropdownMenu";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Taskboard() {
    // State to hold the posts data
    const [postData, setPostData] = useState([]);

    // Fetch posts data from the API on component mount
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/posts/readposts');
                const data = await res.json();
                setPostData(data.posts); // Update the state with the fetched posts data
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        }
        
        fetchPosts();
    }, []); // The empty array means this effect runs once on mount

    return (
        <main className="page" >
            <nav >
              <Link href="/" className="title">
                Dawg Tasks
              </Link>
              <p>get help. get paid</p>
              <DropdownMenu />
            </nav>

            <h1>Taskboard</h1>
            {/* Render posts if postData is not empty */}
            <div className="taskboard-box">
              {postData && postData.length > 0 ? (
                  postData.map((post) => (
                      <div key={post.taskId} className="post-box">
                          <h2 className="post-title">{post.subject}</h2>
                          <div className="post-content">
                            <p>{post.body}</p>
                            <p>{post.user}</p>
                            <p>{post.dueDate}</p>
                            <p>${post.price}</p>
                            
                        </div>
                          
                      </div>
                  ))
              ) : (
                  <p>No tasks available.</p>
              )}
            </div>
        </main>
    );
}
