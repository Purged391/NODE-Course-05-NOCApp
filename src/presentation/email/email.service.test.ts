import { EmailService, SendEmailOptions } from "./email.service";
import nodemailer from 'nodemailer';
describe('email-service', () => {   

    const emailService = new EmailService();
    const mockSenMail = jest.fn();
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSenMail,
    });

    test('should send email', async () => {
        const options : SendEmailOptions = {
            to: 'mariodgxiii@gmail.com',
            subject: 'TEST',
            html: '<h1>TEST</h1>',
        };
        await emailService.sendEmail(options);
        expect(mockSenMail).toHaveBeenCalledWith({
            atachments: expect.any(Array),
            html: '<h1>TEST</h1>',
            subject: 'TEST',
            to: 'mariodgxiii@gmail.com',
        });

    });

    test('should send email with attachments', async () => {
        const email = 'mariodgxiii@gmail.com';
        await emailService.sendEmailWithFileSystemLogs(email);
        expect(mockSenMail).toHaveBeenCalledWith({
            atachments: expect.arrayContaining([
                {filename: 'logs-all.log', path: './logs/logs-all.log'},
                {filename: 'logs-high.log', path: './logs/logs-high.log'},
                {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            ]),
            html: expect.any(String),
            subject: 'NOC Node Project Logs',
            to: email,
        });
    });
});