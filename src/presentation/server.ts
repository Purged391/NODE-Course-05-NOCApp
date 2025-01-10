import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDBDatasource } from "../infrastructure/datasources/mongodb.datasource";
import { PostgresDatasource } from "../infrastructure/datasources/postgres.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
); 
const mongoLogRepository = new LogRepositoryImpl(
    new MongoDBDatasource(),
); 
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresDatasource(),
); 
const emailService = new EmailService();
export class Server{
    public static async start(){
        
        console.log('Server started');

        // new SendEmailLogs(emailService, logRepository).execute(
        //     ['mariodgxiii@gmail.com']
        // );

        const logs = await postgresLogRepository.getLogs(LogSeverityLevel.high);
        console.log(logs);

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                //new CheckService().execute('https://google.com')
                new CheckService(
                    postgresLogRepository,
                    () => console.log(`${url} is ok`),
                    (error) => console.error(error)
                ).execute(url)
            }
        );
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         //new CheckService().execute('https://google.com')
        //         new CheckMultipleService(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log(`${url} is ok`),
        //             (error) => console.error(error)
        //         ).execute(url)
        //     }
        // );
    }
}
