const nodemailer = require("nodemailer");

const send = async (opt) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2",
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `<${process.env.EMAIL_USER}>`,
    to: opt.receiver,
    subject: opt.subject,
    html: opt.body,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    }
    console.log("Email sent:", info.response);
    return true;
  });
};

module.exports = { send };
