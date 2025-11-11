import { responseFromMissionChallenge, responseFromStoreMissions, responseFromMyMissions, responseFromMissionComplete } from "../dtos/mission.dto.js";
import * as missionRepository from "../repositories/mission.repository.js";

export const challengeMission = async (data) => {
  try {
    const missionExists = await missionRepository.checkMissionExists(data.missionId);
    if (!missionExists) {
      throw new Error("존재하지 않는 미션입니다.");
    }

    const isAlreadyChallenging = await missionRepository.checkAlreadyChallenging(
      data.userId, 
      data.missionId
    );
    if (isAlreadyChallenging) {
      throw new Error("이미 도전 중인 미션입니다.");
    }


    const challengeId = await missionRepository.addMissionChallenge({
      userId: data.userId,
      missionId: data.missionId
    });

    const challenge = await missionRepository.getMissionChallenge(challengeId);
    const mission = await missionRepository.getMission(data.missionId);
    const user = await missionRepository.getUser(data.userId);

    return responseFromMissionChallenge({ challenge, mission, user });
  } catch (error) {
    throw error;
  }
};
// 가게의 미션 목록 조회
export const listStoreMissions = async (storeId, cursor) => {
  const missions = await missionRepository.getStoreMissions(storeId, cursor);
  return responseFromStoreMissions(missions);
};

// 내가 진행 중인 미션 목록 조회
export const listMyMissions = async (userId, cursor) => {
  const userMissions = await missionRepository.getMyChallengingMissions(userId, cursor);
  return responseFromMyMissions(userMissions);
};

// 미션을 완료로 변경
export const completeMission = async (userMissionId) => {
  const updated = await missionRepository.updateMissionStatus(userMissionId, 'complete');
  const userMission = await missionRepository.getMissionChallenge(userMissionId);
  return responseFromMissionComplete(userMission);
};
 
