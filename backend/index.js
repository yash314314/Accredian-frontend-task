const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");
dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
      },
})

app.post("/referral",async(req,res)=>{
    try{
        const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;
        if(!referrerName || !referrerEmail || !refereeEmail || !refereeName){
            return res.status(400).json({ error: "All fields are required" });
        }
        const ref = await prisma.referral.create({data: { referrerName, referrerEmail, refereeName, refereeEmail },})
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: refereeEmail,
            subject: "You've Been Referred!",
            text: `Hello ${refereeName},\n\n${referrerName} has referred you! Join now and earn rewards!`,
          };
          await transporter.sendMail(mailOptions)

    res.status(201).json({ message: "Referral submitted & email sent!", referral:ref });
    }
    catch(error){
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
} );
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));