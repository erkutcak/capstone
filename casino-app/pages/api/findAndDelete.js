import prisma from "@/lib/prisma";

module.exports = async (req, res) => {
    const email = req.body.email;
    console.log(req.body);
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            wallet: {
                include: {
                    transactions: true,
                },
            },
        },
    });
    if (user) {
        res.send({ user: user });
        return;
    }
    const deletedUser = await prisma.user.delete({
        data: {
            email: req.body.email,
        }
    });
    res.status(200).send(deletedUser);
};