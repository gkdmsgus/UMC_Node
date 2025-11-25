import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

// Controllers
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddReview, handleListStoreReviews, handleListMyReviews } from "./controllers/review.controller.js";
import { handleChallengeMission, handleListStoreMissions, handleListMyMissions, handleCompleteMission } from "./controllers/mission.controller.js";

// Middlewares
import { responseHandler } from "./middlewares/response.handler.js";
import { errorHandler } from "./middlewares/error.handler.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

// 1. 로깅 미들웨어
app.use(morgan('dev'));

// 2. 쿠키 파서
app.use(cookieParser());

// 3. 기본 미들웨어
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 4. 공통 응답 헬퍼 미들웨어
app.use(responseHandler);

// 5. Swagger 설정
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null";
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 9th Node.js API",
      description: "UMC 9th Node.js 프로젝트 API 문서입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// 6. 라우터
app.get("/", (req, res) => {
  // #swagger.ignore = true
  res.send("Hello World!");
});

// User 관련 라우트
app.post("/api/v1/users/signup", handleUserSignUp);

// Review 관련 라우트
app.post("/api/v1/stores/:storeId/reviews", handleAddReview);
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/users/:userId/reviews", handleListMyReviews);

// Mission 관련 라우트
app.post("/api/v1/missions/:missionId/challenge", handleChallengeMission);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);
app.get("/api/v1/users/:userId/missions", handleListMyMissions);
app.patch("/api/v1/missions/:missionId/complete", handleCompleteMission);

// 7. 전역 에러 핸들러 (가장 마지막에 위치!)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});