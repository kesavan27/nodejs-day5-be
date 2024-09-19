import Express from "express";
import dotenv from "dotenv"
import registerRouter from "./Routing/Register.js";
import mongoConnection from "./Mongodb/mongodbConnection.js";
import forgotRouter from "./Routing/forgotpassword.js";
import cors from "cors"

const server = Express();

server.use(Express.json());

server.use(cors());

dotenv.config();

const port = 8000;

await mongoConnection();

server.use("/Register", registerRouter);
server.use("/ForgotPassword", forgotRouter);

server.listen(port, () => {
    console.log("The server is listerning in port " + port);
})