'use client';

import '../styles/about.css';
import { useUser } from "@auth0/nextjs-auth0/client"
import { motion } from 'framer-motion';
import mediumlogo from '../../public/medium.png'
import linkedinlogo from '../../public/linkedin.png'
import githublogo from '../../public/github.png'
import instagramlogo from '../../public/instagram2.png'
import flatironlogo from '../../public/flatiron.jpeg'
import logo from '../../public/logo3.png'
import Image from 'next/image';
import Link from 'next/link';

export default function About() {

    return (
        <div className='about-body'>
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.1,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
            <div>
                <h1 className='about-title'>About This Project</h1>
                <p className='about-text'>Welcome to Highroller Gaming, my capstone project, a dynamic and engaging app that showcases three exciting mini-games, a seamless coin system, and an array of powerful technologies. Developed as the culmination of my journey through the Flatiron School Software Engineering program, this project showcases my skills and creativity in building a comprehensive application.
                The heart of this app lies in its three captivating mini-games, designed to provide hours of entertainment. Each mini-game offers a unique and immersive experience, challenging users with diverse gameplay mechanics and objectives.<br/><br/>
                Behind the scenes, I employed PostgreSQL as the database system to ensure efficient and reliable data storage. Prisma, a powerful backend ORM, facilitated seamless integration between the database and the application's logic, enabling smooth and optimized data operations.
                For the frontend and backend development, I leveraged the versatility of Next.js, a popular framework that allowed me to build a robust and responsive user interface. With Next.js, I created a seamless user experience by rendering both server-side and client-side, ensuring fast loading times and smooth navigation.
                To ensure secure user authentication and management, I implemented Auth0, a reliable authentication and authorization platform. With Auth0, users can securely sign up, log in, and manage their accounts, providing a safe and personalized experience within the app.<br/><br/>
                My capstone project is not only a testament to my technical skills but also a reflection of my passion for creating enjoyable and engaging applications. It showcases my ability to leverage cutting-edge technologies, integrate complex systems, and deliver a polished user experience.
                I invite you to explore my capstone project and experience the excitement of the mini-games, the satisfaction of the dynamic coin system, and the seamless integration of PostgreSQL, Prisma, Next.js, and Auth0. Thank you for joining me on this thrilling journey through my capstone project for the Flatiron School Software Engineering program.
                </p>
            </div>
            </motion.div>
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.4,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
            <div className='name-box'>
                <h1 className='name'> <hr/>Erkut Cakmak<hr/></h1>
            </div>
            </motion.div>
            <div className='about-socials'>
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.7,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <div className="social-circle">
                    <div className="up">
                        <Link className="card1" href='https://www.linkedin.com/in/erkutcakmak/' legacyBehavior>
                            <a className="card1" target="_blank" rel="noopener noreferrer">
                                <Image className= 'linkedin' src={linkedinlogo} alt="linkedin-logo" />
                            </a>
                        </Link>
                        <Link className="card2" href='https://medium.com/@cakmak.erkut1' legacyBehavior>
                            <a className="card2" target="_blank" rel="noopener noreferrer">
                                <Image className= 'medium' src={mediumlogo} alt="medium-logo" />
                            </a>
                        </Link>
                    </div>
                    <div className="down">
                        <Link className="card3" href='https://github.com/erkutcak' legacyBehavior>
                            <a className="card3" target="_blank" rel="noopener noreferrer">
                                <Image className= 'github' src={githublogo} alt="github-logo" />
                            </a>
                        </Link>
                        <Link className="card4" href='https://www.instagram.com/erkutcakmak/' legacyBehavior>
                            <a className="card4" target="_blank" rel="noopener noreferrer">
                                <Image className= 'instagram' src={instagramlogo} alt="instagram-logo" />
                            </a>
                        </Link>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.9,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <div>
                    <Image className='about-logo' src={logo} alt='logo'/>
                </div>
            </motion.div>
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 1.2,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <div>
                    <Link href='https://flatironschool.com/' legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer">
                            <Image className='flatiron-logo' src={flatironlogo} alt='flatironlogo'/>
                        </a>
                    </Link>
                </div>
            </motion.div>
            </div>
        </div>
        );
    }
