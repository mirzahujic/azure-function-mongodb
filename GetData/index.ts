import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoClient } from "mongodb";
import * as config from "../config.json";

const { user, password, ipaddress, port, databaseName } = config.mongodb;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  var connStr = `mongodb://${user}:${password}@${ipaddress}:${port}?retryWrites=true&ssl=false`;
  console.log(connStr);
  var mongoClient = new MongoClient(connStr);
  try {
    const database = await mongoClient.db(databaseName);
    const collection = database.collection(databaseName);
    const result = await collection.find({}).limit(10).toArray();
    context.res = {
      "headers": {
        "content-type" : "application/json"
      },
      "body": result
    }
  } 
  catch(error) {
    context.res = {
      "status": 500,
      "headers": {
        "Content-Type": "application/json"
      },
      "body": {
        "message": error.toString()
      }
    }
  }
};

export default httpTrigger;