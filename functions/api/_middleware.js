import { checkDatabaseConfig } from '../utils/middleware';

const corsMiddleware = async ({ request, next }) => {
  const response = await next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
};

export const onRequest = [corsMiddleware, checkDatabaseConfig];
