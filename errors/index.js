const { StatusCodes } = require("http-status-codes");
const AuthenticationError = require("./authentication-err");
const BadRequest = require("./bad-request");

module.exports = { customAPIError, AuthenticationError, BadRequest };
