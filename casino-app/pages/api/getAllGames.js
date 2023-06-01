import prisma from "@/lib/prisma";

module.exports = async (req, res) => {
  try {
    const games = await prisma.game.findMany();
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};