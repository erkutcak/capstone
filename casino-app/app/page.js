import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import homepage from './styles/homepage.css'
import logo from '../public/logo3.png'


export default function Home() {
  return (
    <div className='homepage'>
      <h3 className='neon-title'>Welcome to,</h3>
      <h1 className="neon" data-text="U">HI<span className="flicker-slow">G</span>H<span className="flicker-fast"> R</span>OL<span className="flicker-slow">L</span>E<span className="flicker-fast">R</span></h1>
      <Image className='home-logo' src={logo} alt='high roller logo'/>
      <Link href="/api/auth/login?returnTo=/dashboard">
      <button className='login-button'><span>Enter</span></button>
      </Link>
      <h4 className='disclaimer-title'>Legal Disclaimer</h4>
      <p className='disclaimer'>Please note, during your use of this site, that online gaming is an entertainment vehicle, and that it carries with it a certain degree of financial risk. Players should be aware of this risk, and govern themselves accordingly. All users of this site should exercise responsibility when playing; High Roller has undertaken to inform all those interested in online gaming about the dangers of excess that could potentially result from such an activity. There is nothing contained herein that constitutes a guarantee of winning, nor is there an intention to induce anyone into violating any local, state or national laws. Recognizing that the laws and regulations involving online gaming are different everywhere, readers are advised to check with the laws that exist within their own jurisdiction to ascertain the legality of the activities which are covered.</p>
    </div>
  )
}
