import prisma from "../../lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import '../styles/dashboard.css';

export default async function Dashboard () {
    return (
        <div>
            <Navbar/>
            <h1 className="dash-title">My Dashboard</h1>
            <div className="dash-body">
                <div className="recently-played">
                    <h3>Recently Played Games</h3>
                </div>
                <div className="recent-transactions">
                    <h3>Recent Transactions</h3>
                </div>
                <div className="leaderboard">
                    <h3>Leaderboard</h3>
                </div>
            </div>
        </div>
    )
}

