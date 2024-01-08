import { cleanEnv, str, port } from "envalid";

// ensures that env varible are not undefined
export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
});
