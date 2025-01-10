import { Server } from "./presentation/server";
import {envs} from './config/pluggins/envs.plugin';
import { MongoDatabase } from "./data/mongo";

(async() => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    Server.start();
    //console.log(envs);
}