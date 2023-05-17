import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href='/dashboard'>
        <h1>Login</h1>
      </Link>
      <Link href='/wallet'>
        <h1>Wallet</h1>
      </Link>
    </div>
  )
}
