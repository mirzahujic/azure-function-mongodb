import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { error } from "console";
import { MongoDbRepository } from "../Infrastructure/MongoDbRepository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  var repository = new MongoDbRepository()
  try {
    await repository.PostDataToDb();
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
