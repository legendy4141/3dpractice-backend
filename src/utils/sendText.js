import nodemailer from "nodemailer";

export const sendText = async ({ who, what, subject, type, fileName }) => {
  if (!who) return "";

  const phone = `${who}@sms.clicksend.com`;

  const from = "robert@3dpractice.com";
  const adminUser = from;

  const transporter = nodemailer.createTransport({
    host: "email-smtp.us-west-2.amazonaws.com",
    port: 587,
    secure: false,
    auth: {
      user: "AKIAT66UKQVZ4AXVU6NO",
      pass: "BL8Nvl7Vg/5ITif4KZ69HmSmKwexYpZHTpNRGIw+06c4",
    },
  });

  const reportLink = type === "video" ? what : `${what}/${fileName}`;

  const mailOptions = {
    from: from,
    to: phone,
    replyTo: from,
    subject: subject,
    html: `<html>
            <body style="font-family:Verdana, sans-serif; font-size:12px; color:#666;">
                <br/>
                <p>Click here to ${
                  type === "video" ? "watch the video: " : "see the report: "
                }
                  <a href="${reportLink}">${
      type === "video" ? "Video link" : "Report link"
    }</a>
              </p>
            </body>
          </html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return "Message sent successfully.";
  } catch (error) {
    console.error(error);
    return error.message;
  }
};
