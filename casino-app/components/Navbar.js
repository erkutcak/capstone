'use client';
import Link from "next/link";
import Image from "next/image";
import React from 'react';
import logo from '../public/logo3.png'
import home from '../public/home.png'
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
                <button className="nav-button">Profile</button>
            </Link>
            <Link href={'/mywallet'}>
                <button className="nav-button">Wallet</button>
            </Link>
            <Link href={'/about'}>
                <button className="nav-button">About</button>
            </Link>
            <a href="/api/auth/logout">
                <button className="Btn">
                    <div className="sign"><svg className='logouticon' viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                    <div className="text">Logout</div>
                </button>
            </a>
            <div className="navbar-balance">
            💰{currentUser.wallet.balance}
            </div>
        </div>
    ))}