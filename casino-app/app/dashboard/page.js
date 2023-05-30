'use client';

import '../styles/dashboard.css';
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect } from "react";
import DailyPrize from '@/components/DailyPrize';
import { motion } from 'framer-motion';
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
    const { user, error, isLoading } = useUser();
    console.log(user);

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
                        delay: 1.5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    >
                    <div className="leaderboard">
                        <h3>Leaderboard</h3>
                    </div>
                </motion.div>
                <motion.div
                    className="box"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1.9,
                        delay: 1.5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    >
                <div className="recently-played">
                    <DailyPrize/>
                </div>
                </motion.div>
            </div>
        </div>
        );
    }

