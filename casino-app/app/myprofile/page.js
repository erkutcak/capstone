'use client';

import '../styles/profile.css';
import Profile from "@/components/Profile";
import { motion } from 'framer-motion';

export default async function MyProfile () {

    return (
        <div className="profile-body">
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
                <div className="profile">
                    <h1 className='profile-page-title'>My Profile</h1>
                    <Profile/>
                </div>
            </motion.div>
        </div>
    );
}