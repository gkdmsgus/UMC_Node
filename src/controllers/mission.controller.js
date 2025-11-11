import { StatusCodes } from "http-status-codes";
import { bodyToMissionChallenge } from "../dtos/mission.dto.js";
import { challengeMission, listStoreMissions, listMyMissions, completeMission } from "../services/mission.service.js";


export const handleChallengeMission = async (req, res, next) => {
  console.log("미션 도전을 요청했습니다!");
  console.log("body:", req.body);

  try {
    const challenge = await challengeMission(bodyToMissionChallenge(req.body));
    res.status(StatusCodes.CREATED).json({ result: challenge });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message
    });
  }
};
// 가게의 미션 목록 조회
export const handleListStoreMissions = async (req, res, next) => {
  try {
    const missions = await listStoreMissions(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: missions });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message
    });
  }
};

// 내가 진행 중인 미션 목록 조회
export const handleListMyMissions = async (req, res, next) => {
  try {
    const missions = await listMyMissions(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: missions });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message
    });
  }
};

// 미션을 완료로 변경
export const handleCompleteMission = async (req, res, next) => {
  try {
    const result = await completeMission(parseInt(req.params.missionId));
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message
    });
  }
};