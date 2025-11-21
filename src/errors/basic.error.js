export class BasicError extends Error {
    constructor(message, status, errorCode, data = null) {
      super(message);
      
      // 에러 이름을 클래스 이름으로 설정
      this.name = this.constructor.name;
      
      // HTTP 상태 코드
      this.status = status;
      
      // 커스텀 에러 코드 
      this.errorCode = errorCode;
      
      // 추가 데이터 (디버깅용)
      this.data = data;
      
      // 에러 발생 시각
      this.timestamp = new Date().toISOString();
      
      // 스택 트레이스 캡처 (디버깅용)
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // ============================================
  // 사용자 관련 에러
  // ============================================
  
  export class DuplicateUserEmailError extends BasicError {
    constructor(message = "이미 존재하는 이메일입니다.", data = null) {
      super(message, 409, "U001", data);
    }
  }
  
  export class UserNotFoundError extends BasicError {
    constructor(message = "사용자를 찾을 수 없습니다.", data = null) {
      super(message, 404, "U002", data);
    }
  }
  
  export class InvalidUserDataError extends BasicError {
    constructor(message = "유효하지 않은 사용자 데이터입니다.", data = null) {
      super(message, 400, "U003", data);
    }
  }
  
  // ============================================
  // 미션 관련 에러
  // ============================================
  
  export class MissionNotFoundError extends BasicError {
    constructor(message = "미션을 찾을 수 없습니다.", data = null) {
      super(message, 404, "M001", data);
    }
  }
  
  export class MissionAlreadyExistsError extends BasicError {
    constructor(message = "이미 존재하는 미션입니다.", data = null) {
      super(message, 409, "M002", data);
    }
  }
  
  // ============================================
  // 리뷰 관련 에러
  // ============================================
  
  export class ReviewNotFoundError extends BasicError {
    constructor(message = "리뷰를 찾을 수 없습니다.", data = null) {
      super(message, 404, "R001", data);
    }
  }
  
  export class DuplicateReviewError extends BasicError {
    constructor(message = "이미 작성한 리뷰가 있습니다.", data = null) {
      super(message, 409, "R002", data);
    }
  }
  
  // ============================================
  // 가게 관련 에러
  // ============================================
  
  export class StoreNotFoundError extends BasicError {
    constructor(message = "가게를 찾을 수 없습니다.", data = null) {
      super(message, 404, "S001", data);
    }
  }
  
  // ============================================
  // 인증/권한 관련 에러
  // ============================================
  
  export class UnauthorizedError extends BasicError {
    constructor(message = "인증이 필요합니다.", data = null) {
      super(message, 401, "A001", data);
    }
  }
  
  export class ForbiddenError extends BasicError {
    constructor(message = "권한이 없습니다.", data = null) {
      super(message, 403, "A002", data);
    }
  }
  
  // ============================================
  // 검증 관련 에러
  // ============================================
  
  export class ValidationError extends BasicError {
    constructor(message = "입력값 검증에 실패했습니다.", data = null) {
      super(message, 400, "V001", data);
    }
  }
  
  // ============================================
  // 데이터베이스 관련 에러
  // ============================================
  
  export class DatabaseError extends BasicError {
    constructor(message = "데이터베이스 오류가 발생했습니다.", data = null) {
      super(message, 500, "DB001", data);
    }
  }