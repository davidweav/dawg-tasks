import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DropdownMenu from '@/components/DropdownMenu'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  
  return (
    <>
      <Head>
        <title>Dawg Tasks</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className} page`}>
      
            <nav>
              <Link className='title' href="/">Dawg Tasks</Link>
              <p>get help. get paid</p>
              <DropdownMenu />
            </nav>

            <div className='body'>
              <h2>Welcome to <em>Dawg Tasks</em></h2>
              <p>a web app for UGA students</p>
              <p>get help with things you need to get done</p>

              
            </div>
              
          
      </main>
    </>
  )
}
