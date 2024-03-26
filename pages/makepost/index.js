import Link from "next/link"

export default function Makepost() {
    return (
        <main className={`page`}>
            <nav>
              <Link className='title' href='/'>Dawg Tasks</Link>
              <p>get help. get paid</p>
              <Link className='sign-in' href='/login'>Sign In</Link>
            </nav>

            <h1>Make Post Page</h1>
        </main>
    )
}