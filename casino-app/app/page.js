import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import homepage from './styles/homepage.css'


export default function Home() {
  return (

    <div className='homepage'>
      <Link href="/api/auth/login?returnTo=/dashboard">
        <h1 className='login'>Login</h1>
      </Link>
    </div>
  )
}
