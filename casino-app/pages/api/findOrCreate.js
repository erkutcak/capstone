import prisma from "@/lib/prisma";

module.exports = async (req, res) => {
    const email = req.body.email;
    console.log(req.body);
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (user) {
        res.send({ user: user });
    }
    const createdUser = await prisma.user.create({
        data: {
            email: req.body.email,
            username: req.body.username,
            first_name: req.body.first_name,
            profile_pic: req.body.profile_pic,
        },
    });
    res.status(200).send(createdUser);
};
