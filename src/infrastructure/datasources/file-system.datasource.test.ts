import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('file-system.datasource', () => {
    const logPath = path.join(__dirname, '../../../logs');
    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });

    test('should create logs files if they do not exists', () => {
       new FileSystemDataSource();
       const files = fs.readdirSync(logPath);
         expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
    });
    test('should save a log in logs-all file', () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'Log email sent',
            origin: 'send-email-logs.ts',
            createdAt: new Date(),
        });
        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
    });
    test('should save a log in logs-all and logs-medium file', () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'Log email sent',
            origin: 'send-email-logs.ts',
            createdAt: new Date(),
        });
        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });
    test('should save a log in logs-all and logs-high file', () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'Log email sent',
            origin: 'send-email-logs.ts',
            createdAt: new Date(),
        });
        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });

    test('should return all logs', async() => {
        const logDataSource = new FileSystemDataSource();
        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'Log email sent',
            origin: 'send-email-logs.ts',
            createdAt: new Date(),
        });
        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'Log email sent',
            origin: 'send-email-logs.ts',
            createdAt: new Date(),
        });
        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'Log email sent',
            origin: 'send-email-logs.ts',
            createdAt: new Date(),
        });
        await logDataSource.saveLog(logLow);
        await logDataSource.saveLog(logMedium);
        await logDataSource.saveLog(logHigh);
        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);
        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
    });

    test('should not throw an error if path exists', () => {
        new FileSystemDataSource();
        new FileSystemDataSource();

        expect(true).toBe(true);
    });

    test('should throw an error if severity level is not implemented', async() => {
        const logDataSource = new FileSystemDataSource();
        const customSeverity = 'not-implemented' as LogSeverityLevel;
        try {
            await logDataSource.getLogs(customSeverity);
            expect(true).toBe(false);
        } catch (error) {
            const errorString = `${error}`;
            expect(errorString).toContain(`${customSeverity} not implemented`);
        }
    });
});