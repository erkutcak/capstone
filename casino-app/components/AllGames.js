"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AllGames() {

    const [games, setGames] = React.useState([]);

    React.useEffect(() => {
        fetch("../api/getAllGames")
        .then((res) => res.json())
        .then((game) => setGames(game));
    }, []);

    const showGames = games.map((game) => {
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
            <div className="game-title-card">
                    <Link 
                        href={{
                            pathname: `games/${game.name}`,
                            query:{id: game.id}
                            
                        }} 
                        key={game.id}
                    >
                        <img className='game-image' src={game.image} alt="game-image" />
                        <h1 className="game-title">{game.name}</h1>
                        <p className="game-bio">{game.bio}</p>
                        <button className="cssbuttons-io-button"> PLAY!
                        <div className="icon">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                        </div>
                        </button>
                    </Link>
            </div>
                </motion.div>
        )
    })

    return (
            <div className="games-cards">
                {showGames}
            </div>
    )
}