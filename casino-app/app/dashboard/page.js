'use client';

import '../styles/dashboard.css';
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect } from "react";

async function findOrCreateUser(user) {
    if (!user) return null;
    const response = await fetch("/api/findOrCreate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
        email: user.email,
        username: user.nickname,
        first_name: user.name,
        profile_pic: user.picture,
        }),
    });
    return response.json();
}

export default function Dashboard() {
    const { user, error, isLoading } = useUser();

    useEffect(() => {
    findOrCreateUser(user);
    }, [user]);

    return (
        <div>
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
        );
    }

