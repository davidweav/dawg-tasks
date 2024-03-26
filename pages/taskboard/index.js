import Link from "next/link"


export default function Taskboard() {
    return (
        <main className={`page`}>
            <nav>
              <Link className='title' href='/'>Dawg Tasks</Link>
              <p>get help. get paid</p>
              <Link className='sign-in' href='/login'>Sign In</Link>
            </nav>

            <h1>Taskboard</h1>
        </main>
    )
}