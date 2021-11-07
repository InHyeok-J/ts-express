import { Strategy } from "passport-local";
import * as passport from "passport";
import * as bcrypt from "bcrypt";
import User from "../../model/user";

export default () => {
    passport.use(
        "local",
        new Strategy(
            {
                usernameField: "userId",
                passwordField: "password",
            },
            async (email: string, password: string, done) => {
                try {
                    const user = await User.findOne({
                        where: { email },
                    });
                    if (!user) {
                        return done(null, false, {
                            message: " 존재하지 않는 이메일입니다.",
                        });
                    }
                    const result = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (result) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: "비밀번호가 틀렸습니다.",
                        });
                    }
                } catch (err) {
                    console.error(err);
                    done(err);
                }
            }
        )
    );
};
