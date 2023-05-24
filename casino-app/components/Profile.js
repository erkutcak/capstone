"use client";
import React from "react";
import { useCurrentUser } from "@/app/context/currentUserContext";
import DeleteProfile from "./DeleteProfile";

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
            <DeleteProfile/>
        </div>
        )
    );
    }