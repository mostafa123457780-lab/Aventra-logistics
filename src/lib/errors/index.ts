export class AppError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'AppError';
  }
}
export class AuthError extends AppError {
  constructor(message: string) {
    super('AUTH_ERROR', message);
  }
}
export class PermissionError extends AppError {
  constructor(message: string) {
    super('PERMISSION_ERROR', message);
  }
}
export class ValidationError extends AppError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message);
  }
}
export class NotFoundError extends AppError {
  constructor(entity: string, id: string) {
    super('NOT_FOUND', `${entity} with id ${id} not found`);
  }
}
