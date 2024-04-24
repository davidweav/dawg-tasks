import DropdownMenu from "@/components/DropdownMenu";
import { set } from "mongoose";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";

export default function Taskboard() {
    // State to hold the posts data
    const [postData, setPostData] = useState([]);
    const [hoveredPost, setHoveredPost] = useState(null);
    const [reqMsg, setReqMsg] = useState('');
    const router = useRouter();

    // Fetch posts data from the API on component mount
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/posts/readposts');
                const data = await res.json();
                
                setPostData(data.posts.filter(post => post.status == "Unclaimed")); // Update the state with the fetched posts data
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        }
        fetchPosts();
    }, []); // The empty array means this effect runs once on mount

    function formatDate(dateString) {
        // Parse the MongoDB date string into a Date object
        const date = new Date(dateString);
        
        // Format the date using date-fns
        return format(date, 'MM/dd/yyyy');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/posts/claimpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"post": hoveredPost, reqMsg})
            })
            console.log(res);
            if (res.ok) {
            
                router.reload();
            }
            else {
                // Handle error response
                const errorData = await res.json();
                console.error('Error', errorData);
            }
        }
        catch (error) {      
            console.error('Error:', error);
        }
        }
    
    return (
        <main className="page" >
            <nav >
              <Link href="/" className="title">
                Dawg Tasks
              </Link>
              <p>get help. get paid</p>
              <DropdownMenu />
            </nav>

            <h1>The Taskboard</h1>
            <p>Click tasks to send requests to claim them</p>

            {/* Render posts if postData is not empty */}
            <div className="taskboard-box">
              {postData && postData.length > 0 ? (
                  postData.map((post) => (
                      <div key={post._id} 
                      onClick={() => {setHoveredPost(post._id)}} 
                      className={hoveredPost == post._id ? 'post-box clicked' : "post-box"}>
                        <div>
                            <div className="post-sub-content">
                          <h2 className="post-title">{post.subject}</h2>
                          <h3 className="post-price">${post.price}</h3>
                          </div>
                          <div className="post-content">
                            
                            <p>{post.body}</p>
                            
                            <div className="post-sub-content">
                            <p><em>Posted By:</em> </p>
                            <p>{post.user.username}</p>
                            </div>
                            
                            <div className="post-sub-content">
                            <p><em>Complete By:</em> </p>
                            <p>{formatDate(post.dueDate)}</p>
                            </div>
                            
                        </div>
                        </div>
                            {hoveredPost == post._id && (
                                 <div className="additional-fields">
                                    <form onSubmit={handleSubmit}>
                                        <textarea className="post-input" required rows="10" value = {reqMsg} type="text" placeholder="Send a message in your request. Include contact details, so the user who posted can contact you" 
                                        onChange={(e) => setReqMsg(e.target.value)}/>
                                        <button className="create-account-btn" type="submit">Claim Task</button>
                                    </form>
                                 
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
