import { DEFAULT_ERROR_MESAGE } from '../constants/index.js';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : DEFAULT_ERROR_MESAGE;
}
