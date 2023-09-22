import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { error } from "console";
import { MongoClient } from "mongodb";
import * as config from "../config.json";
import * as content from "../content.json"

//FUNCTION TO READ IN CONFIG HERE 

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { user, password, ipaddress, port, databaseName } = read_mongodb_config(config.mongodb);
  const { name, address } = read_content_config(content.userinfo);

  var connStr = `mongodb://${user}:${password}@${ipaddress}:${port}?retryWrites=true&ssl=false`;
  console.log(connStr);
  var mongoClient = new MongoClient(connStr);
  try {
    const database = await mongoClient.db(databaseName);
    const collection = database.collection(databaseName);
    const obj = { name: name, address: address }
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

function read_mongodb_config(mongodb: { user: string; password: string; ipaddress: string; port: number; databaseName: string; }): { user: any; password: any; ipaddress: any; port: any; databaseName: any; } {
  throw new Error("Function not implemented.");
}
function read_content_config(userinfo: { name: string; address: string; }): { name: any; address: any; } {
  throw new Error("Function not implemented.");
}

