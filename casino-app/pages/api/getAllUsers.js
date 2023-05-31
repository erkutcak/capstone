import prisma from "@/lib/prisma";

module.exports = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
        include: {
            wallet: true,
        }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};