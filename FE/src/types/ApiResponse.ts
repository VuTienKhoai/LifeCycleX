export interface IMethodResult<T = any> {
  success: boolean;
  data: T;
  error?: string;
  message: string;
  status?: number;
  totalRecord: number;
}
