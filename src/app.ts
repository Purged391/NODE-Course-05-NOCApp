import { Server } from "./presentation/server";
import {envs} from './config/pluggins/envs.plugin';

(async() => {
    main();
})();

function main() {
    //Server.start();
    console.log(envs);
}