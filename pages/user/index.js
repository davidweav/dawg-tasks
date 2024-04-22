import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import DropdownMenu from "@/components/DropdownMenu";


export default function MyTasks() {

    const [userData, setUserData] = useState(null);
    const [myPostData, setMyPostData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [claimedTasks, setClaimedTasks] = useState([]);
    // Fetch posts data from the API on component mount
    // Define fetchPosts outside of useEffect so it's accessible globally
    async function fetchPosts() {
        try {
            const res = await fetch('/api/posts/readposts');
            const data = await res.json();
            const myPosts = data.posts.filter(post => post.user.username === userData.username);
            const claimedPosts = data.posts.filter(post => {
                return post.status == "claimed" && post.requestingUser.username == userData.username})
            const requests = myPosts.filter(post =>  post.status === "requested");

            console.log(myPosts, requests);
            setMyPostData(myPosts);
            setRequestData(requests);
            setClaimedTasks(claimedPosts)
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    }

    const handleClick = async (postId) => {
    
        try {

            const res = await fetch('/api/posts/acceptrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({postId})
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
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/user');
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData(); // Fetch user data on mount
    }, []); // The empty array means this effect runs once on mount

    useEffect(() => {
        // Check if userData is not null before fetching posts
        if (userData != null) {
            fetchPosts();
        }
    }, [userData]); // Run this effect whenever userData changes
        

    return (
        <main className={`page`}>
            <nav>
              <Link className='title' href='/'>Dawg Tasks</Link>
              <p>get help. get paid</p>
              <DropdownMenu/>
            </nav>


            <div className="user-task-container">
                <div className="task-display">
                    <h3>Claimed Tasks</h3>
                    {claimedTasks && claimedTasks.length > 0 ? (
                  claimedTasks.map((post) => (
                      <div key={post._id} 
                      className="post-box2">
                        <div>
                          <h2 className="post-title2">{post.subject}</h2>
                          <div className="post-content2">
                            <p>{post.body}</p>
                            <p>{post.user.username}</p>
                            <p>{post.dueDate}</p>
                            <p>${post.price}</p>
                        </div>
                        </div>
                          
                      </div>
                  ))
              ) : (
                  <p>You have not posted any tasks.</p>
              )}
                </div>
                <div className="task-display">
                    <h3>My Tasks</h3>
                    {myPostData && myPostData.length > 0 ? (
                  myPostData.map((post) => (
                      <div key={post._id} 
                      className="post-box2">
                        <div>
                          <h2 className="post-title2">{post.subject}</h2>
                          <div className="post-content2">
                            <p>{post.body}</p>
                            <p>{post.user.username}</p>
                            <p>{post.dueDate}</p>
                            <p>${post.price}</p>
                        </div>
                        </div>
                          
                      </div>
                  ))
              ) : (
                  <p>You have not posted any tasks.</p>
              )}
                </div>
                <div className="task-display">
                    <h3>Incoming Requests</h3>
                    {requestData && requestData.length > 0 ? (
                  requestData.map((post) => (
                      <div key={post._id} 
                      className="post-box2">
                        <div>
                          <h2 className="post-title2">{post.subject}</h2>
                          <div className="post-content2">
                            <p>{post.requestingUser.username} requests to claim this task</p>
                            <p>{post.statusMsg}</p>
                            <button onClick={handleClick(post._id)} className="post-button">Accept Request </button>
                        
                        </div>
                        </div>
                          
                      </div>
                  ))
              ) : (
                  <p>No one has requested to complete your tasks</p>
              )}
                </div>
            </div>


        </main>
    )
}