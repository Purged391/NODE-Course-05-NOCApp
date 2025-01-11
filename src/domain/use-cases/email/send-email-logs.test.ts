import { create } from "domain";
import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe('send-email-logs', () => {
    
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true),
    };
    const mockLogRespository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRespository,
    );

    beforeEach(() => {  
        jest.clearAllMocks();
    });

    test('should call send email and savelog', async () => {
        const result = await sendEmailLogs.execute('mariodgxiii@gmail.com');
        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRespository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRespository.saveLog).toHaveBeenCalledWith({
            level: 'low',
            message: 'Log email sent',
            origin: 'send-email-logs.ts',
            createdAt: expect.any(Date),
        });       
    });
    test('should log in case of error', async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValueOnce(false);
        const result = await sendEmailLogs.execute('mariodgxiii@gmail.com');
        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRespository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRespository.saveLog).toHaveBeenCalledWith({
            level: 'high',
            message: 'Error: Email not sent',
            origin: 'send-email-logs.ts',
            createdAt: expect.any(Date),
        });       
    });
});