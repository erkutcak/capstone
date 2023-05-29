import prisma from "@/lib/prisma";
import '../styles/games.css';
import Link from "next/link";
// import { motion } from "framer-motion";

export default async function Games () {
    const data = await prisma.game.findMany()

    const showGames = data.map((game) => {
        return (
            <div className="game-title-card">
                {/* <motion.div> */}
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
                {/* </motion.div> */}
            </div>
        )
    })

    return (
        <div className="games-body">
            <div className="games-cards">
                {showGames}
            </div>
        </div>
    )
}