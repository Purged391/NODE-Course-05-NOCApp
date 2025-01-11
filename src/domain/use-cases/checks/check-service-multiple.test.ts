import { LogEntity } from "../../entities/log.entity";
import { CheckMultipleService } from "./check-service-multiple";

describe('check-service-multiple', () => {
    const mock1Repository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mock2Repository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mock3Repository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkService = new CheckMultipleService(
        [mock1Repository, mock2Repository, mock3Repository],
        successCallback, 
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch return true', async() => {

        const wasOk = await checkService.execute('https://google.com');
        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mock1Repository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mock2Repository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mock3Repository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
    test('should call errorCallback when fetch return false', async() => {

        const wasOk = await checkService.execute('https://golkjhlkjhogle.com');
        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(mock1Repository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mock2Repository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mock3Repository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
});