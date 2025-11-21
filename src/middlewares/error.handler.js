import { BasicError } from '../errors/basic.error.js';

export const errorHandler = (err, req, res, next) => {
  // 헤더가 이미 전송된 경우 다음 미들웨어로 전달
  if (res.headersSent) {
    return next(err);
  }

  // 개발 환경에서는 콘솔에 전체 에러 스택 출력
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error Stack:', err.stack);
  }

  // BasicError를 상속받은 커스텀 에러인지 확인
  if (err instanceof BasicError) {
    console.error(`[${err.errorCode}] ${err.message}`);
    
    return res.status(err.status).error({
      errorCode: err.errorCode,
      reason: err.message,
      data: err.data,
      timestamp: err.timestamp
    });
  }

  // Prisma 에러 처리
  if (err.code && typeof err.code === 'string' && err.code.startsWith('P')) {
    console.error(`[PRISMA_ERROR] ${err.code}: ${err.message}`);
    
    return res.status(400).error({
      errorCode: 'DB001',
      reason: '데이터베이스 오류가 발생했습니다.',
      data: {
        prismaCode: err.code,
        ...(process.env.NODE_ENV === 'development' && { message: err.message })
      }
    });
  }

  // 일반 Error 처리
  console.error('[UNKNOWN_ERROR]', err.message);
  
  res.status(500).error({
    errorCode: 'UNKNOWN',
    reason: '서버 내부 오류가 발생했습니다.',
    data: process.env.NODE_ENV === 'development' ? { 
      message: err.message,
      stack: err.stack 
    } : null
  });
};