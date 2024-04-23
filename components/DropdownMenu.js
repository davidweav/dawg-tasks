import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

const DropdownMenu = () => {


    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
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
    }, [])

    const handleSignOut = async (e) => {
      document.cookie = 'token=; path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      router.push('/login')
    }
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div>
            {userData ? (
                <div className='dropdown'>
                  <button onClick={toggleDropdown}className='dropdown-button'>{userData.username} ^</button>
                  { isOpen && (
                    <div className="dropdown-content">
                    <Link href='/makepost'>Make Post</Link>
                    <Link href='/taskboard'>Taskboard</Link>
                    <Link href='/user'>My Tasks</Link>
                    <button onClick={handleSignOut}>Sign Out</button>
                  </div>
                  )}
                  
                </div>
              ) : (
                <Link className='sign-in' href='/login' style={{ color: 'white' }}>Sign In</Link>
              )}
        </div>
    )
}

export default DropdownMenu;
