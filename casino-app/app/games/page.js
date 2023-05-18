import prisma from "../../lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import '../styles/games.css';

export default async function Games () {

    return (
        <div>
            <Navbar/>
            <div className="games-body">games</div>
        </div>
    )
}