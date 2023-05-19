
import Navbar from "@/components/Navbar";
import '../styles/games.css';

// async function getGames() {
//     const games = await prisma.game.findMany()
//     return games
// }

export default function Games () {
    // const data = await getGames()

    // const showGames = data.map((game) => {
    //     return (
    //         <li key={game.id}>
    //             {game.name}
    //         </li>
    //     )
    // })

    return (
        <div className="games-body">
            <div className="games-cards">
                <ul>
                    test
                </ul>
            </div>
        </div>
    )
}