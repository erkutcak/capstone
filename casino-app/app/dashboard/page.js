'use client';

import '../styles/dashboard.css';
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect } from "react";

export default function Dashboard() {
    const { user, error, isLoading } = useUser();
    console.log(user);

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

