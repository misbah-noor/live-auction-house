const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWinnerEmail = async (to, auction) => {
  try {
    await transporter.sendMail({
      from: `"Auction House" <${process.env.EMAIL_USER}>`,
      to,
      subject: "🎉 You won the auction!",
      html: `
        <h2>Congratulations 🎉</h2>
        <p>You have won the auction for:</p>
        <h3>${auction.title}</h3>

        <p><strong>Winning Bid:</strong> Rs ${auction.currentPrice}</p>
        <br/>
        
        <p>Thank you for using Auction House 💛</p>
      `,
    });

    console.log("Winner email sent to:", to);
  } catch (error) {
    console.log("Email Error:", error);
  }
};

module.exports = { sendWinnerEmail };