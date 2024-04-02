import React, {useState, useEffect} from 'react'
import Link from 'next/link';

const DropdownMenu = () => {


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

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div>
            {userData ? (
                <div className='dropdown'>
                  <button onClick={toggleDropdown}className='dropdown-button'>{userData.username} ^</button>
                  {isOpen && (
                    <div class="dropdown-content">
                    <Link href='/makepost'>Make Post</Link>
                    <Link href='/taskboard'>Taskboard</Link>
                  </div>
                  )}
                  
                </div>
              ) : (
                <Link className='sign-in' href='/login'>Sign In</Link>
              )}
        </div>
    )
}

export default DropdownMenu;