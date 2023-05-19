'use client';
import Link from "next/link";
import Image from "next/image";
import React from 'react';
import logo from '../public/logo3.png'
import '../app/styles/navbar.css'

export default async function Navbar () {

    return (
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
            <Link href="/wallet">
                <button className="nav-button">Wallet</button>
            </Link>
            <a href="/api/auth/logout?returnTo=/">
                <button className="nav-button">Logout</button>
            </a>
        </div>
    )}