import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import "source-map-support/register";
import { getUserIdFromJwt } from "../../auth/utils";
import { createLogger } from "../../utils/logger";

const logger = createLogger("http");
const docClient = new DynamoDB.DocumentClient();
const CAR_TABLE = process.env.CAR_TABLE;

/**
 * Get all cars (that have been loaned) for a user
 * @param event
 */
export const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  logger.info(`Received request to delete car`);

  try {
    logger.info("Getting user id from JWT");
    const ownerId = getUserIdFromJwt(event);
    const carId = event.pathParameters.carId;

    const params = {
      TableName: CAR_TABLE,
      Key: {
        carId,
        ownerId // prevents user from deleting someone else's car
      }
    };

    logger.info(`Deleting car ${carId} for owner ${ownerId}`);
    const response = await docClient.delete(params).promise();
    logger.info("completed", { response });

    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*"
      },
      body: null
    };
  } catch (e) {
    // Return FAIL
    logger.error("Unable to delete Car", { e });
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*"
      },
      body: null
    };
  }
};
