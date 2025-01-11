import { set } from "mongoose";
import { CronService } from "./cron-service";
import exp from "constants";

describe('cron-service', () => {

    const mockTick = jest.fn();

    test('should create a cron job', (done) => {
        const job = CronService.createJob('* * * * * *', mockTick);
        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(2);
            job.stop();
            done();
        }, 2000);  
    });
});