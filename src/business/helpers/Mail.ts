import nodemailer from 'nodemailer';
import { MailGateway } from '../gateways/MailGateway';

export class Mail implements MailGateway {
  private transpoter = nodemailer.createTransport({
    host:  process.env.HOST_SMTP,
    port: Number(process.env.PORT_SMTP) || 0,
    secure: false,
    auth: {
      user: process.env.LOGIN_SMTP,
      pass: process.env.PASSWORD_SMTP,
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  private from: string = "Cartolol <cartolol.suporte@gmail.com"

  public async send(text: string, subject: string, to: Array<string>, html: string): Promise<void>{
    try {
      await this.transpoter.sendMail({
        text,
        subject,
        from: this.from,
        to,
        html
      })
    } catch(err){
      console.error(err);
    }
  }
}
