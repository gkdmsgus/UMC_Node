import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { handleUserSignUp } from "./controllers/user.controller.js";
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

// 5. 라우터
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);

// 6. 전역 에러 핸들러 (가장 마지막에 위치!)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});