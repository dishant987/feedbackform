import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hased token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "Resent Email") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }

    let transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "tankdishant2003@gmail.com",
        pass: "wpvaawzxegnjlydu",
        //TODO: add these credentials to .env file
      },
    });

    const mailOptions = {
      from: "tankdishant2003@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" || "Resent Email"
          ? "Verify your email"
          : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);

    return mailresponse;
  } catch (error) {
    console.log(error);
  }
};
