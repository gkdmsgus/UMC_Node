import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { handleUserSignUp } from "./controllers/user.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// 1. 로깅 미들웨어
app.use(morgan('dev'));

// 2. 쿠키 파서
app.use(cookieParser());

// 3. 공통 응답 헬퍼 함수
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ 
      resultType: "SUCCESS", 
      error: null, 
      success 
    });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

// 4. 기본 미들웨어
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 5. 라우터
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);

// 6. 전역 오류 처리 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // 커스텀 에러인 경우
  if (err.errorCode) {
    console.error(`[${err.errorCode}] ${err.reason}`);
    return res.status(err.statusCode || 500).error({
      errorCode: err.errorCode,
      reason: err.reason,
      data: err.data,
    });
  }

  // 일반 Error인 경우
  console.error('Unexpected error:', err);
  res.status(500).error({
    errorCode: "unknown",
    reason: err.message || "서버 내부 오류가 발생했습니다.",
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});