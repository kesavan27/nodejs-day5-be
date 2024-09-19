import express from "express";
import { db } from "../Mongodb/mongodbConnection.js";
import randomstring from "randomstring";
import { transport, mailOptions } from "../MailUtils/mailSend.js"
import bcrypt from "bcrypt";

const forgotRouter = express.Router();

const registerCollection = db.collection("Register");

forgotRouter.post("/", async (req, res) => {
    try {
        const data = await registerCollection.findOne({ email: req.body.email });
        if (data != null) {
            const str = randomstring.generate();
            await registerCollection.updateOne({ email: req.body.email }, { $set: { randomString: str } });
            transport.sendMail({
                ...mailOptions,
                to: [req.body.email],
                text: "Click the given link " + `https://password-resetvk.netlify.app//resetpassword/${str}`
            })
            res.send({ message: "Success" });
        } else {
            res.send({ message: "false" });
        }
    } catch (e) {
        res.status(500).send({ message: "Internal server error" });
    }
})


forgotRouter.post("/RandomString", async (req, res) => {
    try {
        console.log(req.body.str);
        const data = await registerCollection.findOne({ randomString: req.body.str });
        if (data != null) {
            await registerCollection.updateOne({ randomString: req.body.str }, { $unset: { randomString: 1 } });
            res.send({ message: "Success" })
        } else {
            res.send({ message: "String not match" })
        }
    } catch (e) {
        res.status(500).send({ message: "Internal server error" })
    }
})


forgotRouter.post("/ResetPassword", async (req, res) => {
    try {
        const data = await registerCollection.findOne({ email: req.body.email });
        if (data) {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    res.status(500).send({ message: "Internal server error" });
                } else {
                    await registerCollection.updateOne({ email: req.body.email }, { $set: { password: hash } })
                    res.send({ message: "Password updated" });
                }
            })
        } else {
            res.send({ message: "User not found" });
        }
    } catch (e) {
        res.status(500).send({ message: "Internal server error" })
    }
})

export default forgotRouter;