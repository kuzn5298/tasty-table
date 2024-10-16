export interface ResponseApi<T = unknown> {
  status: number;
  statusText: string;
  data: T | null;
}
