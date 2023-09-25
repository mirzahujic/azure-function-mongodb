import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoDbRepository } from "../Infrastructure/MongoDbRepository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> { 
  
  var repository = new MongoDbRepository;
  try {
    var result = await repository.GetDataFromDb();
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