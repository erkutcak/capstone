'use client';

import { motion } from 'framer-motion';
import '../styles/games.css';
import AllGames from "@/components/AllGames";

export default async function Games () {

    return (
        <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
        }}
        >
            <div className="games-body">
                <AllGames/>
            </div>
        </motion.div>
    )
}