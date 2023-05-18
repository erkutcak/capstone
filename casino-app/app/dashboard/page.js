import prisma from "../../lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
// import '../styles/navbar.css';
import '../styles/dashboard.css';

// async function getUsers() {
//     const users = await prisma.user.findMany()
//     return users
// }

export default async function Dashboard () {
    // const data = await getUsers()
    return (
        <div>
            <Navbar/>
            <div className="dash-body">dashboard</div>
            {/* <ul>
                {data.map((user) => {
                    return (
                    <li>
                        {user.username}
                    </li>
                    )
                })}
            </ul>
        <a href="/api/auth/logout">
            <h1>Logout</h1>
        </a> */}
        </div>
    )
}

