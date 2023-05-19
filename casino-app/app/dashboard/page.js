'use client';

import Navbar from "@/components/Navbar";
import '../styles/dashboard.css';
import {useUser} from "@auth0/nextjs-auth0/client"
import { useEffect } from "react";

export default async function Dashboard () {
    const { user, error, isLoading } = useUser();
    const findUser = () => {
        console.log(user);
        if (user) {
            fetch("/api/findOrCreate", {
                method: "POST",
                body: JSON.stringify({
                    email: user.email,
                    username: user.nickname,
                    first_name: user.name,
                    profile_pic: user.picture,
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            })
            .then((resp) => resp.json())
            .then((data) => data);
        }
    };
    useEffect(() => {
        findUser();
    }, [user]);

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

