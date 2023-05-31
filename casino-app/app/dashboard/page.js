'use client';

import '../styles/dashboard.css';
import DailyPrize from '@/components/DailyPrize';
import Leaderboard from '@/components/Leaderboard';
import { motion } from 'framer-motion';

export default function Dashboard() {

    return (
        <div>
            <h1 className="dash-title">My Dashboard</h1>
            <div className="dash-body">
                <motion.div
                    className="box"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1.9,
                        delay: .5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    >
                    <div className="leaderboard">
                        <h3 className='daily-win-title'>Leaderboard</h3>
                        <Leaderboard/>
                    </div>
                </motion.div>
                <motion.div
                    className="box"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1.9,
                        delay: .5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    >
                <div className="recently-played">
                    <h1 className='daily-win-title'>Hit the red button to win coins!</h1>
                    <DailyPrize/>
                </div>
                </motion.div>
            </div>
        </div>
        );
    }

