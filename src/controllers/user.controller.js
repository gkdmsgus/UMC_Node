import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.description = '새로운 사용자를 등록합니다.';
    #swagger.tags = ['User']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string", example: "user@example.com", description: "사용자 이메일" },
              name: { type: "string", example: "홍길동", description: "사용자 이름" },
              gender: { type: "string", example: "남성", description: "성별 (남성/여성)" },
              birth: { type: "string", format: "date", example: "2000-01-01", description: "생년월일 (YYYY-MM-DD)" },
              address: { type: "string", example: "서울시 강남구", description: "주소" },
              detailAddress: { type: "string", example: "역삼동 123-45", description: "상세 주소" },
              phoneNumber: { type: "string", example: "010-1234-5678", description: "전화번호" },
              preferences: { 
                type: "array", 
                items: { type: "number" },
                example: [1, 2, 3],
                description: "선호 음식 카테고리 ID 배열"
              }
            },
            required: ["email", "name", "gender", "birth", "address", "phoneNumber"]
          }
        }
      }
    };
   #swagger.responses[200] = {
    description: "회원 가입 성공 응답",
    content: {
      "application/json": {
        schema: {
          allOf: [
            { $ref: "#/components/schemas/SuccessResponse" },
            {
              type: "object",
              properties: {
                success: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "user@example.com" },
                    name: { type: "string", example: "홍길동" },
                    preferCategory: { 
                      type: "array", 
                      items: { type: "string" },
                      example: ["한식", "중식", "일식"]
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            allOf: [
              { $ref: "#/components/schemas/FailResponse" },
              {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      errorCode: { type: "string", example: "U001" },
                      reason: { type: "string", example: "이미 존재하는 이메일입니다." }
                    }
                  }
                }
              }
            ]
          }
        }
      }
    };
  */
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);
  
  try {
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch (error) {
    next(error);
  }
};