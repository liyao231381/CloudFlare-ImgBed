import { checkDatabaseConfig } from '../utils/middleware';

const corsMiddleware = async ({ request, next }) => {
  // 预检请求 (Preflight) 处理
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204, // 204 No Content 是 OPTIONS 请求的标准响应
      headers: {
        'Access-Control-Allow-Origin': '*', // 允许任何来源
        // 修正 1: 添加了 WebDAV 需要的 PROPFIND, MKCOL 等方法
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PROPFIND, MKCOL, HEAD, MOVE, COPY',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Depth', // 添加 Depth 头，PROPFIND 需要
        'Access-Control-Max-Age': '86400', // 预检请求结果缓存一天
      },
    });
  }

  // 实际请求处理
  const response = await next();

  // 为实际响应添加 CORS 头部
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Expose-Headers', 'Content-Length, Content-Type, Date, ETag'); // 允许客户端访问这些头部

  return response;
};

// 修正 2: 将 corsMiddleware 添加到中间件执行链中
export const onRequest = [corsMiddleware, checkDatabaseConfig];
