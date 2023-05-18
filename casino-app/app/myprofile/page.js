import prisma from "../../lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import '../styles/profile.css';

export default async function MyProfile () {
    return (
        <div>
            <Navbar/>
            <div className="profile-body">my profile</div>
        </div>
    )
}