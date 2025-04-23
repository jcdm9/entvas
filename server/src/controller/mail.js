const mailer = require("./../utils/index");
const validator = require("validator");

const sendMail = async (req, res) => {
  const { body, subject, receiver } = req.body;
  if (!validator.isEmail(receiver)) {
    return res.status(401).json({ message: "Email is invalid." });
  }

  const opt = {
    body,
    subject,
    receiver,
  };

  try {
    await mailer.send(opt);
  } catch (e) {
    return res.status(500).json({ message: "Unable to send email." });
  }

  res.json({ message: "Email sent." });
};

module.exports = { sendMail };
