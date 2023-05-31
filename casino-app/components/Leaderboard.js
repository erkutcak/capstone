"use client";
import React from "react";
import '../app/styles/wallet.css'
import { useCurrentUser } from "@/app/context/currentUserContext";

export default function Leaderboard() {

    const [leaderboard, setLeaderboard] = React.useState([]);
    const { currentUser, setCurrentUser } = useCurrentUser();

    React.useEffect(() => {
        fetch("../api/getAllUsers")
        .then((res) => res.json())
        .then((user) => setLeaderboard(user));
    }, []);

    const topList = leaderboard
        .sort((a, b) => b.wallet.balance - a.wallet.balance)
        .slice(0, 10);

        console.log(topList);
        console.log(leaderboard)
        return (
            <div>
            <ul>
                {topList.map((user) => (
                    <li key={user.id}>
                        {user.username} | 💰{user.wallet.balance}
                    </li>
                ))}
            </ul>
        </div>
        )
    }