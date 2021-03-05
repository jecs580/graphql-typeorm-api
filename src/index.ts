import 'reflect-metadata';
import { connect } from './config/typeorm'
import {startSever} from './app';

async function main() {
    connect();
    const app = await startSever();
    app.listen(4000);
    console.log('Servidor en el puerto 4000');
    
}
main();