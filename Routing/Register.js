import Express from "express";
import { db } from "../Mongodb/mongodbConnection.js";
import bcrypt from "bcrypt";

const registerRouter = Express.Router();

const registerCollection = db.collection("Register");

registerRouter.post("/", async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                res.status(500).send({ message: "Something went wrong", err })
            } else {
                const data = {
                    ...req.body,
                    password: hash
                }
                await registerCollection.insertOne(data);
            }
        })
        res.send({ message: "Data added successfully" });
    } catch (e) {
        res.status(500).send({ message: "Internal server error", e })
    }
})

export default registerRouter;