import prisma from "../../lib/prisma";
import Link from "next/link";

async function getUsers() {
    const users = await prisma.user.findMany()
    console.log(users);
    return users
}

export default async function Dashboard () {
    const data = await getUsers()
    console.log(data);
    return (
        <div>
            <div>dashboard</div>
            <ul>
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
        </a>
        </div>
    )
}

