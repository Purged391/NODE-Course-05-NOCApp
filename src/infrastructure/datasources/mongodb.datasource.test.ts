import mongoose from "mongoose";
import { envs } from "../../config/pluggins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoDBDatasource } from "./mongodb.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import exp from "constants";

describe('mongodb.datasource', () => {
    const logDatasource = new MongoDBDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Log email sent',
        origin: 'send-email-logs.ts',
        createdAt: new Date(),
    });
    beforeAll(async() => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });

    afterEach(async() => {
        await LogModel.deleteMany();
    });

    afterAll(async() => {
        mongoose.connection.close();
    });

    test('should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log');
        await logDatasource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Mongo Log created', expect.any(String));
    });

    test('should get logs', async () => {
        await logDatasource.saveLog(log);
        const logs = await logDatasource.getLogs(LogSeverityLevel.low);
        expect(logs).toHaveLength(1);
        expect(logs[0].level).toBe(LogSeverityLevel.low);
    });
});