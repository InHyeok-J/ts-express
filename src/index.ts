import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as passport from "passport";
import * as hpp from "hpp";
import * as helmet from "helmet";
import env from "./config";
import { sequelize } from "./model";

const app = express();
const prod: boolean = process.env.NODE_ENV === "production";
sequelize
    .sync({
        force: false,
    })
    .then(() => {
        console.log("DB 성공");
    })
    .catch((err: Error) => {
        console.error(err);
        console.error("DB 연결 실패");
    });

if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan("combined"));
    app.use(
        cors({
            origin: "url...",
            credentials: true,
        })
    );
} else {
    app.use(morgan("dev"));
    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    );
}
app.use("/", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        secret: env.COOKIE_SECRET!,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res, next) => {
    res.send("서버 동작중...");
});

export default app;
