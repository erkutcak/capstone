import prisma from "@/lib/prisma";

module.exports = async (req, res) => {
  const result = await prisma.user.update({
    where: {
      email: req.query.email,
    },
    data: {
      username: req.body.username,
    },
  });
  res.status(200).send(result);
};