import prisma from "../../lib/prisma";


async function main() {
    const users = await prisma.user.findMany()
    const data = await users
    console.log(users);
    return data
}

export default async function Dashboard () {
    const data = await main()
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
        </div>
    )
}

