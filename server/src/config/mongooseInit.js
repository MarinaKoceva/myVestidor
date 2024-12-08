import { connect } from 'mongoose';
import { LocalDB_URL } from './constans.js';

export default async function mongooseInit() {
    try {
        await connect(LocalDB_URL, { dbName: 'Vestidor'});
    
        console.log('Successfully connect to DB!');  
    } catch (error) {
        console.log("Failed to connect to DB!");
        process.exit(1);//Промених го директно да спира съвръра ако не може да се свърже с базата данни
    };
};
