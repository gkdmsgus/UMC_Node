import { StatusCodes } from "http-status-codes";
import { bodyToMissionChallenge } from "../dtos/mission.dto.js";
import { challengeMission, listStoreMissions, listMyMissions, completeMission } from "../services/mission.service.js";

// 미션 도전
export const handleChallengeMission = async (req, res, next) => {
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
  try {
    const result = await completeMission(parseInt(req.params.missionId));
    res.status(StatusCodes.OK).success(result);  
  } catch (error) {
    next(error);  
  }
};