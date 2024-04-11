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
        <main className="page" style={{ fontFamily: 'Arial, sans-serif', color: '#FFF', backgroundColor: '#333' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#20232a' }}>
              <Link href="/">
                <span className="title" style={{ cursor: "pointer", fontWeight: 'bold', fontSize: '24px', color: '#61dafb' }}>Dawg Tasks</span>
              </Link>
              <p style={{ margin: '0', fontSize: '16px', color: '#61dafb' }}>get help. get paid</p>
              <DropdownMenu />
            </nav>

            <h1 style={{ textAlign: 'center', margin: '20px 0', fontSize: '36px' }}>Taskboard</h1>
            {/* Render posts if postData is not empty */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
              {postData && postData.length > 0 ? (
                  postData.map((post) => (
                      <div key={post.taskId} style={{ width: '300px', padding: '20px', borderRadius: '5px', backgroundColor: '#20232a', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                          <h2 style={{ fontSize: '20px', color: '#61dafb' }}>{post.description}</h2>
                          <p style={{ margin: '10px 0', fontSize: '16px' }}>Publisher: {post.publisher}</p>
                          <p style={{ margin: '10px 0', fontSize: '16px' }}>Due Date: {post.dueDate}</p>
                          <p style={{ margin: '10px 0', fontSize: '16px' }}>Reward: ${post.reward}</p>
                          <p style={{ margin: '10px 0', fontSize: '16px' }}>Status: {post.status}</p>
                      </div>
                  ))
              ) : (
                  <p>No tasks available.</p>
              )}
            </div>
        </main>
    );
}
