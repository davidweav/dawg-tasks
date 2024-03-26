import Link from "next/link"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export default function Login() {
    return (
        <main className={`${inter.className} page`}>
            <nav>
              <Link className='title' href='/'>Dawg Tasks</Link>
              <p>get help. get paid</p>
              <Link className='sign-in' href='/login'>Sign In</Link>
            </nav>

            <h1>Login Page</h1>
        </main>
    )
}