import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

async function handle(req, res) {
    const { user } = getSession(req, res);

    try {
        res.status(200).json({
        session: "true",
        id: user.sub,
        nickname: user.nickname,
        });
    } catch (e) {
        res.status(500).json({ error: "Unable to fetch", description: e });
    }
    }

export default withApiAuthRequired(handle);