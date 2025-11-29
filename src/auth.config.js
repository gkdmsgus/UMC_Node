import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { prisma } from "./db.config.js";
import jwt from "jsonwebtoken";

dotenv.config();
const secret = process.env.JWT_SECRET;

// 1. JWT Access Token 생성 (유효기간: 1시간)
export const generateAccessToken = (user) => {
    return jwt.sign(
      { id: user.id, email: user.email },
      secret,
      { expiresIn: '1h' }
    );
  };
  
  // 2. JWT Refresh Token 생성 (유효기간: 14일)
  export const generateRefreshToken = (user) => {
    return jwt.sign(
      { id: user.id },
      secret,
      { expiresIn: '14d' }
    );
  };
// Google 로그인 후 사용자 처리 함수
const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }
  
    // 이메일로 사용자 찾기
    const user = await prisma.user.findFirst({ where: { email } });
    
    // 이미 존재하는 사용자면 반환
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    // 새 사용자면 회원가입 처리
    const created = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        gender: "추후 수정",
        birth: new Date(1970, 0, 1),
        address: "추후 수정",
        detailAddress: "추후 수정",
        phoneNumber: "추후 수정",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };
  
  // Google Strategy 설정
  export const googleStrategy = new GoogleStrategy(
    {
      clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/callback/google",
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Google 로그인한 사용자 정보 처리
        const user = await googleVerify(profile);
        
        // 우리 서버의 JWT 토큰 생성
        const jwtAccessToken = generateAccessToken(user);
        const jwtRefreshToken = generateRefreshToken(user);
  
        return cb(null, {
          accessToken: jwtAccessToken,
          refreshToken: jwtRefreshToken,
        });
      } catch (err) {
        return cb(err);
      }
    }
  );
// JWT 검증 설정
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };
  
  // JWT Strategy 설정
  export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // 토큰의 payload에서 userId 추출해서 사용자 찾기
      const user = await prisma.user.findFirst({ where: { id: payload.id } });
  
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  });