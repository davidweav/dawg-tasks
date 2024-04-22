import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import DropdownMenu from "@/components/DropdownMenu";


export default function EditUser() {

    const [userData, setUserData] = useState(null);
    const [myPostData, setMyPostData] = useState([]);
    // Fetch posts data from the API on component mount
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/posts/readposts');
                const data = await res.json();
                const myPosts = data.posts.filter(post => post.user == userData.username)
                console.log(myPosts)
                setMyPostData(myPosts); // Update the state with the fetched posts data
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        }
        const fetchUserData = async () => {
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
        };
        fetchUserData();
        fetchPosts();
   
    }, []); // The empty array means this effect runs once on mount

    

    return (
        <main className={`page`}>
            <nav>
              <Link className='title' href='/'>Dawg Tasks</Link>
              <p>get help. get paid</p>
              <DropdownMenu/>
            </nav>

            <h3>My Tasks</h3>

            <div className="user-task-container">
                <div className="task-display">
                    <h3>Tasks you have claimed</h3>
                </div>
                <div className="task-display">
                    <h3>Your Tasks</h3>
                    {myPostData && myPostData.length > 0 ? (
                  myPostData.map((post) => (
                      <div key={post._id} 
                      className="post-box2">
                        <div>
                          <h2 className="post-title2">{post.subject}</h2>
                          <div className="post-content2">
                            <p>{post.body}</p>
                            <p>{post.user}</p>
                            <p>{post.dueDate}</p>
                            <p>${post.price}</p>
                        </div>
                        </div>
                          
                      </div>
                  ))
              ) : (
                  <p>No tasks available.</p>
              )}
                </div>
            </div>


        </main>
    )
}