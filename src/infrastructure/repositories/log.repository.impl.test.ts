import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogRepositoryImpl } from './log.repository.impl';
describe('log.repository.impl', () => {
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const logRepository = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('saveLog should call the datasource with arguments ', async () => {
        const log = {
            level: LogSeverityLevel.low,
            message: 'Log email sent',
            origin: 'send-email-logs.ts',
            createdAt: new Date(),
        } as LogEntity;
        await logRepository.saveLog(log);
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
    });
    test('getLogs should call the datasource with arguments ', async () => {
        const logSeverity = LogSeverityLevel.low;
        await logRepository.getLogs(logSeverity);
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(logSeverity);
    });
});