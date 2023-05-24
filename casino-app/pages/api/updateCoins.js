import prisma from "@/lib/prisma";

module.exports = async (req, res) => {

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
            wallet: true,
        },
        });

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating coins in the database' });
    }
}