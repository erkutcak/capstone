"use client";
import React from "react";
import { useCurrentUser } from "@/app/context/currentUserContext";
import DeleteProfile from "./DeleteProfile";
import EditProfile from "./EditProfile";
import { motion } from "framer-motion";

export default function Profile() {
    const { currentUser, setCurrentUser } = useCurrentUser();

    return (
        currentUser && (
        <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
        }}
        >
            <div className="profile-container">
                <div className="info-container">
                    <div className="profile-img-container">
                        <img className="profile-img" src={currentUser.profile_pic} alt={currentUser.first_name} />
                    </div>
                    <div className="profile-card">
                        <div className="profile-left">
                            <h2 className="profile-title" >Name:</h2>
                            <h2 className="profile-info" >{currentUser.first_name}</h2>
                            <h3 className="profile-title" >Username:</h3>
                            <h3 className="profile-info" >{currentUser.username}</h3>
                        </div>
                        <div className="profile-right">
                            <p className="profile-title" >E-mail:</p>
                            <p className="profile-email" >{currentUser.email}</p>
                            <p className="profile-title" >Current Balance:</p>
                            <p className="profile-info" >💰 {currentUser.wallet.balance}</p>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <EditProfile/>
                    <DeleteProfile/>
                </div>
            </div>
        </motion.div>
        )
    );
    }