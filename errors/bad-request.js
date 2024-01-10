import customAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class BadRequest extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
