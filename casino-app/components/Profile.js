"use client";
import React from "react";
import { useCurrentUser } from "@/app/context/currentUserContext";
import { useUser } from "@auth0/nextjs-auth0/client"
import { Router } from "next/router";

// async function handleDeleteUser(user) {
//     const { user, error, isLoading } = useUser();
//     if (!user) return null; 
//     await fetch("/api/findAndDelete", {
//         method: "DELETE",
//         headers: { 
//             "Content-Type": "application/json" },
//         });
//         alert("Profile deleted.");
// };

export default function Profile() {
    const { currentUser, setCurrentUser } = useCurrentUser();

    return (
        currentUser && (
        <div className="profile-card">
            <img src={currentUser.profile_pic} alt={currentUser.first_name} />
            <h2>Name: {currentUser.first_name}</h2>
            <h3>Username: {currentUser.username}</h3>
            <p>E-mail: {currentUser.email}</p>
            <p>Current Balance: {currentUser.wallet.balance}</p>
            <button className="edit-button">Edit Profile</button>
            <button className="delete-button" onClick={(user) => (handleDeleteUser(user))}>Delete Profile</button>
        </div>
        )
    );
    }