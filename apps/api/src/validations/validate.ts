import { ApiError } from "../utils/api-error";

type ValidationResult = {
  success: boolean;
  error?: {
    issues: {
      code?: string;
      keys?: string[];
      path: PropertyKey[];
      message: string;
    }[];
  };
};

export function validationHook(result: ValidationResult) {
  if (!result.success && result.error) {
    const errors = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    throw ApiError.badRequest(result.error.issues[0].message, errors);
  }
}
