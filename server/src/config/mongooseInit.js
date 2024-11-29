import { connect } from 'mongoose';
import { LocalDB_URL } from './constants.js';

export default async function mongooseInit() {
    try {
        await connect(LocalDB_URL, { dbName: 'Vestidor'});
    
        console.log('Successfully connect to DB!');  
    } catch (error) {
        console.log("Failed to connect to DB!");
        console.log(error.message);
    };
};
