import { MongoClient } from "mongodb";

const mongo_db_user: string = process.env["MONGO_DB_USER"] as string;
const mongo_db_password: string = process.env["MONGO_DB_PASSWORD"] as string;
const mongo_db_ip: string = process.env["MONGO_DB_IP"] as string;
const mongo_db_port: string = process.env["MONGO_DB_PORT"] as string;
const mongo_db_name: string = process.env["MONGO_DB_NAME"] as string;

export class MongoDbRepository {

  GetConnectionString(): string {
    return `mongodb://${mongo_db_user}:${mongo_db_password}@${mongo_db_ip}:${mongo_db_port}?retryWrites=true&ssl=false`;
  }

  GetDbName(): string {
    return mongo_db_name;
  }

  async GetDataFromDb(): Promise< Array<object> > {
    const connection_string = this.GetConnectionString();
    const db_name = this.GetDbName();
    console.log(connection_string);
    const db_client = new MongoClient(connection_string);
    const database = db_client.db(db_name);
    const collection = database.collection(db_name);
    const data = await collection.find({}).limit(10).toArray();
    // console.log("##### IN GET DATA MONGODBREPOSITORY #####")
    // console.log(data)
    return data;
  }

  async PostDataToDb(): Promise<void> {
    const connection_string = this.GetConnectionString();
    const db_name = this.GetDbName();
    console.log(connection_string);
    const db_client = new MongoClient(connection_string);
    const database = db_client.db(db_name);
    const collection = database.collection(db_name);
    const obj = { name: "abc", address: "some-address" }
    // console.log("##### IN POST DATA MONGODBREPOSITORY #####")
    // console.log(obj)
    collection.insertOne(obj);
  }
}