import axios, {
  AxiosError,type
  AxiosResponse
} from "axios";

export class ApiError extends Error {

  status: number;
  body: unknown;

  constructor(
    status: number,
    body: unknown
  ) {

    super(`API Error ${status}`);

    this.status = status;
    this.body = body;
  }
}

const API_BASE =
  import.meta.env.VITE_API_URL || "";

  const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

api.interceptors.response.use(

  (response) => response,

  (error: AxiosError) => {

    if (!error.response) {

      return Promise.reject(
        new Error("Network Error")
      );
    }

    return Promise.reject(
      new ApiError(
        error.response.status,
        error.response.data
      )
    );
  }
);

export type ApiResponse<T> = {
  status: number;
  data: T;
  headers: unknown;
};

export async function axiosWrapper<T>(
  request: Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> {

  const response = await request;

  return {
    status: response.status,
    data: response.data,
    headers: response.headers,
  };
}

export default api;