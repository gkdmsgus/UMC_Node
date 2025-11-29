import bcrypt from "bcrypt";
import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../errors/basic.error.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  updateUser,
  getUserByEmail,
} from "../repositories/user.repository.js";

const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

export const userSignUp = async (data) => {
  // 이메일로 기존 사용자 확인
  const existingUser = await getUserByEmail(data.email);
  
  let userId;
  
  if (existingUser) {
    // 이미 존재하는 사용자 -> 정보 업데이트
    userId = await updateUser(existingUser.id, {
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
      ...(data.password && { password: hashPassword(data.password) }),
    });
  } else {
    // 새로운 사용자 -> 회원가입
    userId = await addUser({
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
      password: data.password ? hashPassword(data.password) : null,
    });
  }

  // 선호 카테고리 설정 (기존 사용자는 추가만)
  if (data.preferences) {
    for (const preference of data.preferences) {
      await setPreference(userId, preference);
    }
  }

  const user = await getUser(userId);
  const preferences = await getUserPreferencesByUserId(userId);
  return responseFromUser({ user, preferences });
};