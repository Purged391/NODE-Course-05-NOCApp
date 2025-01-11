import nodemailer from 'nodemailer';
import { envs } from '../../config/pluggins/envs.plugin';

export interface SendEmailOptions{
    to: string | string[];
    subject: string;
    html: string;
    atachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService{
    //!DEUDA TECNICA. Deberia ir en el constructor
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor(){}

    async sendEmail(options: SendEmailOptions): Promise<boolean>{
        const {to, subject, html, atachments} = options;
        try{
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: html,
                attachments: atachments,
            });
            return true;
        } catch(e){

            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'NOC Node Project Logs';
        const html = `
            <h3>System logs - NOC</h3>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec pur</p>
            <p>See logs attached</p>
            `;
        const attachments: Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        return this.sendEmail({to, subject, html, atachments: attachments});
    }

}