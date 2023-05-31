'use client';
import Link from "next/link";
import Image from "next/image";
import React from 'react';
import logo from '../public/logo3.png'
import '../app/styles/navbar.css'
import { useUser } from "@auth0/nextjs-auth0/client";
import { useCurrentUser } from "@/app/context/currentUserContext";

export default function Navbar () {

    const { user, error, isLoading } = useUser();
    const { currentUser } = useCurrentUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!user)
    return (null);



    return (
        currentUser && (
        <div className="navbar">
            <div className='logo-container'>
                <Image className='logo' src={logo} alt='high roller logo'/>
            </div>
            <Link href='/dashboard'>
                <button className="nav-button">Home</button>
            </Link>
            <Link href='/games'>
                <button className="nav-button">Games</button>
            </Link>
            <Link href='/myprofile'>
                <button className="nav-button">My Profile</button>
            </Link>
            <Link href={'/mywallet'}>
                <button className="nav-button">Wallet</button>
            </Link>
            <Link href={'/about'}>
                <button className="nav-button">About</button>
            </Link>
            <a href="/api/auth/logout">
                <button className="nav-button">Logout</button>
            </a>
            <div className="navbar-balance">
            💰{currentUser.wallet.balance}
            </div>
        </div>
    ))}