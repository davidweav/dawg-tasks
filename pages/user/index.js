import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DropdownMenu from "@/components/DropdownMenu";

export default function MyTasks() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [myPostData, setMyPostData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [claimedTasks, setClaimedTasks] = useState([]);
    const [finishedTasks, setFinishedTasks] = useState([]); // New state for finished tasks

    async function fetchPosts() {
        try {
            const res = await fetch('/api/posts/readposts');
            const data = await res.json();
            const myPosts = data.posts.filter(post => post.user.username === userData.username);
            const claimedPosts = data.posts.filter(post => post.status === "claimed" && post.requestingUser.username === userData.username);
            const requests = myPosts.filter(post => post.status === "requested");

            setMyPostData(myPosts);
            setRequestData(requests);
            setClaimedTasks(claimedPosts);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    }

    const handleAccept = async (postId) => {
        try {
            const res = await fetch('/api/posts/acceptrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId })
            });
            if (res.ok) {
                fetchPosts(); // Re-fetch posts to update the UI
            } else {
                const errorData = await res.json();
                console.error('Accept request failed:', errorData);
            }
        } catch (error) {
            console.error('Error accepting a post:', error);
        }
    };

    const handleComplete = (post) => {
        setFinishedTasks([...finishedTasks, post]);
        setClaimedTasks(claimedTasks.filter(p => p._id !== post._id));
    };

    const handleDecline = (post) => {
        const reason = prompt("Please enter the reason for declining the task:");
        if (reason) {
            const declinedPost = { ...post, reason }; // Attach the reason to the post
            setFinishedTasks([...finishedTasks, declinedPost]);
            setClaimedTasks(claimedTasks.filter(p => p._id !== post._id));
        }
    };

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
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            fetchPosts();
        }
    }, [userData]);

    return (
        <main className={`page`}>
            <nav>
                <Link className='title' href='/'>Dawg Tasks</Link>
                <p>get help. get paid</p>
                <DropdownMenu />
            </nav>

            <div className="user-task-container">
                <div className="task-display">
                    <h3>Claimed Tasks</h3>
                    {claimedTasks.length > 0 ? claimedTasks.map((post) => (
                        <div key={post._id} className="post-box2">
                            <div>
                                <h2 className="post-title2">{post.subject}</h2>
                                <div className="post-content2">
                                    <p>{post.body}</p>
                                    <p>{post.user.username}</p>
                                    <p>{post.dueDate}</p>
                                    <p>${post.price}</p>
                                    <button onClick={() => handleComplete(post)}>Complete</button>
                                    <button onClick={() => handleDecline(post)}>Decline</button>
                                </div>
                            </div>
                        </div>
                    )) : <p>No claimed tasks available.</p>}
                </div>
                <div className="task-display">
                    <h3>My Tasks</h3>
                    {myPostData.length > 0 ? myPostData.map((post) => (
                        <div key={post._id} className="post-box2">
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
                    )) : <p>You have not posted any tasks.</p>}
                </div>
                <div className="task-display">
                    <h3>Finished Tasks</h3>
                    {finishedTasks.length > 0 ? finishedTasks.map((post) => (
                        <div key={post._id} className="post-box2">
                            <div>
                                <h2 className="post-title2">{post.subject}</h2>
                                <div className="post-content2">
                                    <p>Task was {post.reason ? "declined" : "completed"}</p>
                                    {post.reason && <p>Reason: {post.reason}</p>}
                                </div>
                            </div>
                        </div>
                    )) : <p>No finished tasks yet.</p>}
                </div>
            </div>
        </main>
    );
}
