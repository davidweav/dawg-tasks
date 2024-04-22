import DropdownMenu from "@/components/DropdownMenu";
import { set } from "mongoose";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Taskboard() {
    // State to hold the posts data
    const [postData, setPostData] = useState([]);
    const [hoveredPost, setHoveredPost] = useState(null);

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
                      <div key={post._id} 
                      onClick={() => {setHoveredPost(post._id)}} 
                      className={hoveredPost == post._id ? 'post-box clicked' : "post-box"}>
                        <div>
                          <h2 className="post-title">{post.subject}</h2>
                          <div className="post-content">
                            <p>{post.body}</p>
                            <p>{post.user}</p>
                            <p>{post.dueDate}</p>
                            <p>${post.price}</p>
                        </div>
                        </div>
                            {hoveredPost == post._id && (
                                 <div className="additional-fields">
                                 <textarea className="post-input" type="text" placeholder="Send a message in your request" />
                                 <button className="post-button"onClick={() => handleSubmit(post)}>Claim Task</button>
                               </div>
                            )}

                        
                          
                      </div>
                  ))
              ) : (
                  <p>No tasks available.</p>
              )}
            </div>
        </main>
    );
}
