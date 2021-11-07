import app from ".";
import env from "./config";

app.listen(env.PORT, () => {
    console.log("서버 시작", app.get("port"));
});
