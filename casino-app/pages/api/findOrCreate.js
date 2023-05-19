import prisma from "@/lib/prisma";

module.exports = async (req, res) => {
    const email = req.body.email
    const findUser = await prisma.user.findUnique({
        where: {
            email: email
        },
    });

    if (findUser) {
        res.send({user: findUser})
    } else {
        const newUser = await prisma.user.create ({
            data: {
                username: req.body.username,
                first_name: req.body.first_name,
                email: req.body.email,
                profile_pic: req.body.profile_pic
            },
        });
        res.send({user: newUser});
    }
}
