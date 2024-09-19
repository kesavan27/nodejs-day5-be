import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gvkesavan27@gmail.com",
        pass: process.env.GMAIL_PASSWORD
    }
});


const mailOptions = {
    from: "gvkesavan27@gmail.com",
    to: [],
    subject: "Password Reset Link",
    text: ""
};


export { transport, mailOptions };