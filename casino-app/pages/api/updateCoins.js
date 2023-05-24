import prisma from "@/lib/prisma";

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const {updatedBalance} = req.body;
    console.log(req.body);

    try {
        const updatedUser = await prisma.user.update({
        where: { 
            email: req.body.email, 
        },
        data: {
            wallet: {
                update: {
                    balance: updatedBalance,
                },
            },
        },
        include: {
            wallet: true, // Include the wallet data in the updatedUser response
        },
        });

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating coins in the database' });
    }
}