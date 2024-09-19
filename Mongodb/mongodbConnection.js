import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config();

const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUserName = process.env.DB_USERNAME;
const dbCluster = process.env.DB_CLUSTER;

const cloudUrl = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(cloudUrl);

const db = client.db(dbName);

async function mongoConnection() {
    try {
        await client.connect();
        console.log("Connection successful")
    } catch (e) {
        console.log('Connection failed' + e)
        process.exit(1);
    }
}

export default mongoConnection;
export { client, db }