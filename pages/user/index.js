import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DropdownMenu from "@/components/DropdownMenu";
import { format } from "date-fns";
import { set } from "mongoose";
import { ReactElement } from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MyTasks() {

    const router = useRouter();
    
    // States of the Page
    const [userData, setUserData] = useState(null); // Contains the user data from the token
    const [myPostData, setMyPostData] = useState([]); // Contains all the users posts
    const [requestData, setRequestData] = useState([]); // Contains all the users incoming requests
    const [outgoingRequests, setOutgoingRequests] = useState([]); // Contains all the users outgoing requests
    const [claimedTasks, setClaimedTasks] = useState([]); // Contains all the users current tasks
    const [finishedTasks, setFinishedTasks] = useState([]); // New state for finished tasks

    
    /**
     * Function responsible for fetching the array of posts from the database
     */
    async function fetchPosts() {
        try {

            const res = await fetch('/api/posts/readposts');
            const data = await res.json();
            
            const myPosts = data.posts.filter(post => post.user.username === userData.username);
            const claimedPosts = data.posts.filter(post => post.status === "claimed" && post.requestingUser.username === userData.username);
            const requests = myPosts.filter(post => post.status === "requested");
            const outgoingRequests = data.posts.filter(post => post.status === "requested" && post.requestingUser.username === userData.username);
            console.log(outgoingRequests)
            setMyPostData(myPosts);
            setRequestData(requests);
            setOutgoingRequests(outgoingRequests);
            setClaimedTasks(claimedPosts);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    }

    /**
     * Handles the action users take on incoming requests
     * @param {} postId 
     */
    const handleRequest = async (postId, isAccepted) => {
        try {
            const res = await fetch('/api/posts/acceptrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, isAccepted })
            });
            if (res.ok) {
                router.reload()
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
        // Send a request to the server to update the post status
        fetch('/api/posts/handlecomplete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log('Post marked as completed:', data.data);
                    router.reload();
                } else {
                    console.error('Failed to mark post as completed:', data.message);
                }
            })
            .catch(error => {
                console.error('Error marking post as completed:', error);
            });
    };

    const handleDecline = (post) => {
        const reason = prompt("Please enter the reason for declining the task:");
        if (reason) {
            const declinedPost = { ...post, reason }; // Attach the reason to the post
            setFinishedTasks([...finishedTasks, declinedPost]);
            setClaimedTasks(claimedTasks.filter(p => p._id !== post._id));
        }
    };

    function formatDate(dateString) {
        // Parse the MongoDB date string into a Date object
        const date = new Date(dateString);
        
        // Format the date using date-fns
        return format(date, 'MM/dd/yyyy');
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
                        <h3>Incoming Requests</h3>
                        <p>{requestData.length}</p>
                        {requestData.length > 0 ? requestData.map((post) => (
                            <div key={post._id} className="post-box2">
                                <div>
                                    <h2 className="post-title2">{post.subject}</h2>
                                    <div className="post-content2">
                                        <p>{post.statusMsg}</p>
                                        <p>{post.requestingUser.username}</p>
                                        <button className="create-account-btn" onClick={() => handleRequest(post, true)}>Accept</button>
                                        <button className="create-account-btn" onClick={() => handleRequest(post, false)}>Decline</button>
                                    </div>
                                </div>
                            </div>
                        )) : <p>No claimed tasks available.</p>}
                        <h3 style={{marginTop: '150px'}}>Outgoing Requests</h3>
                        <p>{outgoingRequests.length}</p>
                        {outgoingRequests.length > 0 ? outgoingRequests.map((post) => (
                            <div key={post._id} className="post-box2">
                                <div>
                                    <h2 className="post-title2">{post.subject}</h2>
                                    <div className="post-content2">
                                        <p>{post.statusMsg}</p>
                                        <p>{post.requestingUser.username}</p>
                                        <button className="create-account-btn" onClick={() => handleRequest(post, false)}>Cancel Request</button>
                                    </div>
                                </div>
                            </div>
                        )) : <p>No outgoing requests.</p>}
                    </div>
                <div className="task-display">
                    <h3>Claimed Tasks</h3>
                    <p>{claimedTasks.length}</p>
                    {claimedTasks.length > 0 ? claimedTasks.map((post) => (
                        <div key={post._id} className="post-box2">
                            <div>
                                <h2 className="post-title2">{post.subject}</h2>
                                <div className="post-content2">
                                    <p>{post.body}</p>
                                    <p>{post.user.username}</p>
                                    <p>{formatDate(post.dueDate)}</p>
                                    <p>${post.price}</p>
                                    <button onClick={() => handleComplete(post)}>Finished</button>
                                </div>
                            </div>
                        </div>
                    )) : <p>No claimed tasks available.</p>}
                </div>
                <div className="task-display">
                    <h3>My Tasks</h3>
                    <p>{myPostData.length}</p>
                    {myPostData.length > 0 ? myPostData.map((post) => (
                        <div key={post._id} className="post-box2">
                            <div>
                            <FontAwesomeIcon onClick={() => handleComplete(post)}className="icon" icon={faTrash} />
                            <h2 className="post-title2">{post.subject}</h2>
                            <p>{formatDate(post.dueDate)}</p>
                            {post.status == "claimed" ? 
                            (<>
                            <p>Claimed by: {post.requestingUser.username}</p>
                            </>) : (<>
                            <p>Unclaimed</p></>)}
                        </div>
                        </div>
                   
                    )) : <p>You have not posted any tasks.</p>}
                </div>
    
            </div>
        </main>
    );
}
