// src/errors.js

// 사용자 관련 오류 
export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class UserNotFoundError extends Error {
    errorCode = "U002";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class InvalidUserDataError extends Error {
    errorCode = "U003";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  // 미션 관련 오류
  export class MissionNotFoundError extends Error {
    errorCode = "M001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class MissionAlreadyExistsError extends Error {
    errorCode = "M002";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  // 리뷰 관련 오류 
  export class ReviewNotFoundError extends Error {
    errorCode = "R001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class DuplicateReviewError extends Error {
    errorCode = "R002";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  // 가게 관련 오류 
  export class StoreNotFoundError extends Error {
    errorCode = "S001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  // 인증 관련 오류 
  export class UnauthorizedError extends Error {
    errorCode = "A001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  // 검증 관련 오류 
  export class ValidationError extends Error {
    errorCode = "V001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }