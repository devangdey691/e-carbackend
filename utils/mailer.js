const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: (process.env.EMAIL_PASS || "").replace(/\s+/g, ""),
    },
});

transporter.verify((error) => {
    if (error) {
        console.log("SMTP Error:", error);
    } else {
        console.log("SMTP Ready");
    }
});

const sendMail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to,
            subject,
            html,
        });

        console.log("Email Sent Successfully");
        return true;
    } catch (error) {
        console.error("Email send failed:", error);
        return false;
    }
};

module.exports = { sendMail };