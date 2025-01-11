import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe('log.datasource.ts', () => {
    const newLog = new LogEntity({
        origin: 'test',
        message: 'test',
        level: LogSeverityLevel.low,
    });

    class MockLogDatasource implements LogDataSource{
        public async saveLog(log: LogEntity): Promise<void> {
            return
        }
        public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
           return [newLog];
        }

    }
    test('should test the abstract class', async() => {
        const mockLogDataSource = new MockLogDatasource();
        expect(mockLogDataSource).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDataSource.saveLog).toBe('function');
        expect(typeof mockLogDataSource.getLogs).toBe('function');
        await mockLogDataSource.saveLog(newLog);
        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.low);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });
});