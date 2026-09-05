import { ContentfulStatusCode } from "hono/utils/http-status";

export class ApiError extends Error {
  statusCode: ContentfulStatusCode;
  errors: {
    path: string;
    message: string;
  }[];
  code?: string;
  isOperational = true;

  constructor(
    statusCode: ContentfulStatusCode,
    message: string,
    errors: { path: string; message: string }[] = [],
    code?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.code = code;
  }

  static badRequest(message: string, errors?: ApiError["errors"]) {
    return new ApiError(400, message, errors, "BAD_REQUEST");
  }

  static notFound(message = "Not found") {
    return new ApiError(404, message, [], "NOT_FOUND");
  }

  static unAuthorized(message = "Un Authorized") {
    return new ApiError(403, message, [], "UN_AUTHORIZED");
  }
  static internalServerError(message = "Internal Sever Error") {
    return new ApiError(500, message, [], "INTERNAL_SERVER_ERROR");
  }
  static conflict(message = "conflict") {
    return new ApiError(409, message, [], "CONFLICT");
  }
}
