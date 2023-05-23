import prisma from "@/lib/prisma";
import '../styles/games.css';

export default async function Games () {
    const data = await prisma.game.findMany()

    const showGames = data.map((game) => {
        return (
            <a href={`games/${game.name}`} key={game.id}>
                {game.name}
            </a>
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