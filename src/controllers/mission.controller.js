import { StatusCodes } from "http-status-codes";
import { bodyToMissionChallenge } from "../dtos/mission.dto.js";
import { challengeMission } from "../services/mission.service.js";

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
