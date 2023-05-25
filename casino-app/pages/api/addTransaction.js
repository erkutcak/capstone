import prisma from "@/lib/prisma";

module.exports = async (req, res) => {

    console.log(req.body);
    const amount = req.body.amount
    const walletId = req.body.walletId
    const gameId = req.body.gameId

    try {
        const transaction = await prisma.transaction.create({
        data: {
            amount,
            wallet: {connect:{id: walletId}},
            game: {connect:{id: parseInt(gameId)}},
        },
        });

        return res.status(200).json({ success: true, transaction });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}