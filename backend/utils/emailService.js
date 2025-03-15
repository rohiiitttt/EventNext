const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // TLS
  secure: false, // Use `true` for port 465 (SSL)
  auth: {
    user: process.env.SMTP_USER, // Ensure the correct variable is used
    pass: process.env.SMTP_PASS,
  },
});

// Test email function
const sendTestEmail = () => {
  const mailOptions = {
    from: process.env.SMTP_USER, // Use the same env variable
    to: "recipient@example.com",
    subject: "Test Email",
    text: "Hello, this is a test email from Nodemailer!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending test email:", error);
    } else {
      console.log("Test email sent successfully:", info.response);
    }
  });
};

// Function to send a generic email
exports.sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER, // Use the same env variable
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.response}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Uncomment to test sending an email
// sendTestEmail();
