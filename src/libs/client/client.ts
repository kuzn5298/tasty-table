import { ResponseApi } from '@/types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

class Client {
  constructor(private baseUrl: string) {}

  async get<T = unknown>(endpoint: string): Promise<ResponseApi<T>> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`);

    if (response.ok) {
      return {
        status: response.status,
        statusText: response.statusText,
        data: await response.json(),
      };
    } else {
      return {
        status: response.status,
        statusText: response.statusText,
        data: null,
      };
    }
  }
}

const client = new Client(BASE_URL);

export default client;
