import { Response } from 'express';

type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
  isUser?: T | null;
  isAdmin?: T | null;
};

const sendReponse = <T>(res: Response, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
    isUser: data.isUser || null,
    isAdmin: data.isAdmin || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendReponse;
