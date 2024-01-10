import customAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";
class AuthenticationError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default AuthenticationError;
