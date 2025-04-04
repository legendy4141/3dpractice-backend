import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export const sendEmail = async ({ who, what, subject, type, fileName }) => {
  if (!who) return "";

  const from = "support@3dpracticecloud.com";
  const adminuser = "admin@3dpracticecloud.com";

  const transporterConfig = {
    host: "email-smtp.us-west-2.amazonaws.com",
    port: 587,
    secure: false,
    auth: {
      user: "AKIAT66UKQVZ4AXVU6NO",
      pass: "BL8Nvl7Vg/5ITif4KZ69HmSmKwexYpZHTpNRGIw+06c4",
    },
  };

  const transporter = nodemailer.createTransport(transporterConfig);

  const mailOptions = {
    from: `${adminuser} <${from}>`,
    to: who,
    replyTo: from,
    subject: subject,
    html:
      type === "exercise" || type === "careplan"
        ? `<p>${what}</p>`
        : `<p>Click here to watch the video: <a href=${what}>Video link</a></p>`,
  };

  if (type === "exercise") {
    try {
      // Resolve the full path to the file in the public directory
      const filePath = path.resolve("public/reports/exercise", fileName);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath); // Read the file content

        mailOptions.attachments = [
          {
            filename: fileName,
            content: fileContent,
          },
        ];
      } else {
        console.error("File does not exist:", filePath);
        return "File not found.";
      }
    } catch (fileError) {
      console.error("Error reading the file:", fileError);
      return "Error reading the file.";
    }
  } else if (type === "careplan") {
    try {
      // Resolve the full path to the file in the public directory
      const filePath = path.resolve("public/reports/careplan", fileName);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath); // Read the file content

        mailOptions.attachments = [
          {
            filename: fileName,
            content: fileContent,
          },
        ];
      } else {
        console.error("File does not exist:", filePath);
        return "File not found.";
      }
    } catch (fileError) {
      console.error("Error reading the file:", fileError);
      return "Error reading the file.";
    }
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    return `Email sent: ${info.messageId}`;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};
