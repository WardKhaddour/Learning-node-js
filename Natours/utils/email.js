const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1) Create a transporter
  /*
  EMAIL_USERNAME=b448c404129778
EMAIL_PASSWORD=c2e92242300641
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=465
  */
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //Activate in gmail "less secure app" option
  });
  //2)define the email options
  const mailOptions = {
    from: 'Ward Khaddour <ward@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,

    // html:
  };
  //3)Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
