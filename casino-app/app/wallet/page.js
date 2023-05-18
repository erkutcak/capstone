import prisma from "../../lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import '../styles/wallet.css';

export default async function Wallet () {
    return (
        <div>
            <Navbar/>
            <div className="wallet-body">Wallet</div>
        </div>
    )
}