import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { error } from "console";
import { MongoClient } from "mongodb";
require ('dotenv').config()

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const mongo_db_user = process.env["MONGO_DB_USER"];
  const mongo_db_password = process.env["MONGO_DB_PASSWORD"];
  const mongo_db_ip = process.env["MONGO_DB_IP"];
  const mongo_db_port = process.env["MONGO_DB_PORT"];
  const mongo_db_name = process.env["MONGO_DB_NAME"];
  
  var connStr = `mongodb://${mongo_db_user}:${mongo_db_password}@${mongo_db_ip}:${mongo_db_port}?retryWrites=true&ssl=false`;
  console.log(connStr);
  var mongoClient = new MongoClient(connStr);
  try {
    const database = await mongoClient.db(mongo_db_name);
    const collection = database.collection(mongo_db_name);
    const obj = { name: "name", address: "address" }
    const res = collection.insertOne(obj);
    context.res = {
      'status': 201,
      'headers':{            
        'content-type': "application/json"
      },
    } 
  } 
  catch(err) {
    context.res = {
      'status': 500,
      'headers':{
        'content-type': "application/json"
      },
      'body':{
        'message': error.toString()
      }
    }
  }
};

export default httpTrigger;
