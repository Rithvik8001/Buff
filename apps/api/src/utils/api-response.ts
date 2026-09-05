import { ContentfulStatusCode } from "hono/utils/http-status";

export class ApiResponse<T = unknown> {
  statusCode: ContentfulStatusCode;
  success: boolean;
  message: string;
  data?: T;

  constructor(
    statusCode: ContentfulStatusCode,
    success: boolean,
    message: string,
    data?: T,
  ) {
    this.statusCode = statusCode;
    ((this.success = success), ((this.message = message), (this.data = data)));
  }
}
