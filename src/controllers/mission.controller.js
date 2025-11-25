import { StatusCodes } from "http-status-codes";
import { bodyToMissionChallenge } from "../dtos/mission.dto.js";
import { challengeMission, listStoreMissions, listMyMissions, completeMission } from "../services/mission.service.js";

// 미션 도전
export const handleChallengeMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 도전 API';
    #swagger.description = '특정 미션에 도전합니다.';
    #swagger.tags = ['Mission']
    #swagger.parameters['missionId'] = {
      in: 'path',
      description: '미션 ID',
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
              userId: { type: "number", example: 1, description: "사용자 ID" }
            },
            required: ["userId"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 도전 성공 응답",
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
                  userId: { type: "number", example: 1 },
                  missionId: { type: "number", example: 1 },
                  status: { type: "string", example: "진행중" },
                  createdAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 도전 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string", example: "이미 도전 중인 미션입니다." },
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
  console.log("미션 도전을 요청했습니다!");
  console.log("body:", req.body);

  try {
    const challenge = await challengeMission(bodyToMissionChallenge(req.body));
    res.status(StatusCodes.CREATED).success(challenge);  
  } catch (error) {
    next(error);  
  }
};

// 가게의 미션 목록 조회
export const handleListStoreMissions = async (req, res, next) => {
  /*
    #swagger.summary = '상점 미션 목록 조회 API';
    #swagger.description = '특정 상점의 미션 목록을 조회합니다. (페이지네이션)';
    #swagger.tags = ['Mission']
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '상점 ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션 커서 (마지막으로 조회한 미션 ID)',
      required: false,
      type: 'integer',
      example: 0
    }
    #swagger.responses[200] = {
      description: "상점 미션 목록 조회 성공 응답",
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
                        reward: { type: "number", example: 1000 },
                        deadline: { type: "string", format: "date-time" },
                        missionSpec: { type: "string", example: "리뷰 5개 작성하기" },
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
      description: "미션 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M002" },
                  reason: { type: "string", example: "미션 목록 조회에 실패했습니다." },
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
    const missions = await listStoreMissions(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);  
  } catch (error) {
    next(error); 
  }
};

// 내가 진행 중인 미션 목록 조회
export const handleListMyMissions = async (req, res, next) => {
  /*
    #swagger.summary = '내가 진행 중인 미션 목록 조회 API';
    #swagger.description = '특정 사용자가 진행 중인 미션 목록을 조회합니다. (페이지네이션)';
    #swagger.tags = ['Mission']
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션 커서 (마지막으로 조회한 미션 ID)',
      required: false,
      type: 'integer',
      example: 0
    }
    #swagger.responses[200] = {
      description: "내 미션 목록 조회 성공 응답",
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
                        mission: {
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
                            reward: { type: "number", example: 1000 },
                            deadline: { type: "string", format: "date-time" },
                            missionSpec: { type: "string", example: "리뷰 5개 작성하기" }
                          }
                        },
                        status: { type: "string", example: "진행중" },
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
      description: "미션 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M003" },
                  reason: { type: "string", example: "미션 목록 조회에 실패했습니다." },
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
    const missions = await listMyMissions(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);  
  } catch (error) {
    next(error);  
  }
};

// 미션을 완료로 변경
export const handleCompleteMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 완료 처리 API';
    #swagger.description = '진행 중인 미션을 완료 상태로 변경합니다.';
    #swagger.tags = ['Mission']
    #swagger.parameters['missionId'] = {
      in: 'path',
      description: '미션 ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: "미션 완료 처리 성공 응답",
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
                  userId: { type: "number", example: 1 },
                  missionId: { type: "number", example: 1 },
                  status: { type: "string", example: "완료" },
                  updatedAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 완료 처리 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M004" },
                  reason: { type: "string", example: "미션 완료 처리에 실패했습니다." },
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
    const result = await completeMission(parseInt(req.params.missionId));
    res.status(StatusCodes.OK).success(result);  
  } catch (error) {
    next(error);  
  }
};