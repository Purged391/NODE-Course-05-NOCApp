import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository{
    
    constructor(
        private readonly logDatasource: LogDataSource,
    ){}

    public async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log);
    }
    public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

}