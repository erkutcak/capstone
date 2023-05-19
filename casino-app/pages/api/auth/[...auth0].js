// pages/api/auth/[...auth0].js
import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth({
    async signup(req, res) {
        try {
            const {email} = res.body;
            console.log(`${email} signed up`);

            res.redirect('/api/auth/login?returnTo=/dashboard');
        }

        catch (err) {
            console.log(`${err} signup failed`);
            res.status(500).json({err: 'Error signing up'})
        }
    }
});