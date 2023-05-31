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
                    transactions: {
                        include: {
                            game: true,
                        }
                    }
                },
            },
        },
    });
    if (user) {
        res.send(user);
        return;
    }
    const createdUser = await prisma.user.create({
        data: {
            email: req.body.email,
            username: req.body.username,
            first_name: req.body.first_name,
            profile_pic: req.body.profile_pic,
            wallet: {
                create: {
                    balance: req.body.balance,
                }
            }
        },
        include: {
            wallet: true,
        },
    });
    res.status(200).send(createdUser);
};
