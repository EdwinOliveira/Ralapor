import nodemailer from "nodemailer";

type SendMailSignature = {
	toAddress: string;
	subject: string;
	text?: string;
	html?: string;
};

const MailProvider = () => {
	return {
		sendMail: async (args: SendMailSignature) => {
			const transporter = nodemailer.createTransport({
				host: "smtp.ethereal.email",
				port: 587,
				secure: false,
				auth: {
					user: process.env.NODEMAILER_USER,
					pass: process.env.NODEMAILER_PASSWORD,
				},
			});

			return await transporter.sendMail({
				from: process.env.NODEMAILER_USER,
				to: args.toAddress,
				subject: args.subject,
				text: args.text,
				html: args.html,
			});
		},
	};
};

export { MailProvider };
