import { addStoreReview, listStoreReviews, listMyReviews } from "../services/review.service.js";
import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";

// 리뷰 추가
export const handleAddReview = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 작성 API';
    #swagger.description = '특정 상점에 대한 리뷰를 작성합니다.';
    #swagger.tags = ['Review']
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '상점 ID',
      required: true,
      type: 'integer'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number", example: 1, description: "사용자 ID" },
              content: { type: "string", example: "맛있어요!", description: "리뷰 내용" },
              rating: { type: "number", example: 5, description: "평점 (1-5)" }
            },
            required: ["userId", "content", "rating"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 작성 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "number", example: 1 },
                  storeId: { type: "number", example: 1 },
                  userId: { type: "number", example: 1 },
                  content: { type: "string", example: "맛있어요!" },
                  rating: { type: "number", example: 5 },
                  createdAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 작성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
                  reason: { type: "string", example: "리뷰 작성에 실패했습니다." },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);
  
  try {
    const review = await addStoreReview(bodyToReview(req.body));
    res.status(StatusCodes.CREATED).success(review);  
  } catch (error) {
    next(error);  
  }
};
// 가게의 리뷰 목록 조회
export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.description = '특정 상점의 리뷰 목록을 조회합니다. (페이지네이션)';
    #swagger.tags = ['Review']
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '상점 ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션 커서 (마지막으로 조회한 리뷰 ID)',
      required: false,
      type: 'integer',
      example: 0
    }
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number", example: 1 },
                        store: { 
                          type: "object", 
                          properties: { 
                            id: { type: "number", example: 1 }, 
                            name: { type: "string", example: "맛있는 식당" } 
                          } 
                        },
                        user: { 
                          type: "object", 
                          properties: { 
                            id: { type: "number", example: 1 }, 
                            email: { type: "string", example: "user@example.com" }, 
                            name: { type: "string", example: "홍길동" } 
                          } 
                        },
                        content: { type: "string", example: "맛있어요!" },
                        rating: { type: "number", example: 5 },
                        createdAt: { type: "string", format: "date-time" }
                      }
                    }
                  },
                  pagination: { 
                    type: "object", 
                    properties: { 
                      cursor: { type: "number", nullable: true, example: 10 } 
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R002" },
                  reason: { type: "string", example: "리뷰 목록 조회에 실패했습니다." },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  try {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);  
  } catch (error) {
    next(error);  
  }
};

// 내가 작성한 리뷰 목록 조회
export const handleListMyReviews = async (req, res, next) => {
  /*
    #swagger.summary = '내가 작성한 리뷰 목록 조회 API';
    #swagger.description = '특정 사용자가 작성한 모든 리뷰 목록을 조회합니다. (페이지네이션)';
    #swagger.tags = ['Review']
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션 커서 (마지막으로 조회한 리뷰 ID)',
      required: false,
      type: 'integer',
      example: 0
    }
    #swagger.responses[200] = {
      description: "내 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number", example: 1 },
                        store: { 
                          type: "object", 
                          properties: { 
                            id: { type: "number", example: 1 }, 
                            name: { type: "string", example: "맛있는 식당" } 
                          } 
                        },
                        user: { 
                          type: "object", 
                          properties: { 
                            id: { type: "number", example: 1 }, 
                            email: { type: "string", example: "user@example.com" }, 
                            name: { type: "string", example: "홍길동" } 
                          } 
                        },
                        content: { type: "string", example: "맛있어요!" },
                        rating: { type: "number", example: 5 },
                        createdAt: { type: "string", format: "date-time" }
                      }
                    }
                  },
                  pagination: { 
                    type: "object", 
                    properties: { 
                      cursor: { type: "number", nullable: true, example: 10 } 
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "내 리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R003" },
                  reason: { type: "string", example: "리뷰 목록 조회에 실패했습니다." },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  try {
    const reviews = await listMyReviews(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);  
  } catch (error) {
    next(error);  
  }
};