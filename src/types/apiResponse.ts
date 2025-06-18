export type APIResponse<T = null, M = null> = {
  success: boolean;
  data: T;
  message: string;
  meta: M;
  code?: string;
}
