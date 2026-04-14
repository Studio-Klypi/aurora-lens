import nodemailer from "nodemailer";
import type { SendMailOptions } from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

class EmailsService {
  private get transporter() {
    const config = useRuntimeConfig();
    return nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  async send(options: EmailOptions): Promise<void> {
    const config = useRuntimeConfig();

    const mailOptions: SendMailOptions = {
      from: config.smtp.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

const EmailService = new EmailsService();
export default EmailService;
