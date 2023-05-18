import prisma from "../../lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import '../styles/games.css';

async function getGames() {
    const games = await prisma.game.findMany()
    return games
}

export default async function Games () {
    const data = await getGames()

    const showGames = data.map((game) => {
        return (
            <li>
                {game.name}
            </li>
        )
    })

    return (
        <div className="games-body">
            <Navbar/>
            <div className="games-cards">
                <ul>
                    {showGames}
                </ul>
            </div>
        </div>
    )
}