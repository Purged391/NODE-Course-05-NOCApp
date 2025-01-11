import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('log.entity.test.ts', () => {
    const dataObject = {
        origin: 'test',
        message: 'test',
        level: LogSeverityLevel.low,
    };
    test('should create a LogEntity instance', () => {
        const log = new LogEntity(dataObject);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObject.message);
        expect(log.level).toBe(dataObject.level);
        expect(log.origin).toBe(dataObject.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from json', () => {
        const json = `{ "origin": "test", "message": "test", "level": "low", "createdAt": "2021-09-01T00:00:00.000Z" }`;
        const log = LogEntity.fromJson(json);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('test');
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe('test');
        expect(log.createdAt).toBeInstanceOf(Date);
    });


    test('should create a LogEntity instance from object', () => {
        const log = LogEntity.fromObject(dataObject);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObject.message);
        expect(log.level).toBe(dataObject.level);
        expect(log.origin).toBe(dataObject.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
});