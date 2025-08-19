import nodemailer from 'nodemailer';

type SendMailSignature = {
  html?: string;
  subject: string;
  text?: string;
  toAddress: string;
};

const MailProvider = () => {
  return {
    sendMail: async (args: SendMailSignature) => {
      const transporter = nodemailer.createTransport({
        auth: {
          pass: process.env.NODEMAILER_PASSWORD,
          user: process.env.NODEMAILER_USER,
        },
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
      });

      return await transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        html: args.html,
        subject: args.subject,
        text: args.text,
        to: args.toAddress,
      });
    },
  };
};

export { MailProvider };
