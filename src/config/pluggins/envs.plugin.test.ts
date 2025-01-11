import { envs } from "./envs.plugin";

describe('envs.plugin', () => {
    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'mariodgxiii@gmail.com',
            MAILER_SECRET_KEY: 'hotybhtlqbgfkpsd',
            PROD: false,
            MONGO_URL: 'mongodb://mariodg:1234567@localhost:27018/',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'mariodg',
            MONGO_PASS: '1234567'
          });
    });

    test('should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';

        try{
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });
});