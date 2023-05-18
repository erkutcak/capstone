"use client";

import Navbar from "@/components/Navbar";
import '../styles/profile.css';
import { useUser } from "@auth0/nextjs-auth0/client";

export default async function MyProfile () {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        user && (
        <div className="profile-body">
            <Navbar/>
            <div className="profile">
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        </div>
    )
    );
}