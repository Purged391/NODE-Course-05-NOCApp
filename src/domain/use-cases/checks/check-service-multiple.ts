import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckMultipleServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void | undefined);
type ErrorCallback = ((error: string) => void | undefined); 

export class CheckMultipleService implements CheckMultipleServiceUseCase {
    
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) {}
    
    private callLogs(log: LogEntity){
        this.logRepository.forEach((repository) => {
            repository.saveLog(log);
        });
    }

    public async execute(url: string): Promise<boolean> {
        try{
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Service ${url} is working`,
                origin: 'check-service.ts',
            });
            this.callLogs(log);
            this.successCallback && this.successCallback();
            return true;
        } catch(e){
            const errorMessage = `${e}`;
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: errorMessage,
                origin: 'check-service.ts',
            });
            this.callLogs(log);           
            this.errorCallback && this.errorCallback(`${e}`);
            return false;
        }
    }
}