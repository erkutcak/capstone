import prisma from "@/lib/prisma";
import '../styles/games.css';
import Link from "next/link";

export default async function Games () {
    const data = await prisma.game.findMany()

    const showGames = data.map((game) => {
        return (
            <Link 
                href={{
                    pathname: `games/${game.name}`,
                    query:{id: game.id}
                
                }} 
                key={game.id}
            >
                {game.name}
            </Link>
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