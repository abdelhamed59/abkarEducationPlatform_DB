import { createTransport } from "nodemailer";

const transporter = createTransport({
  service:"gmail",
  auth: {
    user: "abdelhamedelkholy59@gmail.com",
    pass: "erjb oisb fzum kgpk",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(code,email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"hello friend 👻" <abdelhamedelkholy59@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>your otp is ${code}</h1>`, // html body
  });

  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export default sendEmail