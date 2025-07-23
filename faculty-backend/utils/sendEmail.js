import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ Connection error:", error);
  } else {
    console.log("✅ Server is ready to take messages");
  }
});

export const sendStudentCredentials = async (to, userId, password) => {
  const mailOptions = {
    from: `"ProfileX" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Your Student Login Credentials',
    html: `
      <h1 style="color: black;">Welcome to Faculty Portal 🎓</h1>
      <h2 style="color: black;">You've been approved! 🎉 </h2>
      <p style="color: black;">
        <span style="font-weight: bold;">User ID (Roll No):</span> ${userId}
      </p>
      <p style="color: black;">
        <span style="font-weight: bold;">Temporary Password:</span> ${password}
      </p>
      <p style="color: black;">
        Please log in and update your password after first login.
      </p>
      <hr style="margin: 20px 0;" />
      <p style="color: grey; font-size: 12px;">
        If you didn't request this, please ignore this email.
        <br />
        Sent by ProfileX Team
      </p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to", to);
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
};
