import { isNotLoggedIn, isLoggedIn } from "./../../middleware/authHandler";
import * as express from "express";
import * as bcrypt from "bcrypt";
import User from "../../model/user";

const router = express.Router();

router.get("/", isLoggedIn, (req, res) => {
    const user = req.user!.toJSON() as User;
    return res.send({ ...user, password: null });
});

router.post("/signin", isNotLoggedIn, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        if (exUser) {
            return res.status(403).send("이미 사용중인 유저 아이디입니다");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
