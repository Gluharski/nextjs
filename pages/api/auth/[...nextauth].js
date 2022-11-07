import bcryptjs from 'bcryptjs';
import nextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

import User from '../../../models/User';
import db from '../../../utils/db';

export default nextAuth({
    seassion: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;

            return token;
        },
        async seassion({ seassion, token }) {
            if (token?._id) seassion.user._id = token._id;
            if (token?._id) seassion.user.isAdmin = token.isAdmin;

            return seassion;
        }
    },

    providers: [
        CredentialProvider({
            async authorize(credentials) {
                await db.connect();

                const user = await User.findOne({
                    email: credentials.email,
                });

                await db.disconnect();

                // check the user and pass together
                if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: 'f',
                        isAdmin: user.isAdmin,
                    };
                }

                throw new Erro('Invalid email or password');
            },
        }),
    ],
});